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
		<div>
			<Backbutton />
			EditBook
			<form onSubmit={handleSubmit}>
				<input
					type="textbox"
					className=" bg-blue-200"
					name="title"
					value={book.title}
					onChange={handleChange}
				></input>
				<input
					type="textbox"
					className=" bg-blue-200"
					name="author"
					value={book.author}
					onChange={handleChange}
				></input>
				<input
					type="Number"
					className=" bg-blue-200"
					name="year"
					value={book.year}
					onChange={handleChange}
				></input>
				<button type="submit" className="bg-red-300">
					Submit
				</button>
			</form>
		</div>
	);
}

export default EditBook;
