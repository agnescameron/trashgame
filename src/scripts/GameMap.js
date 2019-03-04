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
	  buildings: [
		  {
		  	building: 'medialab',
		  	visible: true,
		  	faculty: 1,
		  	students: 3,
		  },
		  {
		  	building: 'sloan',
		  	visible: false,
		  	faculty: 10,
		  	students: 20,
		  },
		  {
		  	building: 'architecture',
		  	visible: false,
		  	faculty: 10,
		  	students: 20,
		  },
	  ],
	  buildingInfo: '',
	}
}

	selectBuilding = (building, event) => {
		event.preventDefault();
		this.setState({buildingSelected: building});
		this.setState({showBuildingInfo: true});

		//figure out which building was clicked and returned info
		var buildingInfo;
		this.state.buildings.forEach(function(element) {
		  if(element.building === building)
		  	buildingInfo=element;
		});
		this.setState({buildingInfo: buildingInfo});
	}

	closeInfo = (event) => {
		event.preventDefault();
		this.setState({showBuildingInfo: false});
	}

	render() {
		var buildings = [];
		this.state.buildings.forEach(function(element) {
		  if(element.visible === true)
		  	buildings.push(element);
		});

		return(
			<div id="map">
			<div className="container">
			{buildings.map((d, i) => <div id={d.building} key={i} className="building" onClick={(event) => this.selectBuilding(d.building, event)}>
				{d.building}
			</div>)}
			</div>
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