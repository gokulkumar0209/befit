// Import necessary packages
import express from "express"; // Framework for building web applications
import dotenv from "dotenv"; // To load environment variables from a .env file
import mongoose from "mongoose"; // To interact with MongoDB
import { PORT } from "./config.js"; // Import PORT from configuration file
import { Book } from "./models/bookModel.js"; // Import the Book model

// Initialize Express application
const app = express();

// Middleware to parse JSON bodies in incoming requests
app.use(express.json());

// Load environment variables from the .env file
dotenv.config({ path: "./.env" });

// Get the MongoDB connection URL from environment variables
const connectionUrl = process.env.CONNECTION_URL;

// Define a simple route to check if the server is running
app.get("/", (req, res) => {
	try {
		res.status(200).send("Server is running");
	} catch (error) {
		res.status(500).send(error);
	}
});

// Route to handle creating a new book
app.post("/books", async (req, res) => {
	try {
		// Create a new book object with default values if some fields are missing
		const newBook = {
			title: req.body.title || "Unnamed",
			author: req.body.author || "Unknown",
			year: req.body.year || 1000,
		};

		// Save the new book to the database
		const book = await Book.create(newBook);

		// Send the created book as the response
		return res.status(201).send(book);
	} catch (error) {
		console.log(error);
		res.status(500).send(error); // Internal server error
	}
});

// Connect to MongoDB and start the server
mongoose
	.connect(connectionUrl)
	.then(() => {
		console.log("DB connected");

		// Start the server and listen on the specified port
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	})
	.catch((error) => {
		console.log(error);
	});
