import React from "react";
import Plot from "react-plotly.js";

export const Company = props => {
	console.log(props.stocks[props.match.params.stock]);
	let x = props.stocks[props.match.params.stock].history.map(day => day.date);
	let y = props.stocks[props.match.params.stock].history.map(day => day.close);
	return (
		<div>
			<div className="details">
				<img
					src={props.stocks[props.match.params.stock].url}
					alt={props.stocks[props.match.params.stock].companyName}
				/>

				<h1>{props.stocks[props.match.params.stock].companyName}</h1>
				<h3>{props.stocks[props.match.params.stock].description}</h3>
				<p>CEO: {props.stocks[props.match.params.stock].CEO}</p>
				<p>Industry: {props.stocks[props.match.params.stock].industry}</p>
				<p>
					Website:{" "}
					<a
						href={props.stocks[props.match.params.stock].website}
						target="_blank"
					>
						{props.stocks[props.match.params.stock].website}
					</a>
				</p>
			</div>
			<div className="company-chart">
				<Plot
					data={[
						{
							x: x,
							y: y,
							type: "scatter",
							mode: "lines+points",
							marker: { color: "red" }
						}
					]}
					layout={{ width: "50vw", height: "auto", title: "A Fancy Plot" }}
				/>
			</div>
		</div>
	);
};
