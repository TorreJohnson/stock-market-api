import React, { Component } from "react";
import { Link } from "react-router-dom";

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
		this.props.newStockAddition(this.state.newStock);
		this.setState({
			newStock: ""
		});
	};

	listStocks = () => {
		let links = [];
		for (let stock in this.props.stocks) {
			links.push(
				<Link key={stock} to={`/${stock}`}>
					{this.props.stocks[stock].companyName} (NASDAQ: {stock.toUpperCase()})
				</Link>
			);
		}
		return links;
	};

	render() {
		return (
			<div>
				{this.listStocks()}
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
		);
	}
}
