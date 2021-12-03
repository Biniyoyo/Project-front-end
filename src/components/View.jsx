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
				className = "export"
			>
				Export
			</CSVLink>
		);
	};

	useEffect(() => {
		getQuestions();
	}, []);

	const RADIAN = Math.PI / 180;
	const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
		const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
		const x = cx + radius * Math.cos(-midAngle * RADIAN);
		const y = cy + radius * Math.sin(-midAngle * RADIAN);

		return (
			<text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
			{`${(percent * 100).toFixed(0)}%`}
			</text>
		);
	};

	const viewQuestion = ()=> {
		const dataForMultiple = [];
		const dataForBool = [];
		const dataForNumber = [];
		const dataForText = [];
		questions.forEach(q => {
			var arr = [];
			if (q.questionType === "multiple") {
				var response1 = 0;
				var response2 = 0;
				var response3 = 0;

				for (const r of Object.keys(q.responses)) {
					if (q.responses[r] === 0) {
						response1++;
					}
					if (q.responses[r] === 1) {
						response2++;
					}
					if (q.responses[r] === 2) {
						response3++;
					}
				}
				const r1 = {
					choice:q.multipleChoice[0],
					value:response1,
					text:q.questionText
				}
				const r2 = {
					choice:q.multipleChoice[1],
					value:response2,
					text:q.questionText
				}
				const r3 = {
					choice:q.multipleChoice[2],
					value:response3,
					text:q.questionText
				}
				arr.push(r1);
				arr.push(r2);
				arr.push(r3);
				dataForMultiple.push(arr);
			}
			if (q.questionType === "boolean") {
				var True = 0;
				var False = 0;

				for (const r of Object.keys(q.responses)) {
					if (q.responses[r]) {
						True++;
					}else{
						False++;
					}
				}
				const sum = True+False;
				const newQ = 
				[
					{ 
						name: 'True', 
						value: Math.round((True*100)/sum),
						text: q.questionText
					},
					{ 
						name: 'False', 
						value: Math.round((False*100)/sum),
						text: q.questionText
					},
				];
				dataForBool.push(newQ);
				console.log(dataForBool);
			}
			if (q.questionType === "number") {
				var arr = [];
				for (const r of Object.keys(q.responses)) {
					const point = {
									name: r,
									value: q.responses[r],
									text: q.questionText
							     }
					arr.push(point);

				}
				dataForNumber.push(arr);
				console.log(dataForNumber);
			}
			if (q.questionType === "text" && !dataForText.includes(q)) {
				dataForText.push(q);
				dataForText.sort((a, b) => {
					return a.createdDate - b.createdDate;
				});
			}
		});
		return (
				<><div className="textData">
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
			<div className="bar" key = "bar">
					{dataForMultiple.map(q => (
						<>
							<p>{q[0].text}</p>
							<div width="100%" height="100%">
							<BarChart
								width={500}
								height={300}
								data={q}
								margin={{
									top: 5,
									right: 30,
									left: 20,
									bottom: 5,
								}}
								>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="choice" />
								<YAxis />
								<Tooltip />
								<Legend />
								<Bar dataKey="value" fill="gray" />
							</BarChart>
							</div>
						</>
					))}
				</div>
				<div className="line" key = "line">
					{dataForNumber.map(q => (
						//<>
							<div width="100%" height="100%">
								<p>{q[0].text}</p>
								<LineChart
									width={500}
									height={300}
									data={q}
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
									<Line
										type="monotone"
										dataKey="value"
										stroke="#8884d8" />
								</LineChart>
							</div>
						//</>
					))}
				</div>
				<div className="pie" key = "pie">
					{dataForBool.map(q => (
						<>
							<div width="100%" height="100%">
								<p>{q[0].text}</p>
								<PieChart width={400} height={400}>
									<Pie
										data={q}
										cx="50%"
										cy="50%"
										labelLine={false}
										label={renderCustomizedLabel}
										outerRadius={80}
										fill="#8884d8"
										dataKey="value"
									>
										{q.map((entry, index) => (
											<>
												<Cell
													key={`cell-${index}`}
													fill={COLORS[index % COLORS.length]} />
											</>
										))}
									</Pie>
									<Legend />
								</PieChart>
							</div>
						</>
					))}
				</div></>
		);
		
	};

	return (
		<div className="viewData">
			{csvDownloadButton()}
			{viewQuestion()}
		</div>
	);
}

export default View;
