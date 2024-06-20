import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateBook() {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [year, setYear] = useState("");

	const handleTitle = (e) => {
		setTitle(e.target.value);
	};
	const handleAuthor = (e) => {
		setAuthor(e.target.value);
	};
	const handleYear = (e) => {
		setYear(e.target.value);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post("http://localhost:3000/books", {
				title,
				author,
				year,
			});
			console.log("Data submitted");
		} catch (error) {
			console.log(error);
		}
		console.log(title, author, year);
	};

	return (
		<div className="flex items-center justify-center min-h-screen w-full bg-gray-100">
			<div className="bg-white border-2 border-gray-200 shadow-md rounded-md p-8 w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
				<h2 className="text-center text-3xl font-bold mb-6 text-gray-700">Create Book</h2>
				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="flex flex-col">
						<label className="mb-2 text-lg font-medium text-gray-600">Title</label>
						<input
							className="p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
							type="text"
							onChange={handleTitle}
							value={title}
							placeholder="Enter the book title"
						/>
					</div>
					<div className="flex flex-col">
						<label className="mb-2 text-lg font-medium text-gray-600">Author</label>
						<input
							className="p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
							type="text"
							onChange={handleAuthor}
							value={author}
							placeholder="Enter the author's name"
						/>
					</div>
					<div className="flex flex-col">
						<label className="mb-2 text-lg font-medium text-gray-600">Year</label>
						<input
							className="p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
							type="number"
							onChange={handleYear}
							value={year}
							placeholder="Enter the publication year"
						/>
					</div>
					<button
						type="submit"
						className="w-full p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
					>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
}

export default CreateBook;
