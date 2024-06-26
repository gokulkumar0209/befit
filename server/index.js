// Import necessary packages
import express from "express"; // Framework for building web applications
import dotenv from "dotenv"; // To load environment variables from a .env file
import mongoose from "mongoose"; // To interact with MongoDB
import cors from "cors";


import booksRoute from "./routes/booksRoute.js";
// Initialize Express application
const app = express();
app.use(cors());
// Middleware to parse JSON bodies in incoming requests
app.use(express.json());
app.use("/books", booksRoute);
// Load environment variables from the .env file
dotenv.config({ path: "./.env" });

// Get the MongoDB connection URL from environment variables
const connectionUrl = process.env.CONNECTION_URL;
const PORT = process.env.PORT;

// Define a simple route to check if the server is running
app.get("/", (req, res) => {
	try {
		res.status(200).send("Server is running");
	} catch (error) {
		res.status(500).send(error);
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
