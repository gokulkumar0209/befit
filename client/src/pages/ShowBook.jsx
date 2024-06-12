import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import Backbutton from "../components/Backbutton";
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
	}, [id]);
	// console.log(book);
	return (
		<div className=" bg-gray-300 h-screen">
			<Backbutton />
			{loading ? (
				<Spinner />
			) : (
				<div className="border-2 border-solid border-blue-600 bg-blue-100 rounded-md w-1/3 ml-10 h-40 p-4 flex items-center">
					<div className="space-y-2">
						<div className="flex">
							<span className="text-lg font-semibold text-blue-700 w-24">
								Title:
							</span>
							<span className="text-lg text-gray-900">{book.title}</span>
						</div>

						<div className="flex">
							<span className="text-lg font-semibold text-blue-700 w-24">
								Author:
							</span>
							<span className="text-lg text-gray-900">{book.author}</span>
						</div>

						<div className="flex">
							<span className="text-lg font-semibold text-blue-700 w-24">
								Year:
							</span>
							<span className="text-lg text-gray-900">{book.year}</span>
						</div>

						<div className="flex">
							<span className="text-lg font-semibold text-blue-700 w-24">
								ID:
							</span>
							<span className="text-lg text-gray-900">{book._id}</span>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default ShowBook;
