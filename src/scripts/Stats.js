import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Story from './Story';
// import Day from './Day';
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk' 
import Messages from '../scripts/Messages';
import { connect } from 'react-redux';
import {buildings} from './helpers/buildings.js'
import economics from './helpers/economics';
import '../css/main.css'

//gets the stored username+uuid from the state
const mapStateToProps = (state) => {
  return{
  	onboarded: state.appReducer.onboarded,
  	runScript: state.appReducer.runScript,
  	faculty: state.appReducer.faculty,
  	students: state.appReducer.students,
  	day: state.appReducer.day,
  	recyclingStaff: state.appReducer.recyclingStaff,
  	custodialStaff: state.appReducer.custodialStaff,
  	compost: state.appReducer.compost,
  	bins: state.appReducer.bins,
  	vans: state.appReducer.vans,
  	money: state.appReducer.money,
  	signs: state.appReducer.signs,
  	outreach: state.appReducer.outreach,
  	workshops: state.appReducer.workshops,
  	messages: state.appReducer.messages,
  	budget: state.appReducer.budget,
  	buildingsVisible: state.appReducer.buildingsVisible,
  	recyclingQuality: state.appReducer.recyclingQuality,
  	collectionRate: state.appReducer.collectionRate,
  	week: state.appReducer.week,
  	month: state.appReducer.month,
  }
}

class Stats extends Component{
  constructor(props) {
    super(props);
	this.state = {
		showMessages: '',
		showStats: '',
		messages: '',
		messageNumber:'',
		educationLevel: '',
		recyclingQuality: '',
		recyclingCost: '',
		totalWaste:'',
		totalCompost:'',
		collectionRate: '',
		wasteCost: '',
		recyclingRate: '',
		population:'',
		luck: '',
		rodentNotification: '',
		rodents: '',
		dayLength:'',
		timerId: '',
	}
}
	
	tick = () => {
		this.setState({currentCount: this.props.day});
		this.startTimer();
	}

	startTimer = () => {
		this.setState({timerId: setTimeout(() => this.tick(), 10000)})
		console.log("setting", this.state.timerId);
		this.props.dispatch({
			type: 'NEXTDAY',
		})
	}

	stopTimer = () => {
		console.log("stopping", this.state.timerId);
		clearTimeout(this.state.timerId);
	}

	addBuilding = () => {
		var newStudents = buildings[this.props.buildingsVisible].students;
		var newFaculty = buildings[this.props.buildingsVisible].faculty;
		console.log('new faculty, new students')

			this.props.dispatch({
		    	type: 'addBuilding',
		    	students: newStudents,
		    	faculty: newFaculty,
			});
			this.runScript('addBuilding');
	}

	//need to call after day changes
	eachDay = () => {
		var nextState = this.state;

		console.log('nextState messageNumber is', nextState.messageNumber);
		nextState.population = this.props.faculty+this.props.students;

		//first, calculate the education level
		var luck = economics.calculateLuck(this.state, this.props);
		nextState.luck = luck;

		//first, calculate the education level
		var educationLevel = economics.calculateEducationLevel(this.state, this.props);
		nextState.educationLevel = educationLevel;

		//then, calculate all the waste being generated
		var totalWaste = economics.calculateTotalWaste(this.state, this.props);
		nextState.totalWaste = totalWaste;

		//is all the waste collected? if not: rodents
		var collectionRate = economics.calculateCollectionRate(this.state, this.props);
		nextState.collectionRate = collectionRate;

		//how much is getting put in recycling
		var recyclingRate = economics.calculateRecyclingRate(this.state, this.props);
		nextState.recyclingRate = recyclingRate;

		//if compost: how much is composted?
		if(this.props.compost === true){
			var totalCompost = economics.calculateTotalCompost(this.state, this.props);
			var compostCost = economics.calculateCompostCost(this.state, this.props);
		}

		//is all the recycling collected? if not: run out of space
		var recyclingCollectionRate = economics.calculateRecyclingCollectionRate(this.state, this.props);
		if(recyclingCollectionRate !== 100){
			console.log('running out of space, recyclingcollectionRate is ', recyclingCollectionRate);
		}

		//take the recycling to Casella
		var recyclingQuality = economics.calculateRecyclingQuality(this.state, this.props);
		nextState.recyclingQuality = recyclingQuality;
		// console.log('quality is', recyclingQuality);

		//how much did it cost?
		var recyclingCost = economics.calculateRecyclingCost(this.state, this.props);
		nextState.recyclingCost = recyclingCost;

		//take away the (collected) recycling and compost: how much waste is left, how much did
		//it cost to dispose of
		var wasteCost = economics.calculateWasteCost(this.state, this.props);
		nextState.wasteCost = wasteCost;

		//are there rodents?
		var rodents;
		if(this.state.collectionRate !==100){
			rodents = economics.calculateRodents(this.state);
			console.log('rodents!', rodents);
			if(rodents>10 && this.state.rodentNotification !== true){
				this.runScript('rodents');
				this.state.rodentNotification = true;
			}				
		}
			else rodents = 0;
			this.setState({rodents: rodents})

		//take away the (collected) recycling and compost: how much waste is left, how much did
		//it cost to dispose of
		var staffHappiness = economics.calculateStaffHappiness(this.state, this.props);
		nextState.staffHappiness = staffHappiness;

		//set updated values
		this.state = nextState;

		this.props.dispatch({
		    type: 'DAY',
		 	recyclingQuality: recyclingQuality,
		 	recyclingCost: recyclingCost,
		 	recyclingRate: recyclingRate,
		 	collectionRate: collectionRate,
		 	staffHappiness: staffHappiness,
		 	wasteCost: wasteCost,
			});

	}


