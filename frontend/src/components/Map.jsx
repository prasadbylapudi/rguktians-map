import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";

//components
import data from "../data/studentData";
import Rguktians from "./Rguktians";

class Map extends Component {
	constructor(props) {
		super(props);

		this.state = {
			search: "",
			campus: "",
			branch: "",
			batch: "",
			rgukt: []
		};
	}

	handlechange(e) {
		this.setState({
			[e.target.name]: e.target.value,
			rgukt: data.filter((student) =>
				JSON.stringify(student)
					.toLowerCase()
					.includes(e.target.value.toLowerCase())
			)
		});
	}

	handlecampus(e) {
		if (parseInt(e.target.value) === 0) {
			this.setState({
				[e.target.name]: e.target.value,
				rgukt: data
			});
			return;
		}
		var fil = data.filter((ele) => ele.campus === e.target.value);
		this.setState({
			[e.target.name]: e.target.value,
			rgukt: fil
		});
	}

	handlebatch(e) {
		if (parseInt(e.target.value) === 0) {
			this.setState({
				[e.target.name]: e.target.value,
				rgukt: data
			});
			return;
		}
		var fil = data.filter((ele) => ele.batch === parseInt(e.target.value));
		this.setState({
			[e.target.name]: e.target.value,
			rgukt: fil
		});
	}

	handlebranch(e) {
		if (parseInt(e.target.value) === 0) {
			this.setState({
				[e.target.name]: e.target.value,
				rgukt: data
			});
			return;
		}
		var fil = data.filter((ele) => ele.branch === e.target.value);
		this.setState({
			[e.target.name]: e.target.value,
			rgukt: fil
		});
	}

	componentDidMount() {
		this.setState({
			rgukt: data
		});
	}

	render() {
		return (
			<div>
				<Grid 
					container
					className="darkNav"
					direction="row"
					style={{padding: "1%", backgroundColor: "#1769aa"}}
				>
					<Grid item xs={12} md={2} style={{padding: "5px"}}>
						<input
							autoComplete="off"
							placeholder="Search for a student"
							style={{width: "100%", padding: "3px"}}
							name="search"
							onChange={(e) => this.handlechange(e)}
						/>
					</Grid>
					<Grid item xs={12} md={5} />
					<Grid item xs={12} md={1} style={{padding: "5px"}}>
						<select
							style={{
								width: "100%",
								backgroundColor: "white",
								padding: "3px"
							}}
							name="batch"
							onChange={(e) => this.handlebatch(e)}
							value={this.state.batch}
						>
							<option value={0}>Batch</option>
							<option value={2021}>2021</option>
							<option value={2020}>2020</option>
							<option value={2019}>2019</option>
							<option value={2018}>2018</option>
							<option value={2017}>2017</option>
							<option value={2016}>2016</option>
							<option value={2015}>2015</option>
							<option value={2014}>2014</option>
							<option value={2013}>2013</option>
							<option value={2012}>2012</option>
							<option value={2011}>2011</option>
							<option value={2010}>2010</option>
							<option value={2009}>2009</option>
							<option value={2008}>2008</option>
						</select>
					</Grid>
					<Grid item xs={12} md={2} style={{padding: "5px"}}>
						<select
							style={{
								width: "100%",
								backgroundColor: "white",
								padding: "3px"
							}}
							name="branch"
							onChange={(e) => this.handlebranch(e)}
							value={this.state.branch}
						>
							<option value={0}>Branch</option>
							<option value="CSE">Computer Science Engineering</option>
							<option value="ECE">Electrical & Communication Engineering</option>
							<option value="MECH">Mechanical Engineering</option>
							<option value="CIVIL">Civil Engineering</option>
							<option value="CHEM">Chemical Engineering</option>
							<option value="MME">Metallurgical Engineering</option>
						</select>
					</Grid>
					<Grid item xs={12} md={2} style={{padding: "5px"}}>
						<select
							style={{
								width: "100%",
								backgroundColor: "white",
								padding: "3px"
							}}
							name="campus"
							onChange={(e) => this.handlecampus(e)}
							value={this.state.campus}
						>
							<option value={0}>Campus</option>
							<option value="Srikakulam">Srikakulam</option>
							<option value="Nuzvid">Nuzvid</option>
							<option value="RK Valley">RK Valley</option>
							<option value="Ongole">Ongole</option>
						</select>
					</Grid>
				</Grid>
				<Rguktians
					data={this.state.rgukt.sort((a, b) =>
						a.name > b.name ? 1 : b.name > a.name ? -1 : 0
					)}
				/>
			</div>
		);
	}
}

export default Map;
