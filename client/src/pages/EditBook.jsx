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
		<div className=" uppercase flex justify-center items-center h-screen w-full bg-gray-200">
			<div className=" bg-blue-200 p-6 border-2 border-blue-700 rounded-xl ">
				<form onSubmit={handleSubmit}>
					<div className="space-y-2">
						<div className="  grid grid-cols-2">
							<label>Title</label>
							<input
								type="textbox"
								className=" bg-blue-100 rounded-md px-2"
								name="title"
								value={book.title}
								onChange={handleChange}
							></input>
						</div>
						<div className=" grid grid-cols-2 ">
							<label>Author</label>
							<input
								type="textbox"
								className=" bg-blue-100 rounded-md px-2"
								name="author"
								value={book.author}
								onChange={handleChange}
							></input>
						</div>
						<div className="grid grid-cols-2">
							<label>Year</label>
							<input
								type="Number"
								className=" bg-blue-100 rounded-md px-2"
								name="year"
								value={book.year}
								onChange={handleChange}
							></input>
						</div>
						<div className="">
							<button
								type="submit"
								className="bg-red-400 uppercase rounded-sm px-2"
							>
								Submit
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

export default EditBook;
