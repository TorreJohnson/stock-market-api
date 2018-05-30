import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route } from "react-router-dom";
import Stocks from "./Stocks";
import Company from "./CompanyDetails";

export default class App extends Component {
	state = {
		stocks: {
			aapl: {},
			amzn: {},
			fb: {},
			msft: {},
			googl: {}
		}
	};

	componentDidMount() {
		this.iterateThroughStocksInState();
	}

	iterateThroughStocksInState = () => {
		for (let stockCode in this.state.stocks) {
			this.groupedFetches(stockCode);
		}
	};

	fetchStockHistory(stockCode) {
		fetch(`https://api.iextrading.com/1.0/stock/${stockCode}/chart/1y`, {
			headers: {
				"Content-Type": "application/json",
				accept: "application/json"
			}
		})
			.then(res => res.json())
			.then(res => {
				let fiveDayX = res.slice(-5).map(day => day.date);
				let fiveDayY = res.slice(-5).map(day => day.close);
				this.setState({
					stocks: {
						...this.state.stocks,
						[stockCode]: {
							...this.state.stocks[stockCode],
							history: res,
							fiveDayX: fiveDayX,
							fiveDayY: fiveDayY
						}
					}
				});
			})
			.catch(console.log);
	}

	fetchStockCompanyInfo(stockCode) {
		fetch(`https://api.iextrading.com/1.0/stock/${stockCode}/company`, {
			headers: {
				"Content-Type": "application/json",
				accept: "application/json"
			}
		})
			.then(res => res.json())
			.then(res => {
				this.setState({
					stocks: {
						...this.state.stocks,
						[stockCode]: { ...this.state.stocks[stockCode], ...res }
					}
				});
			})
			.catch(console.log);
	}

	fetchStockLogo(stockCode) {
		fetch(`https://api.iextrading.com/1.0/stock/${stockCode}/logo`, {
			headers: {
				"Content-Type": "application/json",
				accept: "application/json"
			}
		})
			.then(res => res.json())
			.then(res => {
				this.setState({
					stocks: {
						...this.state.stocks,
						[stockCode]: { ...this.state.stocks[stockCode], ...res }
					}
				});
			})
			.catch(err => {
				console.log(err);
				alert("Invalid Stock Code. Please Try Again.");
			});
	}

	groupedFetches(stockCode) {
		this.fetchStockHistory(stockCode);
		this.fetchStockCompanyInfo(stockCode);
		this.fetchStockLogo(stockCode);
	}

	addAdditionalStocksToState = stockCode => {
		this.groupedFetches(stockCode);
	};

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to Stockist</h1>
				</header>
				<div>
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
