import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import '../css/main.css'


class GameMap extends Component{
  constructor(props) {
    super(props);
	this.state = {
	  username: '',
	  mainMenu: [],
	  buildings: [],
	}
	this.renderBuildings = this.renderBuildings.bind(this);	
	this.selectBuilding = this.selectBuilding.bind(this);
}

	selectBuilding = (building, event) => {
		event.preventDefault();
		console.log("clicked", building);
	}


	renderBuildings= () => {
		this.setState( {buildings: ["medialab", "sloan"]} );
		return this.state.buildings;
	}

	componentDidMount() {
		this.renderBuildings();
	}

	render() {
		let buildings = this.state.buildings;

		return(

			<div id="map">
			{buildings.map((d, i) => <div id={d} key={i} className="building" onClick={(event) => this.selectBuilding(d, event)}>
				{d}
			</div>)}
			</div>
		);
	}
}

export default GameMap;