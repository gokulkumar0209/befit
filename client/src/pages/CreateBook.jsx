import axios from "axios";
import React, { useState, useEffect } from "react";
import Backbutton from "../components/Backbutton";

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
		<div className=" flex items-center h-screen  bg-gray-400">
			<div className="">
				<Backbutton />
				CreateBook
				<form onSubmit={handleSubmit}>
					<div className="border-2 border-solid border-blue-600 bg-blue-100 rounded-md  ml-10 h-40 p-4 flex items-center">
						<div className="space-y-2">
							<div className=" flex">
								<span className="w-24">Title</span>
								<span>
									<input
										className=" bg-slate-400"
										type="textbox"
										onChange={handleTitle}
										value={title}
									></input>
								</span>
							</div>
							<div className="flex">
								<span className="w-24">Author</span>
								<span>
									<input
										className=" bg-slate-400"
										type="textbox"
										onChange={handleAuthor}
										value={author}
									></input>
								</span>
							</div>
							<div className="flex">
								<span className="w-24">Year</span>
								<span>
									<input
										className=" bg-slate-400"
										type="number"
										onChange={handleYear}
										value={year}
									></input>
								</span>
							</div>
							<div></div>
							<button type="submit" className=" bg-red-100">
								Submit
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

export default CreateBook;
