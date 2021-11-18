import React from "react";
import "./App.css";
import Navebar from "./components/Navbar";
import Logday from "./components/Logday";
import View from "./components/View";
import Edit from "./pages/Edit";
import Profile from "./components/Profile";
import { Route, Link, Routes, BrowserRouter as Router } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<Router>
				<Navebar />
				<Routes>
					<Route path="/log" element={<Logday />}>
						Log
					</Route>
					<Route path="/edit" element={<Edit />}>
						Edit
					</Route>
					<Route path="/view" element={<View />}>
						View
					</Route>
					<Route path="/profile" element={<Profile />}>
						Profile
					</Route>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
