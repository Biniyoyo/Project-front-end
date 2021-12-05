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
import AdminNav from "./components/AdminNav";
import Admin from "./components/Admin";
import { getUserAPI, getQuestionsAPI } from "./api/client";

function App() {
	// States

	const [user, setUser] = useState(null);
	const [admin, setAdmin] = useState(null);
	const [allUsers, setAllUsers] = useState([]);
	const [currentPage, setCurrentPage] = useState("");
	const [date, setDate] = useState("");
	const [questions, setQuestions] = useState([]);
	const [isFetching, setIsFetching] = useState(false);

	//current date format

	const getToday = () => {
		let day = new Date();
		let year = day.getFullYear();
		let month = day.getMonth() + 1;
		let d = day.getDate();
		return month + "/" + d + "/" + year;
	};

	//fetch
	const getUser = async () => {
		getUserAPI().then(res => {
			console.log(res);
			setUser(res);
			if (res) {
				setCurrentPage("logday");
				getQuestions();
			} else {
				setCurrentPage("login");
			}
		});
	};

	const getQuestions = async () => {
		setIsFetching(true);
		getQuestionsAPI().then(newQuestions => {
			console.log(newQuestions);
			setQuestions(newQuestions);
			setIsFetching(false);
		});
	};

	useEffect(() => {
		getUser();
		setDate(getToday());
	}, []);

	return (
		<div>
			{user && (
				<Navbar
					profilePic={user?.image || "/profile.png"}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
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
							{currentPage === "logday" && (
								<Logday
									date={date}
									setDate={setDate}
									getToday={getToday}
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
								<Edit questions={questions} />
							)}
							{currentPage === "view" && (
								<View questions={questions} user={user} />
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
							
							{/* temporary */}
							{currentPage === "admin" && (
								<Admin 
									allUsers={allUsers} 
									admin = {admin}
									setAllUsers = {setAllUsers}
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
