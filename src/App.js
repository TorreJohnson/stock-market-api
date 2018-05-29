import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, withRouter } from "react-router-dom";
import Stocks from "./Stocks";
import Company from "./CompanyDetails";

class App extends Component {
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
		for (let stock in this.state.stocks) {
			this.fetchStockDetails(stock);
		}
	};

	fetchStockDetails(stockCode) {
		fetch(`https://api.iextrading.com/1.0/stock/${stockCode}/chart/1m`, {
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
						[stockCode]: { ...this.state.stocks[stockCode], history: res }
					}
				});
			});
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
			});
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
			});
	}

	addAdditionalStocksToState = stockCode => {
		this.fetchStockDetails(stockCode);
	};

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to Stock Tracker</h1>
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

export default withRouter(App);
