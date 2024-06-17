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
		<div className=" flex  items-center  justify-center bg-gray-300 h-screen w-full">
			<div className="  border-2 border-solid border-blue-600 bg-blue-100 p-6 rounded-md w-full max-w-md md:max-w-md lg:max-w-lg xl:max-w-xl">
				{loading ? (
					<Spinner />
				) : (
					<div className="space-y-2 pl-6">
						<div className="grid grid-cols-12 items-center gap-4 ">
							<span className="text-lg font-semibold text-blue-700 col-span-2 text-right">
								Title:
							</span>
							<span className="text-lg text-gray-900  col-span-10">
								{book.title}
							</span>
						</div>

						<div className="grid grid-cols-12 items-center gap-4">
							<span className="text-lg font-semibold text-blue-700 col-span-2 text-right">
								Author:
							</span>
							<span className="text-lg text-gray-900  col-span-10">
								{book.author}
							</span>
						</div>

						<div className="grid grid-cols-12  items-center gap-4">
							<span className="text-lg font-semibold text-blue-700 col-span-2 text-right">
								Year:
							</span> 
							<span className="text-lg text-gray-900  col-span-10">
								{book.year}
							</span>
						</div>

						<div className="grid grid-cols-12 items-center gap-4">
							<span className="text-lg font-semibold text-blue-700 col-span-2 text-right">
								ID:
							</span>
							<span className="text-lg text-gray-900  col-span-10">
								{book._id}
							</span>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default ShowBook;
