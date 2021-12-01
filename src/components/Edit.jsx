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
	const { questions } = props;
	const [edittingQuestions, setEdittingQuestions] = useState([]);
	// deletedQuestions: array of deleted question's _id
	const [deletedQuestions, setDeletedQuestions] = useState([]);
	// edittedQuestions: array of editted question's { q._id: q } (using object for uniqueness)
	const [edittedQuestions, setEdittedQuestions] = useState({});
	// addedQuestions: array of added question objects
	const [addedQuestions, setAddedQuestions] = useState([]);

	const save = () => {
		deletedQuestions.forEach(qid => deleteQuestionByIdAPI(qid));
		Object.values(edittedQuestions).forEach(q => updateQuestionAPI(q));
		addedQuestions.forEach(q => createQuestionAPI(q));
		window.location.reload();
	};

	const addQuestion = () => {
		const newQuestion = {
			questionType: "text",
			questionText: "",
			multipleChoice: [],
			createdDate: new Date(),
			responses: {},
		};
		setEdittingQuestions([newQuestion, ...edittingQuestions]);
		setAddedQuestions([newQuestion, ...addedQuestions]);
	};

	//TODO: For editting, first search for addedQuestions first.

	const editQuestionText = (e, q) => {
		const targetQuestion = edittingQuestions.filter(
			item => item._id === q._id
		)[0];

		const newQuestion = {
			...targetQuestion,
			questionText: e.currentTarget.value,
		};

		setEdittingQuestions(
			edittingQuestions.map(item =>
				item._id === q._id ? newQuestion : item
			)
		);
		let newObj = {};
		newObj[q._id] = newQuestion;
		setEdittedQuestions({
			...edittedQuestions,
			...newObj,
		});
	};

	const editQuestionType = (e, q) => {
		const targetQuestion = edittingQuestions.filter(
			item => item._id === q._id
		)[0];

		const newQuestion = {
			...targetQuestion,
			questionType: e.currentTarget.value,
		};

		setEdittingQuestions(
			edittingQuestions.map(item =>
				item._id === q._id ? newQuestion : item
			)
		);
		let newObj = {};
		newObj[q._id] = newQuestion;
		setEdittedQuestions({
			...edittedQuestions,
			...newObj,
		});
	};

	const deleteQuestion = q => {
		if (addedQuestions.filter(item => q._id === item._id).length > 0) {
			setAddedQuestions(
				addedQuestions.filter(item => q._id !== item._id)
			);
		} else {
			setDeletedQuestions([...deletedQuestions, q._id]);
		}
		setEdittingQuestions(
			edittingQuestions.filter(item => item._id !== q._id)
		);
	};

	const editQuestionMultipleChoice = (e, q, idx) => {
		console.log(deletedQuestions);
		console.log(edittedQuestions);
		console.log(addedQuestions);
		const targetQuestion = edittingQuestions.filter(
			item => item._id === q._id
		)[0];

		const newQuestion = {
			...targetQuestion,
			multipleChoice: targetQuestion.multipleChoice.map((choice, i) =>
				idx === i ? e.currentTarget.value : choice
			),
		};

		setEdittingQuestions(
			edittingQuestions.map(item =>
				item._id === q._id
					? {
							...item,
							multipleChoice: item.multipleChoice.map(
								(choice, i) =>
									idx === i ? e.currentTarget.value : choice
							),
					  }
					: item
			)
		);
		let newObj = {};
		newObj[q._id] = newQuestion;
		setEdittedQuestions({
			...edittedQuestions,
			...newObj,
		});
	};

	useEffect(() => {
		setEdittedQuestions([]);
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

			{edittingQuestions.map((q, idx) => (
				<div key={`edit${idx}`}>
					<div className="middle">
						<input
							value={q?.questionText}
							type="text"
							className="question-input"
							onChange={e => editQuestionText(e, q)}
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
								onChange={e => editQuestionType(e, q)}
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
								onClick={() => deleteQuestion(q)}
								style={{ cursor: "pointer" }}
							/>
						</div>
						{q.questionType === "multiple" &&
							[...Array(3)].map((n, idx) => (
								<div
									style={{
										fontWeight: 400,
										marginBottom: "15px",
										marginTop: "15px",
										fontSize: "medium",
									}}
									key={`${q._id}mult${idx}`}
								>
									<input
										// id={`${q._id}multiple${idx}`}
										type="radio"
										name={q._id}
										disabled
									/>

									<input
										className="smallInput"
										value={q?.multipleChoice[idx]}
										onChange={e =>
											editQuestionMultipleChoice(
												e,
												q,
												idx
											)
										}
									/>
								</div>
							))}
					</div>
				</div>
			))}
			<div className="down">
				<button className="save-button" onClick={save}>
					Save
				</button>
			</div>
		</>
	);
}

export default Edit;
