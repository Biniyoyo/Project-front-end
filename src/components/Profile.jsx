import React from "react";
import "../css/profile.css";
import { logoutAPI } from "../api/client";

function Profile(props) {
	const {
		profilePic,
		setProfilePic,
		user,
		setUser,
		setCurrentPage,
		setIsLoggedIn,
	} = props;
	const handleImageSelected = event => {
		if (event.target.files && event.target.files[0]) {
			const selectedFile = event.target.files[0];

			const formData = new FormData();

			const unsignedUploadPreset = "ne6rzhzu";
			formData.append("file", selectedFile);
			formData.append("upload_preset", unsignedUploadPreset);

			props.uploadImageToCloudinaryAPIMethod(formData).then(response => {
				console.log("Upload success");
				setProfilePic(response.url);
			});
		}
	};

	const removeImage = () => {
		setProfilePic("/profile.png");
	};

	const logout = () => {
		logoutAPI().then(res => {
			if (res.status === 204) {
				setIsLoggedIn(false);
				setCurrentPage("login");
			}
		});
	};

	return (
		<>
			<h3 style={{ fontWeight: 900, padding: "10px", margin: 0 }}>
				Edit Profile
			</h3>

			<div className="profile-block">
				<h4 style={{ fontWeight: 900, margin: 0 }}>Profile photo</h4>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						maxWidth: "22rem",
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
							src={user?.image || "/profile.png"}
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
					value={user.userName}
				/>
			</div>
			<div className="profile-block">
				<h4 style={{ fontWeight: 900, margin: 0 }}>Email</h4>
				<input
					className="profile-input"
					placeholder="Email"
					value={user.email}
				/>
			</div>
			<div className="profile-block">
				<h4 style={{ fontWeight: 900, margin: 0 }}>Address</h4>
				<input
					className="profile-input"
					placeholder="Address1"
					value={user.address1}
				/>

				<input
					className="profile-input"
					placeholder="Address2"
					value={user.address2}
				/>
			</div>

			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<button className="save-button">Save</button>
				<div className="logout" onClick={logout}>
					Logout
				</div>
			</div>
		</>
	);
}

export default Profile;
