import React from "react";
import { withRouter } from "react-router-dom";
import Plot from "react-plotly.js";

class Company extends React.Component {
	state = {
		filter: "",
		x: [],
		y: []
	};

	componentDidMount() {
		if (!this.props.stocks[this.props.match.params.stock].history) {
			this.props.history.push("/");
		} else {
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

	render() {
		return (
			<div>
				<div className="details">
					<img
						src={this.props.stocks[this.props.match.params.stock].url}
						alt={this.props.stocks[this.props.match.params.stock].companyName}
					/>

					<h1>
						{this.props.stocks[this.props.match.params.stock].companyName}
					</h1>
					<h3>
						{this.props.stocks[this.props.match.params.stock].description}
					</h3>
					<p>CEO: {this.props.stocks[this.props.match.params.stock].CEO}</p>
					<p>
						Industry:{" "}
						{this.props.stocks[this.props.match.params.stock].industry}
					</p>
					<p>
						Website:{" "}
						<a
							href={this.props.stocks[this.props.match.params.stock].website}
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
						layout={{ width: "50vw", height: "auto", title: "A Fancy Plot" }}
					/>
				</div>
			</div>
		);
	}
}

export default withRouter(Company);
