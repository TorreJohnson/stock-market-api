import React from "react";
import { withRouter } from "react-router-dom";
import Plot from "react-plotly.js";
import io from "socket.io-client";

class Company extends React.Component {
	state = {
		filter: "One Year",
		x: [],
		y: [],
		filteredX: [],
		filteredY: [],
		stockPrice: 0,
		stockTime: "n/a",
		activeButton: ""
	};

	componentDidMount() {
		if (!this.props.stocks[this.props.match.params.stock]) {
			this.props.history.push("/");
		} else if (!this.props.stocks[this.props.match.params.stock].history) {
			this.props.history.push("/");
		} else {
			window.scrollTo(0, 0);
			this.webSocket();
			let x = this.props.stocks[this.props.match.params.stock].history.map(
				day => day.date
			);
			let y = this.props.stocks[this.props.match.params.stock].history.map(
				day => day.close
			);
			this.setState({
				x: x,
				y: y,
				filteredX: x,
				filteredY: y
			});
		}
	}

	handleDateRangeChange = e => {
		this.setState(
			{
				filter: e.target.value,
				activeButton: e.target.value
			},
			() => {
				this.adjustChartValues();
			}
		);
	};

	adjustChartValues = () => {
		let dateRange = 0;
		if (this.state.filter === "Six Months") {
			dateRange = -120;
		} else if (this.state.filter === "One Month") {
			dateRange = -20;
		}
		let x = this.state.x.slice(dateRange);
		let y = this.state.y.slice(dateRange);
		this.setState({
			filteredX: x,
			filteredY: y
		});
	};

	webSocket() {
		const socket = io("https://ws-api.iextrading.com/1.0/last");
		socket.on("message", message => {
			let res = JSON.parse(message);
			let time = new Date(res.time);
			time = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
			this.setState({
				stockPrice: res.price,
				stockTime: time
			});
		});
		socket.on("connect", () => {
			socket.emit("subscribe", this.props.match.params.stock);
		});
	}

	stockLowHighAve = () => {
		let high = this.state.filteredY[0];
		let low = this.state.filteredY[0];
		let ave = 0;
		for (let i = 0; i < this.state.filteredY.length; i++) {
			if (this.state.filteredY[i] < low) {
				low = this.state.filteredY[i];
			} else if (this.state.filteredY[i] > high) {
				high = this.state.filteredY[i];
			}
			ave += this.state.filteredY[i];
		}
		ave = (ave / this.state.filteredY.length).toFixed(2);
		return (
			<div>
				<h3>High: {high}</h3>
				<h3>Low: {low}</h3>
				<h3>Average: {ave}</h3>
			</div>
		);
	};

	render() {
		return (
			<div>
				{this.props.stocks[this.props.match.params.stock] ? (
					<div>
						<div>
							<div className="company-details">
								<img
									src={this.props.stocks[this.props.match.params.stock].url}
									alt={
										this.props.stocks[this.props.match.params.stock].companyName
									}
								/>
								<h1>
									{this.props.stocks[this.props.match.params.stock].companyName}
								</h1>
								<h3>
									{this.props.stocks[this.props.match.params.stock].description}
								</h3>
								<p>
									CEO: {this.props.stocks[this.props.match.params.stock].CEO}
								</p>
								<p>
									Industry:{" "}
									{this.props.stocks[this.props.match.params.stock].industry}
								</p>
								<p>
									Website:{" "}
									<a
										href={
											this.props.stocks[this.props.match.params.stock].website
										}
										target="_blank"
									>
										{this.props.stocks[this.props.match.params.stock].website}
									</a>
								</p>
							</div>
							<div className="company-chart">
								<Plot
									data={[
										{
											x: this.state.filteredX,
											y: this.state.filteredY,
											type: "scatter",
											mode: "lines+points",
											marker: { color: "red" }
										}
									]}
									layout={{
										width: "50vw",
										height: "auto",
										title: `${this.state.filter}`
									}}
								/>
								<div>
									<button
										value="One Year"
										onClick={this.handleDateRangeChange}
										className={
											this.state.activeButton === "One Year"
												? "date-buttons active"
												: "date-buttons"
										}
									>
										One Year
									</button>
									<button
										value="Six Months"
										onClick={this.handleDateRangeChange}
										className={
											this.state.activeButton === "Six Months"
												? "date-buttons active"
												: "date-buttons"
										}
									>
										Six Months
									</button>
									<button
										value="One Month"
										onClick={this.handleDateRangeChange}
										className={
											this.state.activeButton === "One Month"
												? "date-buttons active"
												: "date-buttons"
										}
									>
										One Month
									</button>
								</div>
							</div>
						</div>
						<div className="lower-company-details">
							Current Share Price (as of {this.state.stockTime})
							<div>
								{this.state.stockPrice >
								this.state.y[this.state.y.length - 1] ? (
									<div style={{ color: "green" }}>
										<h2>
											{this.state.stockPrice}
											<img
												src="./002-upload.png"
												alt={this.state.stockPrice}
												className="arrow"
											/>
										</h2>
									</div>
								) : (
									<div style={{ color: "red" }}>
										<h2>
											{this.state.stockPrice}
											<img
												src="./001-download.png"
												alt={this.state.stockPrice}
												className="arrow"
											/>
										</h2>
									</div>
								)}
							</div>
							{this.stockLowHighAve()}
						</div>
					</div>
				) : null}
			</div>
		);
	}
}

export default withRouter(Company);
