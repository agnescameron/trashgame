import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {buildings} from './helpers/buildings.js'
import '../css/main.css'


const mapStateToProps = (state) => {
  return{
  	buildingsVisible: state.appReducer.buildingsVisible,
  }
}


class GameMap extends Component{
  constructor(props) {
    super(props);
	this.state = {
	  username: '',
	  showBuildingInfo: false,
	  buildingSelected: '',
	  mainMenu: [],
	  buildingInfo: '',
	  buildingsVisible: '',
	  buildings: buildings,
	}
}

	selectBuilding = (building, event) => {
		event.preventDefault();
		this.setState({buildings: buildings});
		this.setState({buildingSelected: building});
		this.setState({showBuildingInfo: true});

		//figure out which building was clicked and returned info
		var buildingInfo;
		buildings.forEach(function(element) {
		  if(element.building === building)
		  	buildingInfo=element;
		});
		this.setState({buildingInfo: buildingInfo});
	}

	closeInfo = (event) => {
		event.preventDefault();
		this.setState({showBuildingInfo: false});
	}


	componentDidMount() {

	}


	componentDidUpdate(prevProps) {
		if (this.props.buildingsVisible !== prevProps.buildingsVisible) {
	  		console.log('change');
	    	this.componentDidMount();
	  	} 
	}


	render() {
		//super hacky, gets buildings visible from props
		var visible;
		if(this.props.buildingsVisible === undefined)
			visible = 1;
		else visible = this.props.buildingsVisible;
		var buildings = this.state.buildings.slice(0, visible);

		return(
			<div id="map">
			<div className="container">
			{buildings.map((d, i) => <div id={d.building} key={i} className="building" onClick={(event) => this.selectBuilding(d.building, event)}>
				{d.building}
				{(d.labs >= 1) ? <div className='lab'>lab</div> : ''}
				{(d.labs >= 2) ? <div className='lab'>lab</div> : ''}
				{(d.labs >= 3) ? <div className='lab'>lab</div> : ''}
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
				<div className="scriptText">
				<h1>{this.props.buildingSelected}</h1>
				<p>faculty: {this.props.buildingInfo.faculty}</p>
				<p>students: {this.props.buildingInfo.students}</p>
				<p>labs: {this.props.buildingInfo.labs}</p>
				<button onClick={(event) => this.props.closeInfo(event)}> x </button>
				</div>
			</div>
		);
	}
}


export default connect(mapStateToProps)(GameMap);