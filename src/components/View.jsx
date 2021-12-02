import React from "react";
import {
	LineChart,
	Line,
	BarChart,
	Bar,
	PieChart,
	Pie,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	Cell,
} from "recharts";
import { CSVLink, CSVDownload } from "react-csv";
import "../css/view.css";
import { useEffect, useState, useCallback } from "react";
import { configure } from "@testing-library/dom";

function View(props) {
	const { questions, user } = props;
	const getQuestions = async () => {
		// This part is dummy data. I'll change to http fetch function later.
		const newQuestions = [
			{
				_id: 0,
				creator: "",
				createdDate: "",
				questionType: "text",
				questionText: "What is your name?",
				multipleChoice: [],
				createdDate: new Date(),
				responses: { "11/27/2021": "Kyungbae Min" },
			},
			{
				_id: 1,
				creator: "",
				createdDate: "",
				questionType: "number",
				questionText: "How old are you?",
				multipleChoice: [],
				createdDate: new Date(),
				responses: { "11/27/2021": 22 },
			},
			{
				_id: 2,
				creator: "",
				createdDate: "",
				questionType: "boolean",
				questionText: "Did you do your assignments?",
				multipleChoice: [],
				createdDate: new Date(),
				responses: { "11/27/2021": true },
			},
			{
				_id: 3,
				creator: "",
				createdDate: "",
				questionType: "multiple",
				questionText: "What is your favorite color?",
				multipleChoice: ["Red", "Green", "Blue"],
				createdDate: new Date(),
				responses: { "11/27/2021": 0 },
			},
			{
				_id: 0,
				creator: "",
				createdDate: "",
				questionType: "text",
				questionText: "What is your major?",
				multipleChoice: [],
				createdDate: new Date(),
				responses: { "11/30/2021": "Major: Ams & Minor: CSE" },
			},
			{
				_id: 0,
				creator: "",
				createdDate: "",
				questionType: "text",
				questionText: "Korean food you like?",
				multipleChoice: [],
				createdDate: new Date(),
				responses: { "11/29/2021": "Kimchi" },
			},
		];
		// setQuestions(newQuestions);
	};

	//temporary objects to catagorize questions

	const dataForMultiple = [
		// {
		// 	name: " ",
		// 	response1: 2,
		// 	response2: 3,
		// 	response3: 4,
		// },
		{
			_id: 3,
			creator: "",
			createdDate: "",
			questionType: "multiple",
			questionText: "What is your favorite color?",
			multipleChoice: ["Red", "Green", "Blue"],
			createdDate: new Date(),
			responses: { "11/27/2021": 0, "11/28/2021": 1 },
		},
		{
			_id: 3,
			creator: "",
			createdDate: "",
			questionType: "multiple",
			questionText: "Where India is located?",
			multipleChoice: ["Asia", "N.America", "S.America"],
			createdDate: new Date(),
			responses: { "11/27/2021": 0 },
		},
	];

	const dataForBool = [
		// { name: 'True', value: 400 },
		// { name: 'False', value: 400 },
		{
			_id: 2,
			creator: "",
			createdDate: "",
			questionType: "boolean",
			questionText: "Did you do your assignments?",
			multipleChoice: [],
			createdDate: new Date(),
			responses: { "11/27/2021": true },
		},
		{
			_id: 2,
			creator: "",
			createdDate: "",
			questionType: "boolean",
			questionText: "Water is liquid?",
			multipleChoice: [],
			createdDate: new Date(),
			responses: { "11/28/2021": true },
		},
	];

	const dataForNumber = [
		// {
		// 	name: "Question",
		// 	response: [0,2],
		// 	response2:2,
		// },
		{
			_id: 1,
			creator: "",
			createdDate: "",
			questionType: "number",
			questionText: "How old are you?",
			multipleChoice: [],
			createdDate: new Date(),
			responses: { "11/27/2021": 22 },
		},
		{
			_id: 1,
			creator: "",
			createdDate: "",
			questionType: "number",
			questionText: "What is your admission year?",
			multipleChoice: [],
			createdDate: new Date(),
			responses: { "11/27/2021": 2019 },
		},
	];
	const dataForText = [
		{
			_id: 0,
			creator: "",
			createdDate: "",
			questionType: "text",
			questionText: "What is your major?",
			multipleChoice: [],
			createdDate: new Date(),
			responses: { "11/30/2021": "Major: Ams & Minor: CSE" },
		},
		{
			_id: 0,
			creator: "",
			createdDate: "",
			questionType: "text",
			questionText: "Korean food you like?",
			multipleChoice: [],
			createdDate: new Date(),
			responses: {
				"11/29/2021": "Kimchi",
				"11/30/2021": "Kimbab",
				"11/31/2021": "Bibimbab",
			},
		},
	];

	const COLORS = ["#0088FE", "#FF8042"];

	const sortByDate = arr => {
		return arr.sort(function (a, b) {
			return new Date(b) - new Date(a);
		});
	};

	const csvDownloadButton = () => {
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
			>
				Export
			</CSVLink>
		);
	};

	useEffect(() => {
		getQuestions();
	}, []);

	useEffect(() => {
		questions.forEach(q => {
			if (q.questionType === "multiple") {
				var response1 = 0;
				var response2 = 0;
				var response3 = 0;

				for (const r of Object.keys(q.responses)) {
					if (r === 0) {
						response1 = 89;
					}
					if (r === 1) {
						response2++;
					}
					if (r === 2) {
						response3++;
					}
				}
			}
			if (q.questionType === "bool" && !dataForBool.includes(q)) {
				dataForBool.push(q);
			}
			if (q.questionType === "number" && !dataForNumber.includes(q)) {
				dataForNumber.push(q);
			}
			if (q.questionType === "text" && !dataForText.includes(q)) {
				dataForText.push(q);
				dataForText.sort((a, b) => {
					return a.createdDate - b.createdDate;
				});
				console.log(dataForText);
			}
		});
	}, [questions, props.currentPage]);

	return (
		<div className="viewData">
			{csvDownloadButton()}
			<div className="textData">
				{dataForText.map(q => (
					<>
						<div>{q.questionText}</div>
						<br />
						{Object.keys(q.responses).map(d => (
							<>
								<div className="dateBlock">{d}:</div>
								<div className="responseBlock">
									{q.responses[d]}
								</div>
								<br />
							</>
						))}
						<br />
					</>
				))}
			</div>

			<div className="bar">
				{dataForMultiple.map(q => (
					<>
						<p>{q.questionText}</p>
						<div width="100%" height="100%">
							<BarChart
								width={500}
								height={300}
								data={dataForMultiple}
								margin={{
									top: 5,
									right: 30,
									left: 20,
									bottom: 5,
								}}
							>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="name" />
								<YAxis />
								<Tooltip />
								<Legend />
								<Bar
									dataKey={q.multipleChoice[0]}
									fill="#8884d8"
								/>
								<Bar
									dataKey={q.multipleChoice[1]}
									fill="#82ca9d"
								/>
								<Bar
									dataKey={q.multipleChoice[2]}
									fill="skyblue"
								/>
							</BarChart>
						</div>
					</>
				))}
			</div>

			<div className="line">
				{dataForNumber.map(q => (
					<>
						<div width="100%" height="100%">
							<p>{q.questionText}</p>
							<LineChart
								width={500}
								height={300}
								data={dataForNumber}
								margin={{
									top: 5,
									right: 30,
									left: 20,
									bottom: 5,
								}}
							>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="name" />
								<YAxis />
								<Tooltip />
								<Legend />
								<Line
									type="monotone"
									dataKey="response"
									stroke="#8884d8"
									activeDot={{ r: 8 }}
								/>
							</LineChart>
						</div>
					</>
				))}
			</div>

			<div className="pie">
				{dataForBool.map(q => (
					<>
						<div width="100%" height="100%">
							<p>{q.questionText}</p>
							<PieChart width={400} height={400}>
								<Pie
									data={dataForBool}
									cx="50%"
									cy="50%"
									labelLine={false}
									outerRadius={80}
									fill="#8884d8"
									dataKey="value"
								>
									{dataForBool.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={COLORS[index % COLORS.length]}
										/>
									))}
								</Pie>
								<Legend />
							</PieChart>
						</div>
					</>
				))}
			</div>
		</div>
	);
}

export default View;
