import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();
// Route to handle creating a new book
router.post("/", async (req, res) => {
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

//Route to get all books
router.get("/", async (req, res) => {
	try {
		const books = await Book.find({});
		return res.status(200).send({
			count: books.length,
			data: books,
		});
	} catch (error) {
		res.status(400).send(error);
	}
});
// Route to get a book by id
router.get("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const book = await Book.findById(id);
		res.status(200).send(book);
	} catch (error) {
		res.status(404).send(error);
	}
});
// Route to update a book
router.put("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const book = await Book.findByIdAndUpdate(id, req.body);
		if (book) {
			res.status(200).send(`${book.title} updated successfully`);
		} else {
			res.status(404).send("Book not found");
		}
	} catch (error) {}
});

//Route to delete a book
router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const book = await Book.findByIdAndDelete(id);
		res.status(200).send(`${book.title} is deleted`);
	} catch (error) {
		res.status(400).send("Book not found");
	}
});

export default router;
