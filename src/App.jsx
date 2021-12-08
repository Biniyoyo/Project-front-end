import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import BeatLoader from "react-spinners/BeatLoader";
import Navbar from "./components/Navbar";
import Logday from "./components/Logday";
import View from "./components/View";
import Edit from "./components/Edit";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Signup from "./components/Signup";

import Admin from "./components/Admin";
import { getUserAPI, getUsersAPI, getQuestionsAPI } from "./api/client";

function App() {
	// States

	const [user, setUser] = useState(null);
	const [allUsers, setAllUsers] = useState([]);
	const [currentPage, setCurrentPage] = useState("");

	const [questions, setQuestions] = useState([]);
	const [isFetching, setIsFetching] = useState(false);

	//fetch
	const getUser = async () => {
		getUserAPI().then(res => {
			setUser(res);
			if (res) {
				if (res?.isAdmin) {
					getAllUsers();
				}
				setCurrentPage("logday");
				getQuestions();
			} else {
				setCurrentPage("login");
			}
		});
	};

	const getAllUsers = async () => {
		getUsersAPI().then(res => {
			setAllUsers(res);
		});
	};

	const getQuestions = async () => {
		setIsFetching(true);
		getQuestionsAPI().then(newQuestions => {
			setQuestions(newQuestions);
			setIsFetching(false);
		});
	};

	useEffect(() => {
		getUser();
	}, []);

	return (
		<div>
			{user && (
				<Navbar
					profilePic={user?.image || "/profile.png"}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					isAdmin={user?.isAdmin}
				/>
			)}

			<div style={{ display: "flex", justifyContent: "center" }}>
				<div className="main">
					{(currentPage === "" || isFetching) && (
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								marginTop: "40vh",
							}}
						>
							<BeatLoader
								size={13}
								margin={2}
								color={"#66bfbf"}
							/>
						</div>
					)}
					{isFetching || (
						<>
							{currentPage === "logday" && !user.isAdmin && (
								<Logday
									questions={questions}
									setQuestions={setQuestions}
								/>
							)}
							{currentPage === "profile" && (
								<Profile
									user={user}
									setUser={setUser}
									setCurrentPage={setCurrentPage}
								/>
							)}
							{currentPage === "edit" && (
								<Edit
									questions={questions}
									getQuestions={getQuestions}
								/>
							)}
							{currentPage === "view" && (
								<View
									questions={questions}
									setQuestions={setQuestions}
									getQuestions={getQuestions}
									user={user}
								/>
							)}
							{currentPage === "login" && (
								<Login
									setCurrentPage={setCurrentPage}
									getUser={getUser}
								/>
							)}
							{currentPage === "signup" && (
								<Signup
									currentPage={currentPage}
									setCurrentPage={setCurrentPage}
									getUser={getUser}
								/>
							)}
							{currentPage === "admin" && (
								<Admin
									getAllUsers={getAllUsers}
									allUsers={allUsers}
								/>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
