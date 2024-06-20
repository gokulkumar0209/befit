import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
	const home = "/";
	return (
		<div className="w-full bg-blue-50 shadow-md">
			<div className="flex justify-between items-center h-16 px-10">
				<div className="text-blue-900 text-2xl font-bold">
					<Link to={home}>Bookly</Link>
				</div>
				<div className="flex space-x-6">
					<Link to="/books/create" className="text-white bg-blue-900 px-4 py-2 rounded-md text-lg font-semibold transition hover:bg-blue-700">
						New
					</Link>
					{/* Uncomment and use if a login button is needed */}
					{/* <Link to="/login" className="text-white bg-blue-900 px-4 py-2 rounded-md text-lg font-semibold transition hover:bg-blue-700">
						Login
					</Link> */}
				</div>
			</div>
		</div>
	);
}

export default NavBar;
