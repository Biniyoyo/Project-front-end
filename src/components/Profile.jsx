import React, { useState, useEffect } from "react";
import "../css/profile.css";
import {
	logoutAPI,
	uploadImageToCloudinaryAPI,
	updateUserAPI,
} from "../api/client";

function Profile(props) {
	const { user, setUser, setCurrentPage } = props;
	const [edittingUser, setEdittingUser] = useState({
		address1: "",
		address2: "",
		email: "",
		image: "",
		userName: "",
	});
	const [image, setImage] = useState(null);
	const [error, setError] = useState("");
	const [isFetching, setIsFetching] = useState(false);

	const handleImageSelected = event => {
		if (event.target.files && event.target.files[0]) {
			setImage(event.target.files[0]);
			setEdittingUser({
				...edittingUser,
				image: URL.createObjectURL(event.target.files[0]),
			});
		}
	};

	const removeImage = () => {
		setImage(null);
		setEdittingUser({ ...edittingUser, image: "" });
	};

	const logout = () => {
		if (window.confirm("Do you want to logout?")) {
			logoutAPI().then(res => {
				if (res.status === 204) {
					setCurrentPage("login");
					setUser(null);
				}
			});
		}
	};

	const submit = () => {
		let mail_format = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		if (!mail_format.test(edittingUser?.email)) {
			setError("email");
		} else {
			if (edittingUser?.userName.length < 1) {
				setError("name");
			} else {
				setError("");
				setIsFetching(true);
				if (image) {
					const formData = new FormData();
					const unsignedUploadPreset = "g53pwqfw";
					formData.append("file", image);
					formData.append("upload_preset", unsignedUploadPreset);

					uploadImageToCloudinaryAPI(formData).then(response => {
						console.log("Upload success");
						updateUserAPI({
							...edittingUser,
							image: response.url,
						}).then(res => {
							setUser({ ...edittingUser, image: response.url });
							setIsFetching(false);
							window.alert("Saved!");
						});
					});
				} else {
					updateUserAPI({ ...edittingUser }).then(res => {
						setUser({ ...edittingUser });
						setIsFetching(false);
						window.alert("Saved!");
					});
				}
			}
		}
	};

	useEffect(() => {
		setEdittingUser(user);
	}, []);

	return (
		<>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					paddingLeft: "5px",
					paddingRight: "5px",
					paddingTop: "10px",
					paddingBottom: "10px",
				}}
			>
				<h3 style={{ fontWeight: 900 }}>Edit Profile</h3>
			</div>
			<div className="profile-block">
				<h4 style={{ fontWeight: 900, margin: 0 }}>Profile photo</h4>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						maxWidth: "22rem",
						marginLeft: "2%",
						marginTop: "5px",
					}}
				>
					<label>
						<input
							type="file"
							name="image"
							id="chooseNewProfile"
							accept="image/*"
							onChange={handleImageSelected}
							style={{ display: "none" }}
						/>
						<img
							className="profileImage"
							src={edittingUser?.image || "/profile.png"}
							alt={"profile"}
						/>
					</label>

					<label>
						<input
							type="file"
							name="image"
							id="chooseNewProfile"
							accept="image/*"
							onChange={handleImageSelected}
							style={{ display: "none", cursor: "pointer" }}
						/>
						<div className="chooseNewImage">Choose New Image</div>
					</label>

					<div className="removeImage" onClick={removeImage}>
						Remove Image
					</div>
				</div>
			</div>
			<div className="profile-block">
				<h4 style={{ fontWeight: 900, margin: 0 }}>Name</h4>
				<input
					className="profile-input"
					placeholder="Name"
					value={edittingUser?.userName}
					onChange={e =>
						setEdittingUser({
							...edittingUser,
							userName: e.currentTarget.value,
						})
					}
				/>

				<div className="error">
					{error === "name" && "User name is required"}
				</div>
			</div>
			<div className="profile-block">
				<h4 style={{ fontWeight: 900, margin: 0 }}>Email</h4>
				<input
					className="profile-input"
					placeholder="Email"
					value={edittingUser?.email}
					onChange={e =>
						setEdittingUser({
							...edittingUser,
							email: e.currentTarget.value,
						})
					}
				/>
				<div className="error">
					{error === "email" && "Email is invalid"}
				</div>
			</div>
			<div className="profile-block">
				<h4 style={{ fontWeight: 900, margin: 0 }}>Address</h4>
				<input
					className="profile-input"
					placeholder="Address1"
					value={edittingUser?.address1}
					onChange={e =>
						setEdittingUser({
							...edittingUser,
							address1: e.currentTarget.value,
						})
					}
				/>

				<input
					className="profile-input"
					placeholder="Address2"
					value={edittingUser?.address2}
					onChange={e =>
						setEdittingUser({
							...edittingUser,
							address2: e.currentTarget.value,
						})
					}
				/>
			</div>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<button
					className="save-button"
					onClick={isFetching ? () => {} : submit}
				>
					{isFetching ? "Wait..." : "Save"}
				</button>
				<div className="logout" onClick={logout}>
					Logout
				</div>
			</div>
		</>
	);
}

export default Profile;
