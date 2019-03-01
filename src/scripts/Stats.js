import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Onboard from '../scripts/Onboard';
import Messages from '../scripts/Messages';
import { connect } from 'react-redux';
import { rollDice } from './Events.js'
import helpers from './helpers/helpers'
import '../css/main.css'


//gets the stored username+uuid from the state
const mapStateToProps = (state) => {
  return{
  	onboarded: state.appReducer.onboarded,
  	day: state.appReducer.day,
  	staff: state.appReducer.staff,
  	bins: state.appReducer.bins,
  	money: state.appReducer.money,
  	messages: state.appReducer.messages,
  }
}

class Stats extends Component{
  constructor(props) {
    super(props);
	this.state = {
		showMessages: '',
		messages: '',
		faculty: 5,
		students: 20,
		messageNumber:'',
		recyclingQuality: '',
	}
}

	eachDay = () => {
	   	this.setState({ currentCount: this.state.currentCount+1 });

	   	this.props.dispatch({
		    type: 'DAY',
		    day: this.state.currentCount,
		});

	}


	eachWeek = () => {
			//take the recycling to Casella
			var recyclingQuality = helpers.calculateRecyclingQuality(this.state, this.props);
			this.setState({recyclingQuality: recyclingQuality});
			var recyclingCost = helpers.calculateRecyclingCost(this.state, this.props);
			this.setState({recyclingCost: recyclingCost});


			// var wasteCost = helpers.calculateWasteCost(this.state, this.props);
			// this.setState({wasteCost: wasteCost});


			console.log('recycling cost is', this.state.recyclingCost);
		   	this.props.dispatch({
			    type: 'WEEK',
			    recyclingCost: this.state.recyclingCost,
			    //wasteCost: this.state.wasteCost,
			});

		   	//this got too annoying
			this.props.dispatch({
		    	type: 'addMessage',
		    	message: {
		    		contents: `it's been a week! Your recycling quality is at \
		    		${this.state.recyclingQuality}%, costing $${this.state.recyclingCost}`,
		    		read: false,
		    		important: false,
		    		sender: 'management',
				}
		    });
	}


	eachMonth = () => {
		//each month do
		var recyclingCost = helpers.calculateRecyclingQuality(this.state, this.props);
		this.setState({recyclingCost: recyclingCost})
		   	this.props.dispatch(
		   	{
			    type: 'MONTH',
			    wages: this.props.staff*100,
			    budget: 10000,
			});
			this.props.dispatch({
		    	type: 'addMessage',
		    	message: {
		    		contents: `it's been a month! Your recycling quality is at \
		    		${this.state.recyclingQuality}%, costing $${this.state.recyclingCost}`,
		    		sender: 'management',
		    		read: false,
		    		important: false,
				}
		    });
	}


	check = () => {
		this.setState({messageNumber: this.props.messages.length});
		if(this.state.currentCount === 5 && this.props.staff < 1){
			this.props.dispatch({
		    	type: 'addMessage',
		    	message: {
		    		contents: `how about hiring some staff?\
		    		go to the staff menu and click 'hire'`,
		    		read: false,
		    		important: true,		    		
		    		sender: 'management',
		    	}
			});
		}		
	}

	timer = () => {
		this.eachDay();

		//each week do
		if(this.state.currentCount%7 === 0){
			this.eachWeek();			
		}

		//each week do
		if(this.state.currentCount%30 === 0){
			this.eachMonth();			
		}

		this.check();
		
	}

	reset = (event) => {
		event.preventDefault();
		this.setState({onboarded: false});
		this.setState({currentCount: 0});
		clearInterval(this.state.day);
		this.props.dispatch({
		    type: 'RESET',
		});
	}

	showMessages = (event) => {
		event.preventDefault();
		console.log('showMessages');
		this.setState(prevState => ({showMessages: !prevState.showMessages}));
	}

	componentDidMount() {
		this.setState({currentCount: this.props.day});
		if(this.props.onboarded === true){
			var dayLength = setInterval(this.timer, 15000);			
		}
		else{
			this.setState({currentCount: 0});
		}
		return dayLength;
	}

	componentDidUpdate(prevProps) {
	  // this is very hacky and there's probably a better way
	  //also this is why it keeps ticking even when you reset!!
	  //need to fix...
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
				<div className="statcontainer">money: {this.props.money}</div>
				<div className="statcontainer" onClick={(event) => rollDice(event)}>day: {this.state.currentCount}</div>
				<div className="statcontainer" onClick={(event) => this.showMessages(event)}>messages: {this.state.messageNumber}</div>
				<div className="statcontainer" onClick={(event) => this.reset(event)}>reset</div>		
			</div>
			{this.props.onboarded===false && <Onboard />}
			{this.state.showMessages===true && <Messages messages={this.props.messages} showMessages={this.showMessages}/>}			
			{this.state.showStats===true && <StatsView day={this.state.currentCount}/>}
			</div>
		);
	}
}


class StatsView extends Component {
	
	render() {
		return(
			<div id="menubox" className='menu'>
				{this.props.currentCount}
			</div>
		);
	}
}

export default connect(mapStateToProps)(Stats);