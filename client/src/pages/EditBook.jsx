import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function EditBook() {
	const { id } = useParams();
	const [book, setBook] = useState({ title: "", author: "", year: "" });
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		let isMounted = true;
		const fetchData = async () => {
			setLoading(true);
			try {
				const result = await axios.get(`http://localhost:3000/books/${id}`);
				if (isMounted) {
					setBook(result.data);
				}
			} catch (error) {
				setError(error);
			} finally {
				if (isMounted) {
					setLoading(false);
				}
			}
		};
		fetchData();
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

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.put(`http://localhost:3000/books/${id}`, book);
			console.log("Updated");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen w-full bg-gray-100">
			<div className="bg-white border border-gray-300 rounded-md p-6 shadow-lg w-full max-w-md md:max-w-lg lg:max-w-xl">
				<h2 className="text-center text-2xl font-semibold mb-4 text-blue-800">Edit Book</h2>
				{loading ? (
					<div className="text-center text-lg text-blue-600">Loading...</div>
				) : (
					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="flex flex-col">
							<label className="mb-2 text-lg font-medium text-gray-700">Title</label>
							<input
								type="text"
								name="title"
								className="p-2 border border-gray-300 rounded bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-lg"
								value={book.title}
								onChange={handleChange}
								placeholder="Enter the book title"
							/>
						</div>
						<div className="flex flex-col">
							<label className="mb-2 text-lg font-medium text-gray-700">Author</label>
							<input
								type="text"
								name="author"
								className="p-2 border border-gray-300 rounded bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-lg"
								value={book.author}
								onChange={handleChange}
								placeholder="Enter the author's name"
							/>
						</div>
						<div className="flex flex-col">
							<label className="mb-2 text-lg font-medium text-gray-700">Year</label>
							<input
								type="number"
								name="year"
								className="p-2 border border-gray-300 rounded bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-lg"
								value={book.year}
								onChange={handleChange}
								placeholder="Enter the publication year"
							/>
						</div>
						<button
							type="submit"
							className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md text-lg transition duration-300"
						>
							Update
						</button>
					</form>
				)}
			</div>
		</div>
	);
}

export default EditBook;
