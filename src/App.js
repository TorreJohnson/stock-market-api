import React, { Component } from "react";
import "./App.css";
import { Route, NavLink } from "react-router-dom";
import { Stocks } from "./Stocks";
import Company from "./CompanyDetails";

export default class App extends Component {
	state = {
		stocks: {
			aapl: {},
			amzn: {},
			fb: {},
			msft: {},
			googl: {}
		},
		newStock: ""
	};

	componentDidMount() {
		this.iterateThroughStocksInState();
	}

	iterateThroughStocksInState = () => {
		for (let stockCode in this.state.stocks) {
			this.fetchStockInfo(stockCode);
		}
	};

	fetchStockInfo(stockCode) {
		fetch(
			`https://api.iextrading.com/1.0/stock/${stockCode}/batch?types=chart,company,logo&range=1y`,
			{
				headers: {
					"Content-Type": "application/json",
					accept: "application/json"
				}
			}
		)
			.then(res => res.json())
			.then(res => {
				let fiveDayX = res.chart.slice(-5).map(day => day.date);
				let fiveDayY = res.chart.slice(-5).map(day => day.close);
				this.setState({
					stocks: {
						...this.state.stocks,
						[stockCode]: {
							...this.state.stocks[stockCode],
							history: res.chart,
							fiveDayX: fiveDayX,
							fiveDayY: fiveDayY,
							...res.company,
							url: res.logo.url
						}
					}
				});
			})
			.catch(err => {
				console.log(err);
				alert("Invalid Stock Code. Please Try Again.");
			});
	}

	handleChange = e => {
		this.setState({
			newStock: e.target.value
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		if (this.state.newStock.length) {
			this.fetchStockInfo(this.state.newStock);
			this.setState({
				newStock: ""
			});
		} else {
			alert("Please enter a valid NASDAQ symbol");
		}
	};

	render() {
		return (
			<div className="App">
				<header>
					<ul>
						<li>
							<img src="./stocks.png" alt="stockist" id="logo" />
						</li>
						<li>
							<h2>Welcome to Stockist</h2>
						</li>
						<li className="right-floated">
							<div className="form">
								<form onSubmit={this.handleSubmit}>
									<input
										type="text"
										placeholder="NASDAQ symbol..."
										value={this.state.newStock}
										onChange={this.handleChange}
									/>
									<input type="submit" value="Add Stock" />
								</form>
							</div>
						</li>
						<li className="right-floated">
							<p>Add a stock:</p>
						</li>
						<li className="right-floated">
							<NavLink tag="a" to="/">
								Home
							</NavLink>
						</li>
					</ul>
				</header>
				<div className="body">
					<Route
						exact
						path="/"
						render={props => (
							<Stocks
								{...props}
								stocks={this.state.stocks}
								newStockAddition={this.addAdditionalStocksToState}
								fiveDayData={this.state.fiveDayData}
							/>
						)}
					/>
					<Route
						exact
						path="/:stock"
						render={props => <Company {...props} stocks={this.state.stocks} />}
					/>
				</div>
			</div>
		);
	}
}
