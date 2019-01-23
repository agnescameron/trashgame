import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../css/main.css'


class Stats extends Component{
  constructor(props) {
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
	this.renderStats = this.renderStats.bind(this);	
}


	renderStats= () => {
		this.setState( {money: 10000} );
		return this.state.buildings;
	}

	// componentDidMount() {
	// 	this.renderStats();
	// }

	render() {
		let stats = this.state.money;

		return(
			<div id="topbar">
				<div className="statcontainer">money: {stats}</div>
			</div>
		);
	}
}

export default Stats;