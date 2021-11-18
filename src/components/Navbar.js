import React from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import "../css/navbar.css";
import Profile from "../pages/Profile";

function Navebar() {
	return (
		<div className="navbar">
			<h1 className="title">Day Logger</h1>
			<div className="links">
				<h3>
					<Link className="link" to="/log">
						Log Day
					</Link>
				</h3>
				<h3>
					<Link className="link" to="/edit">
						Edit Questions
					</Link>
				</h3>
				<h3>
					<Link className="link" to="/view">
						View Data
					</Link>
				</h3>
			</div>
			<Link className="link" to="/profile">
				<img className="profileImage" src="/profile.png" alt=""></img>{" "}
			</Link>
		</div>
	);
}

export default Navebar;
