import { useState, useEffect } from "react";
import { deleteUserByIdAPI, deleteQuestionByIdAPI } from "../api/client";
import "../css/admin.css";
function Admin(props) {
	const { getAllUsers, allUsers } = props;

	const deleteUser = user => {
		if (window.confirm(`Do you want to delete user ${user?.userName}?`)) {
			user?.questions.forEach(question =>
				deleteQuestionByIdAPI(question._id)
			);
			deleteUserByIdAPI(user?._id).then(res => getAllUsers());
		}
	};

	return (
		<>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					paddingLeft: "5px",
					paddingRight: "5px",
					paddingTop: "10px",
				}}
			>
				<h3 style={{ fontWeight: 900 }}>Admin Page</h3>

				<div className="totalUser">Total Users: {allUsers.length}</div>
			</div>

			{allUsers.map(user => (
				<div className="middle" key={`user-${user?._id}`}>
					<div className="user">
						<div>
							<div>User name: {user?.userName}</div>
							<div>Email: {user?.email}</div>
							<div>
								Total number of questions:{" "}
								{user?.questions.length}
							</div>
							<div>
								Total number of responses:{" "}
								{user?.questions
									.map(
										question =>
											Object.keys(question?.responses)
												.length
									)
									.reduce((a, b) => a + b, 0)}
							</div>
						</div>

						<button
							className="deleteUser"
							onClick={() => deleteUser(user)}
						>
							Delete
						</button>
					</div>
				</div>
			))}
		</>
	);
}
export default Admin;
