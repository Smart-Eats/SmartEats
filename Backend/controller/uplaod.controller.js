import Tesseract from 'tesseract.js';
import sharp from 'sharp';
import { ImageData } from '../model/imageText.model.js';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import { user } from '../model/user.model.js';

dotenv.config();

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});

export const ImageUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const imageBuffer = req.file.buffer;
    const metadata = await sharp(imageBuffer).metadata();
    const scaleFactor = metadata.density && metadata.density > 300 ? 1.5 : 3; // Increase scaling for small text

    // Preprocess image for ingredient lists
    let preprocessedBuffer = await sharp(imageBuffer)
      .resize({ width: Math.min(metadata.width * scaleFactor, 2000), withoutEnlargement: true, fit: 'inside' })
      .grayscale()
      .normalize()
      .median(3) // Noise reduction for textured backgrounds
      .sharpen({ sigma: 0.3 }) // Subtle sharpening
      .toBuffer();

    // Save preprocessed image for debugging
    await sharp(preprocessedBuffer).toFile('preprocessed_image.png');

    // Extract text with Tesseract
    let result = await Tesseract.recognize(preprocessedBuffer, 'eng', {
      tessedit_pageseg_mode: 3, // Auto page segmentation for complex layouts
      preserve_interword_spaces: 1,
    });
    let extractedText = result.data.text.trim();

    // Log Tesseract confidence for debugging
    console.log('Tesseract Confidence:', result.data.confidence);

    // Fallback if OCR fails
    if (!extractedText || extractedText.length < 10 || result.data.confidence < 60) {
      preprocessedBuffer = await sharp(imageBuffer)
        .resize({ width: 1200, withoutEnlargement: true })
        .grayscale()
        .normalize()
        .toBuffer();
      result = await Tesseract.recognize(preprocessedBuffer, 'eng', {
        tessedit_pageseg_mode: 3,
      });
      extractedText = result.data.text.trim();
      console.log('Fallback Tesseract Confidence:', result.data.confidence);
    }

    if (!extractedText) {
      return res.status(400).json({ success: false, message: 'No text extracted from the image' });
    }

    // Log raw OCR output
    console.log('Raw OCR Output:', extractedText);

    // Correct OCR errors with OpenAI
    let correctedText = extractedText;
    try {
      const completion = await openai.chat.completions.create({
        model: 'openai/gpt-3.5-turbo', // Use a reliable model
        messages: [
          {
            role: 'user',
            content: `The following text is extracted from an image of an ingredient list on a packaged food product, likely a protein supplement, formatted as a comma-separated list (e.g., "INGREDIENTS: Whey protein concentrate, Soya protein isolate, Maltodextrin"). It may contain nutritional ingredients (e.g., "Whey protein concentrate," "Soya protein isolate," "Maltodextrin," "Inulin"), chemical terms (e.g., "High oleic sunflower oil powder (HOSO)"), and phrases like "CONTAINS PERMITTED AND ADDED FLAVOUR." Correct only OCR errors (e.g., stray characters like "¢," "€," "AGHTTRISS," misplaced letters like "teh" to "the") and obvious misspellings (e.g., "Maltodexin" to "Maltodextrin," "lodised" to "Iodised"). Do not change capitalization, punctuation, or terminology unless it is a clear OCR or spelling error. Preserve nutritional terms, chemical names, and list formatting (comma-separated, no trailing comma). Ensure phrases like "CONTAINS PERMITTED AND ADDED FLAVOUR" are preserved. Output ONLY the corrected text in the format "Item1, Item2, Item3" or include additional phrases like "CONTAINS..." if present, with no explanations or additional content: if the text is not valid text related to ingredients give result like this is not a valid image \n\n${extractedText}`,
          },
        ],
        max_tokens: 1000,
        temperature: 0.2,
      });

      if (completion.choices && completion.choices[0]?.message?.content) {
        correctedText = completion.choices[0].message.content.trim();
      } else {
        console.warn('Invalid OpenAI response. Using raw OCR output.');
      }
    } catch (apiError) {
      console.warn('OpenAI correction failed:', apiError.message);
      console.warn('Using raw OCR output as fallback.');
    }

    // Post-process to clean up common OCR artifacts
    correctedText = correctedText
      .replace(/[^a-zA-Z0-9,\s&().-]/g, '') // Remove stray symbols
      .replace(/\s+/g, ' ') // Normalize spaces
      // .replace(/8/g, '&') // Fix common OCR error for &
      .replace(/,+/g, ',') // Remove duplicate commas
      .replace(/,\s*$/, '') // Remove trailing comma
      .trim();

    // Ensure correct prefix
    if (!correctedText.toUpperCase().startsWith('INGREDIENTS:')) {
      correctedText = `INGREDIENTS: ${correctedText}`;
    }

    // Log corrected text
    console.log('Corrected Text:', correctedText);

    // Save to database
    const {email} = req.user;
    const USER = await user.findOne({email})

    const IMAGE = await ImageData.create({
      users:[USER._id],
      image: {
        data: imageBuffer,
        type: req.file.mimetype,
      },
      extractedText: correctedText,
    });
    USER.imageData.push(IMAGE._id);
    await USER.save();
    res.status(200).json({
      success: true,
      message: 'Image processed and saved',
      text: correctedText,
    });
  } catch (error) {
    console.error('Error processing image:', error.message);
    let errorMessage = 'Image processing failed';
    if (error.response) {
      if (error.response.status === 400) {
        errorMessage = 'Invalid model ID or request format. Check model ID.';
      } else if (error.response.status === 429) {
        errorMessage = 'Rate limit exceeded. Try again later.';
      } else if (error.response.status === 401) {
        errorMessage = 'Invalid API key. Check OPENROUTER_API_KEY.';
      } else if (error.response.status === 404) {
        errorMessage = 'Model not found. Verify the model ID with OpenRouter or try a different model.';
      }
    } else if (error.message.includes('Tesseract')) {
      errorMessage = 'Text extraction failed. Ensure image clarity.';
    }
    res.status(500).json({ success: false, message: errorMessage, error: error.message });
  }
};