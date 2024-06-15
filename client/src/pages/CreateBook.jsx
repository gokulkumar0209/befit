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
		<div className="flex items-center justify-center h-screen w-full bg-gray-400">
			<div className="bg-blue-100 border-2 border-blue-600 rounded-md p-6 w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
				<h2 className="text-center text-2xl mb-4">Create Book</h2>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="flex flex-col">
						<label className="mb-1">Title</label>
						<input
							className="p-2 border rounded bg-gray-200"
							type="text"
							onChange={handleTitle}
							value={title}
							placeholder="Enter the book title"
						/>
					</div>
					<div className="flex flex-col">
						<label className="mb-1">Author</label>
						<input
							className="p-2 border rounded bg-gray-200"
							type="text"
							onChange={handleAuthor}
							value={author}
							placeholder="Enter the author's name"
						/>
					</div>
					<div className="flex flex-col">
						<label className="mb-1">Year</label>
						<input
							className="p-2 border rounded bg-gray-200"
							type="number"
							onChange={handleYear}
							value={year}
							placeholder="Enter the publication year"
						/>
					</div>
					<button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
						Submit
					</button>
				</form>
			</div>
		</div>
	);
}

export default CreateBook;
