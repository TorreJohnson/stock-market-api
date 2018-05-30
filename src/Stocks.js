import React from "react";
import { Link } from "react-router-dom";
import Plot from "react-plotly.js";
import cuid from "cuid";

export const Stocks = props => {
	let listStocks = () => {
		let links = [];
		for (let stock in props.stocks) {
			links.push(
				<div key={cuid()}>
					<div className="details">
						<Link key={stock} to={`/${stock}`}>
							{props.stocks[stock].companyName} (NASDAQ: {stock.toUpperCase()})
						</Link>
						{props.stocks[stock].fiveDayY ? (
							<div>
								<h4>
									5-Day High:{" "}
									{findFiveDayHighLowAve(props.stocks[stock].fiveDayY)[0]}
								</h4>
								<h4>
									5-Day Low:{" "}
									{findFiveDayHighLowAve(props.stocks[stock].fiveDayY)[1]}
								</h4>
								<h4>
									5-Day Average:
									{findFiveDayHighLowAve(props.stocks[stock].fiveDayY)[2]}
								</h4>
							</div>
						) : null}
					</div>
					<div className="company-chart">
						<Plot
							data={[
								{
									x: props.stocks[stock].fiveDayX,
									y: props.stocks[stock].fiveDayY,
									type: "scatter",
									mode: "lines+points"
								}
							]}
							layout={{
								width: "50vw",
								height: "auto"
							}}
						/>
					</div>
				</div>
			);
		}
		return links;
	};

	let findFiveDayHighLowAve = stockPrices => {
		let high = 0;
		let low = stockPrices[0];
		let ave = 0;
		for (let i = 0; i < stockPrices.length; i++) {
			if (stockPrices[i] > high) {
				high = stockPrices[i];
			}
			if (stockPrices[i] < low) {
				low = stockPrices[i];
			}
			ave += stockPrices[i];
		}
		ave = (ave / 5).toFixed(2);
		return [high, low, ave];
	};

	return <div>{listStocks()}</div>;
};
