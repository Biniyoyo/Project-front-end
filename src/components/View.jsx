import React from "react";
import {
	LineChart,
	Line,
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import { CSVLink } from "react-csv";
import DownloadSharpIcon from "@mui/icons-material/DownloadSharp";
import "../css/view.css";

function View(props) {
	const { questions, user } = props;

	const sortByDate = arr => {
		return arr.sort(function (a, b) {
			return new Date(b) - new Date(a);
		});
	};

	const csvDownloadButton = text => {
		let data = [];
		const headers = [
			{ label: "date", key: "date" },
			{ label: "createdDate", key: "createdDate" },
			{ label: "question", key: "question" },
			{ label: "type", key: "type" },
			{ label: "mult1", key: "mult1" },
			{ label: "mult2", key: "mult2" },
			{ label: "mult3", key: "mult3" },
			{ label: "response", key: "response" },
		];
		questions.forEach(question =>
			sortByDate(Object.keys(question?.responses)).forEach(response =>
				data.push({
					date: response,
					createdDate: question.createdDate,
					question: question.questionText,
					type: question.questionType,
					mult1: question.multipleChoice[0],
					mult2: question.multipleChoice[1],
					mult3: question.multipleChoice[2],
					response: question?.responses[response],
				})
			)
		);
		return (
			<CSVLink
				headers={headers}
				data={data}
				filename={`logday_export_${user?._id}.csv`}
				className="export"
				onClick={() => {
					return window.confirm(
						"Do you want to export the whole data?"
					);
				}}
			>
				<DownloadSharpIcon
					style={{ cursor: "pointer" }}
					fontSize="medium"
				/>
			</CSVLink>
		);
	};

	const textTypeCard = question => {
		return (
			<div className="middle">
				<div>
					<b>{question?.questionText}</b> {" - "}
					{Object.keys(question.responses).length} response(s)
				</div>
				<div className="textData">
					{sortByDate(Object.keys(question.responses)).map(date => (
						<div
							className="responseBlock"
							key={`${question._id}-response${date}`}
						>
							<div
								style={{
									marginRight: "10px",
									fontWeight: 600,
								}}
							>
								{date}
							</div>
							{question.responses[date]}
						</div>
					))}
					<br />
				</div>
			</div>
		);
	};

	const numberTypeCard = question => {
		const data = sortByDate(Object.keys(question.responses))
			.reverse()
			.map(date => {
				return {
					date: date,
					value: question.responses[date],
				};
			});

		return (
			<div className="middle">
				<div>
					<div>
						<b>{question.questionText}</b>
						{" - "}
						{Object.keys(data).length} response(s)
					</div>
					<div
						style={{
							overflowX: "auto",
							marginTop: "20px",
							width: "100%",
							height: 300,
						}}
					>
						<ResponsiveContainer>
							<LineChart
								data={data}
								margin={{ left: 0, right: 40 }}
							>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="date" />
								<YAxis />
								<Tooltip />
								<Line
									type="linear"
									dataKey="value"
									stroke="#f76b8a"
								/>
							</LineChart>
						</ResponsiveContainer>
					</div>
				</div>
			</div>
		);
	};

	const booleanTypeCard = question => {
		const trueCount = Object.values(question.responses).filter(
			response => response
		).length;
		const falseCount = Object.values(question.responses).filter(
			response => !response
		).length;
		const data = [
			{ bool: "True", value: trueCount },
			{ bool: "False", value: falseCount },
		];

		return (
			<div className="middle">
				<div>
					<div>
						<b>{question.questionText}</b>
						{" - "}
						{Object.keys(question.responses).length} response(s)
					</div>
					<div
						style={{
							overflowX: "auto",
							marginTop: "20px",
							width: "100%",
							height: 300,
						}}
					>
						<ResponsiveContainer>
							<BarChart
								data={data}
								margin={{ left: 0, right: 40 }}
							>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="bool" />
								<YAxis />
								<Tooltip />
								<Bar dataKey="value" fill="#f76b8a" />
							</BarChart>
						</ResponsiveContainer>
					</div>
				</div>
			</div>
		);
	};

	const multipleTypeCard = question => {
		const firstCount = Object.values(question.responses).filter(
			response => response == 0
		).length;
		const secondCount = Object.values(question.responses).filter(
			response => response == 1
		).length;
		const thirdCount = Object.values(question.responses).filter(
			response => response == 2
		).length;

		const data = [
			{ choice: question.multipleChoice[0], value: firstCount },
			{ choice: question.multipleChoice[1], value: secondCount },
			{ choice: question.multipleChoice[2], value: thirdCount },
		];

		console.log(data);

		return (
			<div className="middle">
				<div>
					<div>
						<b>{question.questionText}</b>
						{" - "}
						{Object.keys(question.responses).length} response(s)
					</div>
					<div
						style={{
							overflowX: "auto",
							marginTop: "20px",
							width: "100%",
							height: 300,
						}}
					>
						<ResponsiveContainer>
							<BarChart
								data={data}
								margin={{ left: 0, right: 40 }}
							>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="choice" />
								<YAxis />
								<Tooltip />
								<Bar dataKey="value" fill="#f76b8a" />
							</BarChart>
						</ResponsiveContainer>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className="viewData">
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
				<h3 style={{ fontWeight: 900 }}>View Data</h3>

				{csvDownloadButton("Export Data")}
			</div>

			{questions.length > 0 ? (
				questions.map(question => {
					switch (question.questionType) {
						case "text":
							return textTypeCard(question);
						case "number":
							return numberTypeCard(question);
						case "boolean":
							return booleanTypeCard(question);
						case "multiple":
							return multipleTypeCard(question);
					}
				})
			) : (
				<div style={{ textAlign: "center" }}>
					<b>No Data to Show!</b>
				</div>
			)}
		</div>
	);
}

export default View;
