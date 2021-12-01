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

	const signup = () => {
		let mail_format = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		if (name.length < 1) {
			setError("Name is not given");
		} else {
			if (!mail_format.test(email)) {
				setError("Email is invalid");
			} else {
				if (password.length <= 6) {
					setError("Password should be longer than 6 characters");
				} else {
					setError("");
					registerAPI(name, email, password).then(res => {
						if (res === "success") {
							getUser();
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
							<button className="login-button" onClick={signup}>
								Sign Up
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Signup;
