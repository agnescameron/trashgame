import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Onboard from './scripts/Onboard';
import { connect } from 'react-redux';
import './css/main.css'


//gets the stored username+uuid from the state
const mapStateToProps = (state) => {
  return{
  	onboarded: state.appReducer.onboarded,
  	day: state.appReducer.day,
  }
}

class Clock extends Component{
  constructor(props) {
    super(props);
	this.state = {
		username: '',
		onboarded: false,
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
	   	this.props.dispatch({
		    type: 'NEXTDAY',
		    day: this.state.currentCount,
		});
	}

	reset = (event) => {
		this.setState({onboarded: false});
		this.setState({currentCount: 0});
		clearInterval(this.state.day);
		this.props.dispatch({
		    type: 'RESET',
		});
	}

	componentDidMount() {
		this.setState({currentCount: this.props.day});
		if(this.props.onboarded === true){
			var dayLength = setInterval(this.timer, 5000);			
		}
		else{
			this.setState({currentCount: 0});
		}
		return dayLength;
	}

	componentDidUpdate(prevProps) {
	  // this is very hacky and there's probably a better way
	  if (this.props.onboarded !== prevProps.onboarded) {
	  	console.log('change');
	    this.componentDidMount();
	  }
	}

	componentWillUnmount() {
	   clearInterval(this.state.day);
	}

	render() {
		return(
			<div>
			<div id="topbar">
				<div className="statcontainer">money: {this.state.money}</div>
				<div className="statcontainer">day: {this.state.currentCount}</div>
				<div className="statcontainer" onClick={(event) => this.reset(event)}>reset</div>		
			</div>
			{this.props.onboarded===false && <Onboard />}
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

export default connect(mapStateToProps)(Clock);