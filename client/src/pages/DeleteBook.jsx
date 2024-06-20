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
		<div className="flex justify-center items-center h-screen w-full">
			<div className="border-2 border-solid border-blue-600 bg-blue-100 rounded-md p-10 space-y-2">
				<div className=" grid grid-cols-12 items-center gap-4">
					<span className=" text-lg font-semibold text-blue-700  text-right col-span-2">
						Title:
					</span>
					<span className="text-lg text-gray-900 col-span-10">
						{book.title}
					</span>
				</div>

				<div className=" grid grid-cols-12  items-center gap-4">
					<span className="text-lg font-semibold text-blue-700  text-right col-span-2">
						Author:
					</span>
					<span className="text-lg text-gray-900 col-span-10">
						{book.author}
					</span>
				</div>

				<div className="grid grid-cols-12 items-center gap-4">
					<span className="text-lg font-semibold text-blue-700  text-right col-span-2">
						Year:
					</span>
					<span className="text-lg text-gray-900 col-span-10">{book.year}</span>
				</div>

				<div className="grid grid-cols-12 items-center gap-4">
					<span className="text-lg font-semibold text-blue-700  col-span-2 text-right">
						ID:
					</span>
					<span className="text-lg text-gray-900 col-span-10">{book._id}</span>
				</div>

				<div className="w-full">
					<button onClick={handleDelete} className=" bg-red-400 w-full ">
						Delete
					</button>
				</div>
			</div>
		</div>
	);
}

export default DeleteBook;
