import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import '../css/main.css'


class GameMap extends Component{
  constructor(props) {
    super(props);
	this.state = {
	  username: '',
	  showBuildingInfo: false,
	  buildingSelected: '',
	  mainMenu: [],
	  buildings: [],
	  buildingInfo: '',
	  medialab: {
	  	faculty: 4,
	  	students: 10,
	  },
	  sloan: {
	  	faculty: 10,
	  	students: 20,
	  },
	}
}

	selectBuilding = (building, event) => {
		event.preventDefault();
		this.setState({buildingSelected: building});
		this.setState({showBuildingInfo: true});
		switch(building){
			case "medialab":
				this.setState({buildingInfo: this.state.medialab})
				break;
			case "sloan":
				this.setState({buildingInfo: this.state.sloan})
				break;
		}

		console.log("clicked", building);
	}

	closeInfo = (event) => {
		event.preventDefault();
		this.setState({showBuildingInfo: false});
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
			{this.state.showBuildingInfo && <Child buildingSelected={this.state.buildingSelected} buildingInfo={this.state.buildingInfo} closeInfo={this.closeInfo} />}
			</div>
		);
	}
}

class Child extends Component {
	render() {
		return(
			<div id="menubox" className='menu'>
				<h1>{this.props.buildingSelected}</h1>
				<p>faculty: {this.props.buildingInfo.faculty}</p>
				<p>students: {this.props.buildingInfo.students}</p>
				<button onClick={(event) => this.props.closeInfo(event)}> x </button>
			</div>
		);
	}
}


export default GameMap;