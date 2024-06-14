import React from "react";
import Spinner from "../components/Spinner";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
function Home() {
	const [books, setBooks] = useState([]);
	console.log(books);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		setLoading(true);
		axios
			.get("http://localhost:3000/books/")
			.then((res) => {
				setBooks(res.data.data);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
	}, []);
	return (
		<div className=" bg-gray-200">
			{loading ? (
				<Spinner />
			) : (
				<table className="min-w-full divide-y divide-gray-200">
					<thead>
						<tr className=" text-blue-900 uppercase text-xs font-medium">
							<th className=" pl-10 py-3 text-left  tracking-wider">No</th>
							<th className=" pr-6 py-3 text-left tracking-wider">Title</th>
							<th className="pr-6 py-3 text-left  tracking-wider">Author</th>
							<th className="pr-4 py-3 text-left tracking-wider">Options</th>
						</tr>
					</thead>
					<tbody>
						{books.map((book, index) => (
							<tr className="text-xs font-medium  uppercase">
								<td className="pl-10 py-4 text-left  tracking-wider">
									{index + 1}
								</td>
								<td className="pr-6 py-4 text-left  tracking-wider">
									{book.title}
								</td>
								<td className="pr-6 py-4 text-left tracking-wider">
									{book.author}
								</td>
								<td>
									<div className="flex justify-left space-x-5">
										<Link to={`/books/details/${book._id}`}>
											<BsInfoCircle />
										</Link>
										<Link to={`/books/edit/${book._id}`}>
											<AiOutlineEdit />
										</Link>
										<Link to={`/books/delete/${book._id}`}>
											<MdOutlineDelete />
										</Link>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
}

export default Home;
