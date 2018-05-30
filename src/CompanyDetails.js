import React from "react";
import { withRouter } from "react-router-dom";
import Plot from "react-plotly.js";
import io from "socket.io-client";

class Company extends React.Component {
	state = {
		filter: "",
		x: [],
		y: [],
		stockPrice: 0
	};

	componentDidMount() {
		if (!this.props.stocks[this.props.match.params.stock]) {
			this.props.history.push("/");
		} else if (!this.props.stocks[this.props.match.params.stock].history) {
			this.props.history.push("/");
		} else {
			this.webSocket();
			let x = this.props.stocks[this.props.match.params.stock].history.map(
				day => day.date
			);
			let y = this.props.stocks[this.props.match.params.stock].history.map(
				day => day.close
			);
			this.setState({
				x: x,
				y: y
			});
		}
	}

	webSocket() {
		const socket = io.connect("https://ws-api.iextrading.com/1.0/last");
		socket.on("message", message => {
			let res = JSON.parse(message);
			this.setState({
				stockPrice: res.price
			});
		});
		socket.on("connect", () => {
			socket.emit("subscribe", this.props.match.params.stock);
		});
	}

	render() {
		console.log(this.state);
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
											x: this.state.x,
											y: this.state.y,
											type: "scatter",
											mode: "lines+points",
											marker: { color: "red" }
										}
									]}
									layout={{
										width: "50vw",
										height: "auto",
										title: "A Fancy Plot"
									}}
								/>
							</div>
						</div>
						<div className="lower-company-details">
							Current Share Price: {this.state.stockPrice}
						</div>
					</div>
				) : null}
			</div>
		);
	}
}

export default withRouter(Company);
