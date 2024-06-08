import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
	title: String,
	author: String,
	year: Number,
});

export const Book = mongoose.model("Book", bookSchema);
