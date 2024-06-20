import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";

function Home() {
	const [books, setBooks] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchBooks = async () => {
			setLoading(true);
			try {
				const response = await axios.get("http://localhost:3000/books/");
				setBooks(response.data.data);
			} catch (error) {
				console.error(error);
			}
			setLoading(false);
		};

		fetchBooks();
	}, []);

	return (
		<div className="min-h-screen bg-gray-100 flex justify-center items-center py-10">
			{loading ? (
				<Spinner />
			) : (
				<div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-5xl">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-blue-50">
							<tr className="text-blue-900 uppercase text-xs font-semibold text-left">
								<th className="px-6 py-3">No</th>
								<th className="px-6 py-3">Title</th>
								<th className="px-6 py-3">Author</th>
								<th className="px-6 py-3">Options</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{books.map((book, index) => (
								<tr key={book._id} className="text-sm text-gray-700">
									<td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
									<td className="px-6 py-4 whitespace-nowrap">{book.title}</td>
									<td className="px-6 py-4 whitespace-nowrap">{book.author}</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="flex space-x-3 text-blue-600">
											<Link
												to={`/books/details/${book._id}`}
												className="hover:text-blue-800"
												title="View Details"
											>
												<BsInfoCircle size={20} />
											</Link>
											<Link
												to={`/books/edit/${book._id}`}
												className="hover:text-blue-800"
												title="Edit Book"
											>
												<AiOutlineEdit size={20} />
											</Link>
											<Link
												to={`/books/delete/${book._id}`}
												className="hover:text-blue-800"
												title="Delete Book"
											>
												<MdOutlineDelete size={20} />
											</Link>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}

export default Home;
