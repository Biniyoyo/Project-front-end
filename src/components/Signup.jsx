import "../css/login.css";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useState } from "react";
import { registerAPI } from "../api/client";

function Signup(props) {
	const { setCurrentPage, getUser } = props;
	const [error, setError] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isFetching, setIsFetching] = useState(false);

	const signup = () => {
		let mail_format = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		let password_format = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).{8,}/;
		if (name.length < 1) {
			setError("Name is not given");
		} else {
			if (!mail_format.test(email)) {
				setError("Email is invalid");
			} else {
				if (!password_format.test(password)) {
					setError(
						"Password should have at least 1 lower, 1 upper case and 1 number. Also should be longer than 8 characters."
					);
				} else {
					setError("");
					setIsFetching(true);
					registerAPI(name, email, password).then(res => {
						if (res === "success") {
							getUser();
						} else if ("duplicated") {
							setError("User email is already registered");
							setIsFetching(false);
						}
					});
				}
			}
		}
	};

	return (
		<div className="login-layout">
			<div className="board">
				<div className="loginHtml">
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							marginBottom: "20px",
						}}
					>
						<h3 style={{ margin: 0 }}>Sign Up</h3>
						<CloseOutlinedIcon
							onClick={() => setCurrentPage("login")}
							style={{ cursor: "pointer" }}
						/>
					</div>
					<div>
						<div className="loginInputs">
							<div>Name</div>
							<input
								className="login-input"
								value={name}
								onChange={e => setName(e.currentTarget.value)}
							/>
							<div>Email</div>
							<input
								className="login-input"
								type="email"
								value={email}
								onChange={e => setEmail(e.currentTarget.value)}
							/>
							<div>Password</div>
							<input
								className="login-input"
								type="password"
								value={password}
								onChange={e =>
									setPassword(e.currentTarget.value)
								}
							/>
							<div className="error">{error}</div>
						</div>

						<br style={{ size: "10px" }} />

						<div className="signup-buttons">
							<button
								className="login-button"
								onClick={isFetching ? () => {} : signup}
							>
								{isFetching ? "Wait..." : "Sign Up"}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Signup;
