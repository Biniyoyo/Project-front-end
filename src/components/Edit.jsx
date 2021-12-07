import React, { useState, useEffect } from "react";
import "../css/edit.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
	createQuestionAPI,
	updateQuestionAPI,
	deleteQuestionByIdAPI,
} from "../api/client";

function Edit(props) {
	const { questions, getQuestions } = props;
	const [edittingQuestions, setEdittingQuestions] = useState([]);
	// status tag => ["new", "editted", "deleted"]

	const save = () => {
		// TODO: edittingQuetions에서 status tag 확인해서 체크
		edittingQuestions.forEach((q, i) => {
			if (q?.status === "new") {
				createQuestionAPI(q);
			} else if (q?.status === "editted") {
				updateQuestionAPI(q);
			} else if (q?.status === "deleted") {
				deleteQuestionByIdAPI(q?._id);
			}
			if (i == edittingQuestions.length - 1) {
				window.alert("Saved!");
				getQuestions();
			}
		});
	};

	const addQuestion = () => {
		const newQuestion = {
			questionType: "text",
			questionText: "",
			multipleChoice: ["", "", ""],
			createdDate: new Date(),
			responses: {},
			status: "new",
		};
		setEdittingQuestions([newQuestion, ...edittingQuestions]);
	};

	//TODO: For editting, first search for addedQuestions first.

	const editQuestionText = (e, idx) => {
		setEdittingQuestions(
			edittingQuestions.map((q, i) =>
				i === idx
					? {
							...q,
							questionText: e.currentTarget.value,
							status: q?.status || "editted",
					  }
					: q
			)
		);
	};

	const editQuestionType = (e, idx) => {
		setEdittingQuestions(
			edittingQuestions.map((q, i) =>
				i === idx
					? {
							...q,
							questionType: e.currentTarget.value,
							multipleChoice: ["", "", ""],
							responses: {},
							status: q?.status || "editted",
					  }
					: q
			)
		);
	};

	const deleteQuestion = (qid, idx) => {
		if (qid) {
			setEdittingQuestions(
				edittingQuestions.map((q, i) =>
					i === idx ? { ...q, status: "deleted" } : q
				)
			);
		} else {
			setEdittingQuestions(edittingQuestions.filter((q, i) => i !== idx));
		}
	};

	const editQuestionMultipleChoice = (e, multIdx, idx) => {
		setEdittingQuestions(
			edittingQuestions.map((q, i) =>
				i === idx
					? {
							...q,
							status: q?.status || "editted",
							multipleChoice: q.multipleChoice.map((choice, n) =>
								n === multIdx ? e.currentTarget.value : choice
							),
					  }
					: q
			)
		);
	};

	useEffect(() => {
		if (questions.length > 0) {
			setEdittingQuestions(questions);
		}
	}, []);

	return (
		<>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					paddingLeft: "5px",
					paddingRight: "5px",
					paddingTop: "10px",
					paddingBottom: "10px",
				}}
			>
				<h3 style={{ fontWeight: 900 }}>Edit Questions</h3>

				<AddCircleOutlineIcon
					fontSize="medium"
					onClick={addQuestion}
					style={{ cursor: "pointer" }}
				/>
			</div>
			{edittingQuestions.length > 0 || (
				<div style={{ textAlign: "center" }}>
					<b>Start with adding new questions!</b>
				</div>
			)}

			{edittingQuestions.map((q, idx) => (
				<div key={`edit${idx}`}>
					<div
						className="middle"
						style={{
							display: q?.status === "deleted" ? "none" : "block",
						}}
					>
						<input
							value={q?.questionText}
							type="text"
							className="question-input"
							onChange={e => editQuestionText(e, idx)}
						/>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
							}}
						>
							<select
								className="select"
								value={q.questionType}
								onChange={e => editQuestionType(e, idx)}
							>
								<option value="number">number</option>
								<option value="text">text</option>
								<option value="boolean">boolean</option>
								<option value="multiple">
									multiple choice
								</option>
							</select>
							<DeleteOutlineIcon
								className="delete"
								onClick={() => deleteQuestion(q?._id, idx)}
								style={{ cursor: "pointer" }}
							/>
						</div>
						{q.questionType === "multiple" &&
							[...Array(3)].map((n, i) => (
								<div
									style={{
										fontWeight: 400,
										marginBottom: "15px",
										marginTop: "15px",
										fontSize: "medium",
									}}
									key={`edit${idx}mult${i}`}
								>
									<input
										type="radio"
										name={q?._id}
										disabled
									/>

									<input
										className="smallInput"
										value={q?.multipleChoice[i]}
										onChange={e =>
											editQuestionMultipleChoice(
												e,

												i,
												idx
											)
										}
									/>
								</div>
							))}
					</div>
				</div>
			))}
			{edittingQuestions.length > 0 && (
				<div className="down">
					<button className="save-button" onClick={save}>
						Save
					</button>
				</div>
			)}
		</>
	);
}

export default Edit;
