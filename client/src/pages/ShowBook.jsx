import React from "react";
import Backbutton from "../components/Backbutton";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

function ShowBook() {
	const { id } = useParams();
	const [book, setBook] = useState({});
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const response = await axios.get(`http://localhost:3000/books/${id}`);
				// console.log(response.data);
				setBook(response.data);
			} catch (error) {
				console.error(error);
			}
			setLoading(false);
		};

		fetchData();
	}, []);
	// console.log(book);
	return (
		<div>
			<Backbutton />
			{loading ? (
				<Spinner />
			) : (
				<div>
					<h1>{book.title}</h1>
					<h2>{book.author}</h2>
					<h3>{book.year}</h3>
					<h3>{book._id}</h3>
				</div>
			)}
		</div>
	);
}

export default ShowBook;
