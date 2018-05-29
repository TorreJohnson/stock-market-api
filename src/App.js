import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route } from "react-router-dom";
import Stocks from "./Stocks";

class App extends Component {
	state = {
		stocks: {
			aapl: { name: "Apple", history: {} },
			amzn: { name: "Amazon", history: {} },
			fb: { name: "Facebook", history: {} },
			msft: { name: "Microsoft", history: {} },
			googl: { name: "Alphabet", history: {} }
		},
		stockSymbols: []
	};

	componentDidMount() {
		this.addDefaultStockHistoryToState();
	}

	addDefaultStockHistoryToState = () => {
		for (let stock in this.state.stocks) {
			this.fetchStockPrices(stock);
		}
	};

	fetchStockPrices(stockCode) {
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
	}

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
						render={props => <Stocks {...props} stocks={this.state.stocks} />}
					/>
				</div>
			</div>
		);
	}
}

export default App;
