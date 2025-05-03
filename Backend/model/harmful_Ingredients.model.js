import mongoose from "mongoose";
const ingredientsSchema = mongoose.Schema({},{strict: false });

export const Harmful_Ingredients = mongoose.model("HarmfulIngredient",ingredientsSchema,"Harmful_Ingredients");