import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import '../css/main.css'


const mapStateToProps = (state) => {
console.log('buildings visible is ', state.appReducer.buildingsVisible)
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
	  buildings: [
          {
            building: 'medialab',
            faculty: 1,
            students: 3,
            labs: 0,
          },
          {
            building: 'sloan',
            faculty: 4,
            students: 14,
            labs: 0,
          },
          {
            building: 'architecture',
            faculty: 10,
            students: 20,
            labs: 0,
          },
          {
            building: 'CSAIL',
            faculty: 20,
            students: 30,
            labs: 0,
          },
          {
            building: 'broad',
            faculty: 10,
            students: 15,
            labs: 2,
          },
          {
            building: 'mcgovern',
            faculty: 8,
            students: 16,
            labs: 3,
          },
          {
            building: 'studentcenter',
            faculty: 0,
            students: 50,
            labs: 0,
          },                
          {
            building: 'physics',
            faculty: 15,
            students: 17,
            labs: 1,
          },  
        ],
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


export default connect(mapStateToProps)(GameMap);