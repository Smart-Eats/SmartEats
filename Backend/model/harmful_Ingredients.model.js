import mongoose from "mongoose";
// I have not craeted any schema and model for ingredients so i add it manually in DB mongo compass
// this means this can accept any type of schema 
const ingredientsSchema = mongoose.Schema({},{strict: false });

export const Harmful_Ingredients = mongoose.model("HarmfulIngredient",ingredientsSchema,"Harmful_Ingredients");
// first -> name of model
// second -> passing schema
// third -> make of the collection created in mongo compass