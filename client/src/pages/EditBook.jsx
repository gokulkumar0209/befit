import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Backbutton from "../components/Backbutton";

function EditBook() {
	const { id } = useParams();
	const [book, setBook] = useState({ title: "", author: "", year: "" });
	// const [book, setBook] = useState("");
	// const [title, setTitle] = useState("");
	// const [author, setAuthor] = useState("");
	// const [year, setYear] = useState(0);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	useEffect(() => {
		let isMounted = true;
		const fetchdata = async () => {
			setLoading(true);
			try {
				const result = await axios.get(`http://localhost:3000/books/${id}`);
				if (isMounted) {
					setBook(result.data);
				}
				// setBook(result.data);
				// setTitle(result.data.title);
				// setAuthor(result.data.author);
				// setYear(result.data.year);
			} catch (error) {
				setError(error);
			} finally {
				if (isMounted) {
					setLoading(false);
				}
			}
		};
		fetchdata();
		return () => {
			isMounted = false;
		};
	}, [id]);
	const handleChange = (e) => {
		const { name, value } = e.target;
		setBook((book) => ({
			...book,
			[name]: value,
		}));
	};
	// const handleTitle = (e) => {
	// 	setTitle(e.target.value);
	// };
	// const handleAuthor = (e) => {
	// 	setAuthor(e.target.value);
	// };
	// const handleYear = (e) => {
	// 	setYear(e.target.value);
	// };
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const result = await axios.put(`http://localhost:3000/books/${id}`, book);
			console.log("Updated");
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="flex justify-center items-center h-screen w-full bg-gray-400">
			<div className=" bg-blue-100 p-8 border-2 border-blue-600 rounded-xl w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
				<form onSubmit={handleSubmit} className="space-y-8">
					<div className="flex flex-col ">
						<label className="mb-1 text-lg">Title</label>
						<input
							type="textbox"
							className=" bg-gray-300 rounded-md p-2 text-lg"
							name="title"
							value={book.title}
							onChange={handleChange}
						></input>
					</div>
					<div className="flex flex-col text-lg">
						<label className="mb-1">Author</label>
						<input
							type="textbox"
							className=" bg-gray-300 rounded-md p-2"
							name="author"
							value={book.author}
							onChange={handleChange}
						></input>
					</div>
					<div className="flex flex-col text-lg">
						<label className="mb-1">Year</label>
						<input
							type="Number"
							className=" bg-gray-300 rounded-md p-2"
							name="year"
							value={book.year}
							onChange={handleChange}
						></input>
					</div>
					<div className=" ">
						<button
							type="submit"
							className=" bg-blue-600 text-white uppercase rounded p-2 w-full font-semibold text-lg"
						>
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default EditBook;
