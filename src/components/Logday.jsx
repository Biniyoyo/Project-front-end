import React from "react";
import { useState, useEffect } from "react";
import "../css/logday.css";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { updateQuestionAPI } from "../api/client";

function Logday(props) {
	const { date, setDate, getToday, questions, setQuestions } = props;
	const [edittingQuestions, setEdittingQuestions] = useState([]);
	const [edittedQuestions, setEdittedQuestions] = useState([]);

	const incrementDate = (dateInput, increment) => {
		const dateFormatTotime = new Date(dateInput);
		const increasedDate = new Date(
			dateFormatTotime.getTime() + increment * 86400000
		);
		const month = increasedDate.getMonth() + 1;
		const date =
			month +
			"/" +
			increasedDate.getDate() +
			"/" +
			increasedDate.getFullYear();
		setDate(date);
	};

	const editResponse = (q, newResponse) => {
		const newResponses = { ...q?.responses };
		newResponses[date] = newResponse;
		const newQuestion = { ...q, responses: newResponses };
		setEdittingQuestions(
			edittingQuestions.map(item =>
				item?._id === q?._id ? newQuestion : item
			)
		);
		const newObj = { ...edittedQuestions };
		newObj[q?._id] = newQuestion;
		setEdittedQuestions(newObj);
	};

	const submit = () => {
		Object.values(edittedQuestions).forEach(q => updateQuestionAPI(q));
		setQuestions(edittingQuestions);
		window.alert(`Your response on ${date} is submitted!`);
	};

	const questionRendering = q => {
		switch (q?.questionType) {
			case "boolean":
				return (
					<>
						<div className="radio-div">
							<input
								type="radio"
								name={q?._id}
								id={`${q?._id}boolean-t`}
								value={true}
								checked={q.responses[date] === true}
								onChange={() => editResponse(q, true)}
							/>
							<label htmlFor={`${q?._id}boolean-t`}>True</label>
							<span style={{ margin: "20px" }}></span>
							<input
								type="radio"
								name={q?._id}
								id={`${q?._id}boolean-f`}
								value={false}
								checked={q.responses[date] === false}
								onChange={() => editResponse(q, false)}
							/>
							<label htmlFor={`${q?._id}boolean-f`}>False</label>
						</div>
					</>
				);

			case "text":
				return (
					<input
						className="text-response-input"
						type="text"
						value={q.responses[date] || ""}
						onChange={e => editResponse(q, e.currentTarget.value)}
					/>
				);

			case "number":
				return (
					<input
						type="number"
						className="number-response-input"
						value={q.responses[date] || ""}
						onChange={e => editResponse(q, e.currentTarget.value)}
					/>
				);

			case "multiple":
				return q?.multipleChoice.map((choice, idx) => (
					<div
						key={`${q?._id}mult${idx}`}
						style={{
							display: "flex",
							alignContent: "center",
							fontWeight: 400,
							marginBottom: "10px",
							marginTop: "10px",
							fontSize: "medium",
						}}
					>
						<input
							id={`${q?._id}multiple${idx}`}
							type="radio"
							name={q?._id}
							value={idx}
							checked={q?.responses[date] == idx}
							onChange={e => editResponse(q, idx)}
						/>
						<label htmlFor={`${q?._id}multiple${idx}`}>
							{choice}
						</label>
					</div>
				));
			default:
				<></>;
		}
	};

	useEffect(() => {
		setEdittedQuestions([]);
		setEdittingQuestions(questions);
	}, [date, questions]);

	return (
		<>
			<div className="top-div">
				<ArrowBackIosOutlinedIcon
					fontSize="smaller"
					onClick={() => incrementDate(date, -1)}
				/>
				<h2>{date}</h2>
				<ArrowForwardIosOutlinedIcon
					style={{
						visibility: date === getToday() ? "hidden" : "visible",
					}}
					fontSize="smaller"
					onClick={() => incrementDate(date, 1)}
				/>
			</div>

			{edittingQuestions.length > 0 ? (
				<>
					{edittingQuestions.map((q, idx) => (
						<div className="middle" key={`logday${idx}`}>
							<div className="in">{q?.questionText}</div>
							{questionRendering(q)}
						</div>
					))}
					<div className="down">
						<button className="save-button" onClick={submit}>
							Submit
						</button>
					</div>
				</>
			) : (
				<div style={{ textAlign: "center" }}>
					<b>Start with adding new questions!</b>
				</div>
			)}
		</>
	);
}

export default Logday;
