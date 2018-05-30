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
						<div className="details-container">
							<Link key={stock} to={`/${stock}`}>
								{props.stocks[stock].companyName} (NASDAQ: {stock.toUpperCase()})
							</Link>
							{props.stocks[stock].fiveDayY ? (
								<div>
									<h4>
										High:{" $"}
										{findFiveDayHighLowAve(props.stocks[stock].fiveDayY)[0]} USD
									</h4>
									<h4>
										Low:{" $"}
										{findFiveDayHighLowAve(props.stocks[stock].fiveDayY)[1]} USD
									</h4>
									<h4>
										Average:{" $"}
										{findFiveDayHighLowAve(props.stocks[stock].fiveDayY)[2]} USD
									</h4>
								</div>
							) : null}
						</div>
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
