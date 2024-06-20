import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
	const home = "/";
	return (
		<div className=" w-full bg-blue-50 h-12">
			<div className="flex justify-between ">
				<div className="flex space-x-4 ml-10 mr-4 mt-3 ">
					<div className="text-center text-blue-900 ">
						<Link to={home}>
							<button className=" text-xl font-bold">Bookly</button>
						</Link>
					</div>
					<div className=" bg-blue-900 w-16 text-white text-center rounded-md">
						<Link to="/books/create">
							<h1 className="font-semibold">New</h1>
						</Link>
					</div>
				</div>
				{/* <div className="mr-10 mt-3 bg-blue-900 text-center text-white w-16 rounded-md">
					<h1 className=" font-semibold">Login</h1>
				</div> */}
			</div>
		</div>
	);
}

export default NavBar;
