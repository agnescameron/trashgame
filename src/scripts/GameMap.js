import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {buildings} from './helpers/buildings.js';
import {characters} from './helpers/characters.js';
import '../css/main.css'
import '../css/agents.css'

const mapStateToProps = (state) => {
  return{
  	buildingsVisible: state.appReducer.buildingsVisible,
  	custodialStaff: state.appReducer.custodialStaff,  
  	recyclingStaff: state.appReducer.recyclingStaff, 
  	recyclingQuality: state.appReducer.recyclingQuality,
  	collectionRate: state.appReducer.collectionRate, 
  	students: state.appReducer.students,
  	faculty: state.appReducer.faculty,
  	level: state.appReducer.level,
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

	
	getThoughts = () => {
		//0 is low collection, 1 is low quality, 2 is normal
		if(this.props.level < 2){
			if(this.props.collectionRate < 85) return 0;
			else return 2;
		}
		else {
			if(this.props.recyclingQuality < 50 && this.props.collectionRate < 90){
				if((50-this.props.recyclingQuality)/50 < (90-this.props.collectionRate)/90) return 0;
				else return 1;
			}
			else if (this.props.recyclingQuality < 50) return 1;
			else if (this.props.collectionRate < 90) return 0;
			else return 2;
		}

	}


	selectBuilding = (building, event) => {
		event.preventDefault();
		// this.setState({buildings: buildings});
		// this.setState({buildingSelected: building});
		// this.setState({showBuildingInfo: true});

		// //figure out which building was clicked and returned info
		// var buildingInfo;
		// buildings.forEach(function(element) {
		//   if(element.building === building)
		//   	buildingInfo=element;
		// });
		// this.setState({buildingInfo: buildingInfo});
	}

	closeInfo = (event) => {
		event.preventDefault();
		this.setState({showBuildingInfo: false});
	}

	componentDidMount() {

	}

	componentDidUpdate(prevProps) {
		if (this.props.buildingsVisible !== prevProps.buildingsVisible) {
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
		var custodiansPerBuilding = Math.floor(this.props.custodialStaff/this.props.buildingsVisible);
		var custodiansPerCampus = this.props.custodialStaff%this.props.buildingsVisible;
		var extraPop = false;
		if(this.props.students > 3)
			extraPop = true;
		var thought = this.getThoughts();

		return(
			<div id="map">
			<div className="container">
			{buildings.map((d, i) => <div id={d.building} key={i} className="building" onClick={(event) => this.selectBuilding(d.building, event)}>
				{d.building}	
				<Repeat numTimes={d.labs}>
			      {(index) => <div key={index} className='lab'>lab</div>}
			    </Repeat>
			</div>)}
			</div>
			<div className="container2">
			{buildings.map((d, i) => <div id={d.building} key={i} className="buildingContainer">
				<Repeat numTimes={d.faculty}>
			      {(index) => <div key={index} style={{left: (Math.random()*(d.w - 60))+20, top: (Math.random()*(d.h - 60))+25,
			      	animationName:'agent'+(index%6).toString(), animationDuration: `${Math.random()*10 + 6}s`}} className="faculty">
			      	<span className="speech">{characters.faculty.list[index%5]} {characters.faculty.thoughts[index%5]}</span></div>}
			    </Repeat>
				<Repeat numTimes={d.students}>
			      {(index) => <div key={index} style={{left: (Math.random()*(d.w - 60))+20, top: (Math.random()*(d.h - 60))+25, 
			      	animationName:'agent'+(index%6).toString(), animationDuration: `${Math.random()*8 + 6}s`}} className="student">
			      	<span className="speech">{characters.students.list[index%5]} {characters.students.thoughts[thought][index%5]}</span></div>}
			    </Repeat>
			    {extraPop===true && <Repeat numTimes={2}>
			      {(index) => <div key={index} style={{left: (Math.random()*(d.w - 60))+20, top: (Math.random()*(d.h - 60))+25, 
			      	animationName:'agent'+(index%6).toString(), animationDuration: `${Math.random()*8 + 6}s`}} className="student">
			      	<span className="speech">{characters.students.list[index%5]} {characters.students.thoughts[thought][index%5]}</span></div>}
			    </Repeat>}
			   {extraPop===true && <Repeat numTimes={1}>
			      {(index) => <div key={index} style={{left: (Math.random()*(d.w - 60))+20, top: (Math.random()*(d.h - 60))+25, 
			      	animationName:'agent'+(index%6).toString(), animationDuration: `${Math.random()*8 + 6}s`}} className="faculty">
			      	<span className="speech">{characters.faculty.list[index%5]} {characters.faculty.thoughts[index%5]}</span></div>}
			    </Repeat>}
				<Repeat numTimes={custodiansPerBuilding}>
			      {(index) => <div key={index} style={{left: (Math.random()*(d.w - 60))+20, top: (Math.random()*(d.h - 60))+25, 
			      	animationName:'agent'+(index%6).toString(), animationDuration: `${Math.random()*8 + 6}s`}} className="custodian">
			      	<span className="speech">{characters.custodial.list[index%5]}{characters.custodial.thoughts[thought][index%5]}</span></div>}
			    </Repeat>
			</div>)}
			</div>
				<Repeat numTimes={custodiansPerCampus}>
			      {(index) => <div key={index} style={{left: (Math.random()*(960))+20, top: (Math.random()*(720))+25, 
			      	animationName:'agent'+(index%6).toString(), animationDuration: `${Math.random()*8 + 6}s`}} className="custodian">
			      	<span className="speech">{characters.custodial.list[index%5]}{characters.custodial.thoughts[thought][index%5]}</span></div>}
			    </Repeat>			
				<Repeat numTimes={this.props.recyclingStaff}>
			      {(index) => <div key={index} style={{left: (Math.random()*(960))+20, top: (Math.random()*(560))+20, 
			      	animationName:'agent'+(index%6).toString(), animationDuration: `${Math.random()*8 + 6}s`}} className="recycling">
			      	<span className="speech">{characters.recycling.list[index%5]}{characters.recycling.thoughts[thought][index%5]}</span></div>}
			    </Repeat>	
			{this.state.showBuildingInfo && <Child buildingSelected={this.state.buildingSelected} buildingInfo={this.state.buildingInfo} closeInfo={this.closeInfo} />}
			</div>
		);
	}
}

	class Repeat extends Component {
		render() {  let items = [];
	  for (let i = 0; i < this.props.numTimes; i++) {
	    items.push(this.props.children(i));
	  }
	  return <div>{items}</div>;
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