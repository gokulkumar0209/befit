import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function DeleteBook() {
	const [book, setBook] = useState({});
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await axios.get(`http://localhost:3000/books/${id}`);
				setBook(result.data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, [id]);

	const handleDelete = async () => {
		try {
			await axios.delete(`http://localhost:3000/books/${id}`);
			console.log("deleted");
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen w-full bg-gray-100">
			<div className="bg-white border border-gray-300 rounded-md p-6 shadow-lg w-full max-w-md md:max-w-lg lg:max-w-xl">
				<h2 className="text-center text-2xl font-semibold mb-4 text-blue-800">Delete Book</h2>
				<div className="space-y-4">
					<div className="grid grid-cols-12 items-center gap-4">
						<span className="text-lg font-semibold text-blue-700 text-right col-span-3">Title:</span>
						<span className="text-lg text-gray-900 col-span-9">{book.title}</span>
					</div>
					<div className="grid grid-cols-12 items-center gap-4">
						<span className="text-lg font-semibold text-blue-700 text-right col-span-3">Author:</span>
						<span className="text-lg text-gray-900 col-span-9">{book.author}</span>
					</div>
					<div className="grid grid-cols-12 items-center gap-4">
						<span className="text-lg font-semibold text-blue-700 text-right col-span-3">Year:</span>
						<span className="text-lg text-gray-900 col-span-9">{book.year}</span>
					</div>
					<div className="grid grid-cols-12 items-center gap-4">
						<span className="text-lg font-semibold text-blue-700 text-right col-span-3">ID:</span>
						<span className="text-lg text-gray-900 col-span-9">{book._id}</span>
					</div>
					<p className="text-center text-lg text-red-600 font-semibold">
						Are you sure you want to delete this book?
					</p>
					<button
						onClick={handleDelete}
						className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md text-lg transition duration-300"
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
}

export default DeleteBook;
