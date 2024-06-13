import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Backbutton from "../components/Backbutton";

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
			const deleteBook = await axios.delete(
				`http://localhost:3000/books/${id}`
			);
			console.log("deleted");
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div>
			<Backbutton />
			DeleteBook
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
			<button onClick={handleDelete} className=" bg-red-400 m-4 ml-9">
				Delete
			</button>
		</div>
	);
}

export default DeleteBook;
