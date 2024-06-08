import express from "express";
import { PORT } from "./config.js";
const app = express();

app.get("/", (req, res) => {
	try {
		res.status(200).send("Server is running");
	} catch (error) {
		res.status(404).send(error);
	}
});
app.listen(PORT, () => {
	console.log(`Server is runnning on ${PORT}`);
});
