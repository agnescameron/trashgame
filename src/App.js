import React, { Component } from 'react';
import Menu from './scripts/Menu.js'
import GameMap from './scripts/GameMap.js'
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
        <header className="App-header">
        </header>
		<div className="container">
			<div id="dialog" className="modal">
			  	<div id="modalcontent" className="modalcontent"></div>
			  	<div id="modalbutton" className="modalbutton">aaaa</div>
			</div>
		</div>
		<div id="topbar"></div>
		<GameMap />
		<div id="footer">
		<Menu />
		</div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
