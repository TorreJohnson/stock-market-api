import React, { Component } from "react";
import { Link } from "react-router-dom";
import Plot from "react-plotly.js";

export default class Stocks extends Component {
	state = {
		newStock: ""
	};

	handleChange = e => {
		this.setState({
			newStock: e.target.value
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		if (this.state.newStock.length) {
			this.props.newStockAddition(this.state.newStock);
			this.setState({
				newStock: ""
			});
		} else {
			alert("Please enter a valid NASDAQ symbol");
		}
	};

	listStocks = () => {
		let links = [];
		for (let stock in this.props.stocks) {
			links.push(
				<div>
					<div className="details">
						<Link key={stock} to={`/${stock}`}>
							{this.props.stocks[stock].companyName} (NASDAQ:{" "}
							{stock.toUpperCase()})
						</Link>
						{this.props.stocks[stock].fiveDayY ? (
							<div>
								<h4>
									5-Day High:{" "}
									{
										this.findFiveDayHighLowAve(
											this.props.stocks[stock].fiveDayY
										)[0]
									}
								</h4>
								<h4>
									5-Day Low:{" "}
									{
										this.findFiveDayHighLowAve(
											this.props.stocks[stock].fiveDayY
										)[1]
									}
								</h4>
								<h4>
									5-Day Average:
									{
										this.findFiveDayHighLowAve(
											this.props.stocks[stock].fiveDayY
										)[2]
									}
								</h4>
							</div>
						) : null}
					</div>
					<div className="company-chart">
						<Plot
							data={[
								{
									x: this.props.stocks[stock].fiveDayX,
									y: this.props.stocks[stock].fiveDayY,
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

	findFiveDayHighLowAve = stockPrices => {
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

	render() {
		console.log(this.props.stocks);
		return (
			<div>
				<div className="details">
					<div className="form details">
						<form onSubmit={this.handleSubmit}>
							<label>Add a stock to your list:</label>
							<input
								type="text"
								placeholder="Enter NASDAQ symbol"
								value={this.state.newStock}
								onChange={this.handleChange}
							/>
							<input type="submit" value="Add Stock" />
						</form>
					</div>
				</div>
				{this.listStocks()}
			</div>
		);
	}
}
