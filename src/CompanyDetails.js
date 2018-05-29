import React from "react";

export const Company = props => {
	console.log(props.stocks[props.match.params.stock]);
	return (
		<div>
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
				<a href={props.stocks[props.match.params.stock].website}>
					{props.stocks[props.match.params.stock].website}
				</a>
			</p>
		</div>
	);
};
