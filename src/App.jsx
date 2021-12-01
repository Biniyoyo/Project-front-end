import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Logday from "./components/Logday";
import View from "./components/View";
import Edit from "./components/Edit";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { getUserAPI, getQuestionsAPI } from "./api/client";

function App() {
	// States

	const [user, setUser] = useState(null);
	const [currentPage, setCurrentPage] = useState("");
	const [profilePic, setProfilePic] = useState("");
	const [date, setDate] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [questions, setQuestions] = useState([]);

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
				setIsLoggedIn(true);
				setCurrentPage("logday");
				getQuestions();
			} else {
				setIsLoggedIn(false);
				setCurrentPage("login");
			}
		});
	};

	const getQuestions = async () => {
		getQuestionsAPI().then(newQuestions => {
			console.log(newQuestions);
			setQuestions(newQuestions);
		});
	};

	useEffect(() => {
		getUser();
		setDate(getToday());
	}, []);

	return (
		<div>
			{isLoggedIn && (
				<Navbar
					profilePic={user?.image || "/profile.png"}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
				/>
			)}

			<div style={{ display: "flex", justifyContent: "center" }}>
				<div className="main">
					{currentPage === "logday" && (
						<Logday
							date={date}
							setDate={setDate}
							getToday={getToday}
							questions={questions}
						/>
					)}
					{currentPage === "profile" && (
						<Profile
							profilePic={profilePic}
							setProfilePic={setProfilePic}
							user={user}
							setUser={setUser}
							setCurrentPage={setCurrentPage}
							setIsLoggedIn={setIsLoggedIn}
						/>
					)}
					{currentPage === "edit" && <Edit questions={questions} />}
					{currentPage === "view" && (
						<View currentPage={currentPage} />
					)}

					{currentPage === "login" && (
						<Login
							currentPage={currentPage}
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
				</div>
			</div>
		</div>
	);
}

export default App;
