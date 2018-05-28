import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route } from "react-router-dom";
import Stocks from "./Stocks";

class App extends Component {
	state = {
		stocks: { aapl: {}, amzn: {}, fb: {}, msft: {}, googl: {} },
		newStock: ""
	};

	componentDidMount() {
		this.fetchStockPrices();
	}

	fetchStockPrices = () => {
		for (let key in this.state.stocks) {
			fetch(`https://api.iextrading.com/1.0/stock/${key}/chart/1m`, {
				headers: {
					"Content-Type": "application/json",
					accept: "application/json"
				}
			})
				.then(res => res.json())
				.then(res => {
					this.setState({
						stocks: { ...this.state.stocks, [key]: res }
					});
				});
		}
	};

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to Stock Tracker</h1>
				</header>
				<div>
					<Route exact path="/" component={Stocks} />
				</div>
			</div>
		);
	}
}

export default App;
