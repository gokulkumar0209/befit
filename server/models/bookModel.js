import mongoose from "mongoose"; // Import mongoose to define a schema and model

// Define the schema for a Book
const bookSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true, // Title is a required field
		},
		author: {
			type: String,
			required: true, // Author is a required field
		},
		year: {
			type: Number,
			required: true, // Year is a required field
		},
	},
	{ timestamps: true }
); // Automatically add createdAt and updatedAt timestamps

// Create a model from the schema
export const Book = mongoose.model("Book", bookSchema);
