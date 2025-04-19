import multer from "multer";

const storage = multer.memoryStorage();

const imageFileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/gif" 
  ) {
    cb(null, true); // Accept file
  } else {
    cb(new Error("Only .jpg, .jpeg, and .png images are allowed!"), false); // Reject file
  }
};


export const upload = multer({
  storage,
  limits: { fileSize: 1 * 1024 * 1024 },
  fileFilter: imageFileFilter,
});

// upload.single("image") remove this and add to the route where image is being uploaded