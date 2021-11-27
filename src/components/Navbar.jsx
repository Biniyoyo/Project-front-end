import React from "react";
import "../css/navbar.css";

function Navbar(props) {
	const { profilePic, currentPage, setCurrentPage } = props;

	const titleStyle = {
		color: "#66bfbf",
		textDecoration: "underline",
	};

	return (
		<div className="navbar" 
			style={{display:((props.currentPage==="login")||(props.currentPage==="signup"))?'none':""}}
		>
			<h2 className="title">Day Logger</h2>
			<div className="links">
				<h4 onClick={() => setCurrentPage("logday")} className="link">
					<div
						style={{ ...(currentPage === "logday" && titleStyle) }}
					>
						Log Day
					</div>
				</h4>
				<h4 onClick={() => setCurrentPage("edit")} className="link">
					<div style={{ ...(currentPage === "edit" && titleStyle) }}>
						Edit Questions
					</div>
				</h4>
				<h4 onClick={() => setCurrentPage("view")} className="link">
					<div style={{ ...(currentPage === "view" && titleStyle) }}>
						View Data
					</div>
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

export default Navbar;
