import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
			{buildings.map((d, i) => <div id={d} key={i} className="building">
				{d}
			</div>)}
			</div>
		);
	}
}

export default GameMap;