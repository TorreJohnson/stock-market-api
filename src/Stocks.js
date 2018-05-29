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

	listStocks = () => {
		let links = [];
		for (let stock in this.props.stocks) {
			links.push(
				<Link key={stock} to={`/stocks/${this.props.stocks[stock].name}`}>
					{this.props.stocks[stock].name}: (NASDAQ: {stock.toUpperCase()})
				</Link>
			);
		}
		return links;
	};

	render() {
		return (
			<div>
				{this.listStocks()}
				<Link key="aapl" to="/stocks/apple">
					Apple (NASDAQ: AAPL)
				</Link>
				<form>
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
