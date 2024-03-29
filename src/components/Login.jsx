import "../css/login.css";
import { loginAPI } from "../api/client";
import { useState } from "react";

function Login(props) {
	const { setCurrentPage, getUser } = props;
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isFetching, setIsFetching] = useState(false);

	const login = () => {
		let mail_format = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		if (!mail_format.test(email)) {
			setError("Email is invalid");
		} else {
			if (password.length < 1) {
				setError("Password is empty");
			} else {
				setError("");
				setIsFetching(true);
				loginAPI(email, password).then(res => {
					if (res === "success") {
						window.alert("Welcome!");
						getUser();
					} else {
						setError("Entered information is wrong");
					}
					setIsFetching(false);
				});
			}
		}
	};

	return (
		<div className="login-layout" data-testid="login">
			<div className="board">
				<div className="loginHead">
					<h2 style={{ margin: 0, color: "white" }}>Log Day</h2>
				</div>

				<div className="loginHtml">
					<div className="loginInputs">
						<div>Email</div>
						<input
							type="email"
							className="login-input"
							value={email}
							onChange={e => setEmail(e.currentTarget.value)}
						/>
						<div>Password</div>
						<input
							className="login-input"
							type="password"
							value={password}
							onChange={e => setPassword(e.currentTarget.value)}
						/>
						<div className="error">{error}</div>
					</div>
					<div className="loginButtons">
						<button
							className="login-button"
							onClick={isFetching ? () => {} : login}
						>
							{isFetching ? "Wait..." : "Log In"}
						</button>
						<hr style={{ width: "inherit" }} />

						<button
							className="creatnewaccountButton"
							onClick={() => setCurrentPage("signup")}
						>
							Create New Account
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