	eachWeek = () => {
		   	this.props.dispatch({
			    type: 'WEEK',
			});

		if(this.props.week === 1){
		 	this.runScript('week');
		}

		console.log('a week')
	}

	eachMonth = () => {
		//each month do
		var recyclingCost = economics.calculateRecyclingQuality(this.state, this.props);
		this.setState({recyclingCost: recyclingCost})
		   	this.props.dispatch(
		   	{
			    type: 'MONTH',
			    wages: this.props.recyclingStaff*200 + this.props.custodialStaff*100,
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
		if(this.props.day === 5 && this.props.custodialStaff < 1){
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

		if(this.props.day%21 === 0 && this.props.collectionRate > 98){
			this.addBuilding();
		}

		if(this.props.day%3 === 0 && this.props.recyclingQuality < 95){
			this.runScript('contaminant');
		}

	}

	runScript = (script) => {
		this.stopTimer();
		console.log('didstop?');
		this.setState({
			runScript: true,
			script: script})
		this.props.dispatch({
			type: 'RUNSCRIPT',
		})
	}


	reset = (event) => {
		event.preventDefault();
		this.setState({onboarded: false});
		this.setState({currentCount: 0});
		this.stopTimer();
		this.runScript('onboard');
		this.props.dispatch({
			type: 'PURGE'
		});
		this.props.dispatch({
			type: 'INITIALISE'
		});
	}

	showMessages = (event) => {
		event.preventDefault();
		this.setState(prevState => ({showMessages: !prevState.showMessages}));
	}

	showStats = (event) => {
		event.preventDefault();
		this.setState(prevState => ({showStats: !prevState.showStats}));
	}

	componentDidMount() {
		this.setState({currentCount: this.props.day});
	}

	componentDidUpdate(prevProps) {
	  // this is very hacky and there's probably a better way
	  //also this is why it keeps ticking even when you reset!!
	  //need to fix...
		if (this.props.onboarded !== prevProps.onboarded) {
	  		console.log('change');
	    	this.componentDidMount();
	  	}
	  	if (this.props.day !== prevProps.day){
	  		console.log('day');
	  		this.eachDay();
			this.check();
	  	}
	}

	render() {
		var population = this.props.faculty+this.props.students;
		var collectionBar = (Math.round(this.state.collectionRate)).toString().concat('%');
		var rateBar = (Math.round(this.state.recyclingRate*100)).toString().concat('%');
		var qualityBar = (Math.round(this.state.recyclingQuality)).toString().concat('%');

		return(
			<div>

			<div id="topbar">
				<div className="statcontainer" onClick={()=>this.startTimer()}>money: {this.props.money}</div>
				<div className="statcontainer" onClick={(event) => this.showStats(event)}>day: {this.props.day}</div>
				<div className="statcontainer" onClick={(event) => this.showMessages(event)}>messages: {this.state.messageNumber}</div>
				<div className="statcontainer" onClick={(event) => this.reset(event)}>reset</div>		
			</div>

			<div id="statbar">
				<div className="statcontainer" onClick={()=>this.stopTimer()}>recycling quality: {qualityBar}<div className="progressbar">
					<div className="progress" style={{width: qualityBar}}></div></div></div>
				<div className="statcontainer">recycling rate: {rateBar}<div className="progressbar">
					<div className="progress" style={{width: rateBar}}></div></div></div>
				<div className="statcontainer">collection rate: {collectionBar}<div className="progressbar">
					<div className="progress" style={{width: collectionBar}}></div></div></div>
			</div>

			{this.props.runScript===true && <Story script={this.state.script} buildings={this.props.buildingsVisible} startTimer={this.startTimer}/>}
			{this.state.showMessages===true && <Messages messages={this.props.messages} showMessages={this.showMessages}/>}				

			{this.state.showStats===true && <StatsView day={this.props.day} custodialStaff={this.props.custodialStaff} recyclingStaff={this.props.recyclingStaff} recyclingQuality={this.state.recyclingQuality} 
			recyclingCost={this.state.recyclingCost} budget={this.props.budget} population={population} buildingsVisible={this.props.buildingsVisible}/>}
			
			{/* {this.state.runDay===true && <Day startTimer={this.startTimer} stopTimer={this.stopTimer} />} */}
			</div>
		);
	}
}


class StatsView extends Component {
	
	render() {
		return(
			<div className="statsbox">
				<div className="row">
					<div className="column">
					recycling staff: {this.props.recyclingStaff}<br/><br/>
					custodial staff: {this.props.custodialStaff}<br/><br/>
					population: {this.props.population}<br/><br/>
					</div>
					<div className="column">
					buildings: {this.props.buildingsVisible} <br/><br/>
					recycling cost: {this.props.recyclingCost}<br/><br/>
					recycling quality: {this.props.recyclingQuality}<br/><br/>
					</div>
				</div>
				{this.props.currentCount}
			</div>
		);
	}
}

export default connect(mapStateToProps)(Stats);