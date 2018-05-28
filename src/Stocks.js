import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

export default class Stocks extends Component {
	state = {
		newStock: ""
	};

	handleChange = e => {
		this.setState({
			newStock: e.target.value
		});
	};

	listStocks = () => {};

	render() {
		return (
			<div>
				<h3>Apple</h3>
				<h4>NASDAQ: AAPL</h4>
				<h3>Amazon</h3>
				<h4>NASDAQ: AMZN</h4>
				<h3>Facebook</h3>
				<h4>NASDAQ: FB</h4>
				<h3>Microsoft</h3>
				<h4>NASDAQ: MSFT</h4>
				<h3>Alphabet</h3>
				<h4>NASDAQ: GOOGL</h4>
				<form>
					<label>Add A Stock Here:</label>
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
