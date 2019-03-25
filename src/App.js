import React, { Component } from 'react';
import Stats from './scripts/Stats.js';
import Menu from './scripts/Menu.js';
import GameMap from './scripts/GameMap.js';
import GameLoop from './GameLoop.js';
import { connect } from 'react-redux';
import './css/main.css';

const mapStateToProps = (state) => {
  return {
    username: state.appReducer.username,
  };
}


class App extends Component {

constructor(props){
	super(props);
	this.state = {
		username: '',
		money: 10000,
		staff: {
		  custodial: '',
		  recycling: '',
		  supervisors: '',
		  managers: '',
		},
		population: {
		  students: '',
		  faculty: '',
		  labManagers: '',
		},
		messages: '',
		day: ''
	}
	this.getTime=this.getTime.bind(this);
}


 componentWillMount() {
    this.getTime(this.props);
  }

 componentWillUpdate() {
    this.getTime(this.props);
  }

  getTime(props){
  	// console.log("time is ", props.time);
  }


  render() {

    return (
      <div className="App">
		<Stats />
		<GameMap />
		<Menu />
			<div id="dialog" className="modal">
			  	<div id="modalcontent" className="modalcontent"></div>
			  	<div id="modalbutton" className="modalbutton">aaaa</div>
		</div>
      </div>
    );
  }
}

export default GameLoop(App);
