import express from "express";
import { PORT } from "./config.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
const app = express();
app.use(express.json());
dotenv.config({ path: "./.env" });
const CONNECTION_URL = process.env.CONNECTION_URL;
app.get("/", (req, res) => {
	try {
		res.status(200).send("Server is running");
	} catch (error) {
		res.status(404).send(error);
	}
});
app.post("/books", async (req, res) => {
	try {
		const newBook = {
			title: req.body.title || "Unnamed",
			author: req.body.author || "Unknown",
			year: req.body.year || 1000,
		};
		const book = await Book.create(newBook);
		return res.status(201).send(book);
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
});

mongoose
	.connect(CONNECTION_URL)
	.then(() => {
		console.log("DB connected");
		app.listen(PORT, () => {
			console.log(`Server is runnning on ${PORT}`);
		});
	})
	.catch((error) => {
		console.log(error);
	});
