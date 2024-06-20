import React, { useState, useEffect } from "react";
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
				setBook(response.data);
			} catch (error) {
				console.error(error);
			}
			setLoading(false);
		};

		fetchData();
	}, [id]);

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="bg-white border border-gray-300 rounded-md p-8 shadow-lg w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
				<h2 className="text-center text-2xl font-semibold mb-6 text-blue-800">Book Details</h2>
				{loading ? (
					<Spinner />
				) : (
					<div className="space-y-4 text-xl">
						<div className="grid grid-cols-12 items-center gap-4">
							<span className="font-semibold col-span-3 text-right">Title:</span>
							<span className="text-gray-900 col-span-9">{book.title}</span>
						</div>
						<div className="grid grid-cols-12 items-center gap-4">
							<span className="font-semibold col-span-3 text-right">Author:</span>
							<span className="text-gray-900 col-span-9">{book.author}</span>
						</div>
						<div className="grid grid-cols-12 items-center gap-4">
							<span className="font-semibold col-span-3 text-right">Year:</span>
							<span className="text-gray-900 col-span-9">{book.year}</span>
						</div>
						<div className="grid grid-cols-12 items-center gap-4">
							<span className="font-semibold col-span-3 text-right">ID:</span>
							<span className="text-gray-900 col-span-9">{book._id}</span>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default ShowBook;
