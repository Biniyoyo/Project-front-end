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
import { getUserAPI, getQuestionsAPI } from "./api/client";

function App() {
	// States

	const [user, setUser] = useState(null);
	const [currentPage, setCurrentPage] = useState("");
	const [date, setDate] = useState("");
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
				setCurrentPage("logday");
				getQuestions();
			} else {
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
			{user && (
				<Navbar
					profilePic={user?.image || "/profile.png"}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
				/>
			)}

			<div style={{ display: "flex", justifyContent: "center" }}>
				<div className="main">
					{currentPage === "" && (
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								marginTop: "30vh",
							}}
						>
							<BeatLoader
								size={13}
								margin={2}
								color={"#66bfbf"}
							/>
						</div>
					)}
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
					{currentPage === "edit" && <Edit questions={questions} />}
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
				</div>
			</div>
		</div>
	);
}

export default App;
