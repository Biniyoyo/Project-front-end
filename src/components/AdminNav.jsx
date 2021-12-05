import React from "react";
import "../css/navbar.css";

function AdminNav(props) {
	const {currentPage, setCurrentPage } = props;

	return (
		<div className="navbar">
			<h2 className="title">Day Logger</h2>
			<div className="links">
				
				<h4>
					Admin
				</h4>
				
			</div>

			<img
				className="profileImage"
				src={profilePic}
				alt={"profile"}
				onClick={() => setCurrentPage("profile")}
			/>
		</div>
	);
}

export default AdminNav;
