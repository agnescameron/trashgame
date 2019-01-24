import React, { Component } from 'react';
import Clock from './Clock.js';
import Menu from './scripts/Menu.js';
import GameMap from './scripts/GameMap.js';
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
		buildings: {
		  ML: true,
		  arch: false,
		  sloan: false
		},
		menus: {
		  mainMenu: [],
		  recyclingMenu: [],
		  staffMenu: [],		  
		},
		money: 10000,
		staff: {
		  custodial: '',
		  recycling: '',
		  supervisors: '',
		  managers: '',
		},
		waste: {
		  recycling: '',
		  compost: '',
		  landfill: ''
		},
		population: {
		  students: '',
		  faculty: '',
		  labManagers: '',
		},
		messages: '',
		day: ''
	}

}

  render() {

    return (
      <div className="App">
		<div className="container">
			<div id="dialog" className="modal">
			  	<div id="modalcontent" className="modalcontent"></div>
			  	<div id="modalbutton" className="modalbutton">aaaa</div>
			</div>
		</div>
		<Clock />
		<GameMap />
		<Menu />
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
