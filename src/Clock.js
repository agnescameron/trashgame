import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './css/main.css'


class Clock extends Component{
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
		currentCount: 0,
		week: 0,
		day: 0,
	}
	this.waitWeek = this.waitWeek.bind(this);	
	this.timer = this.timer.bind(this);
}


	waitDay = async() => {
		setTimeout(function() {
            this.setState({day: this.state.day+1});
        }.bind(this), 500);
	}

	waitWeek = async() => {
		setTimeout(function() {
            this.setState({week: this.state.week+1});
        }.bind(this), 5000);
	}

	waitMonth = async() => {
		setTimeout(function() {
            this.setState({month: this.state.month+1});
        }.bind(this), 50000);
	}

	timer = () => {
	   	this.setState({ currentCount: this.state.currentCount+1 });
	}

	componentDidMount() {
		var day = setInterval(this.timer, 5000);
		this.setState({day: day});
	}

	componentWillUnmount() {
	   clearInterval(this.state.day);
	}

	render() {
		return(
			<div id="topbar">
				<div className="statcontainer">money: {this.state.money}</div>
				<div className="statcontainer">day: {this.state.currentCount}</div>				
			</div>
		);
	}
}

class Child extends Component {
	
	render() {
		return(
			<div id="menubox" className='menu'>
				{this.props.currentCount}
			</div>
		);
	}
}

export default Clock;