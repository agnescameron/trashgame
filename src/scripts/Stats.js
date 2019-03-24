import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Story from './Story';
import {Line} from 'react-chartjs-2';
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
  	level: state.appReducer.level,
  	collectionRateHistory: state.appReducer.collectionRateHistory,
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
		showChart: '',
	}
}
	
	tick = () => {
		this.setState({currentCount: this.props.day});
		this.startTimer();
	}

	startTimer = () => {
		this.setState({timerId: setTimeout(() => this.tick(), 5000)})
		console.log("setting", this.state.timerId);
		this.props.dispatch({
			type: 'NEXTDAY',
		})
	}

	stopTimer = () => {
		console.log("stopping", this.state.timerId);
		clearTimeout(this.state.timerId);
	}

	nextLevel = () => {
		var nextLevel = (this.props.level+1).toString();	
		this.runScript(nextLevel);		
		console.log('next level', nextLevel)
		this.props.dispatch({
			type: 'NEXTLEVEL',
		})
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

		nextState.population = this.props.faculty+this.props.students;

		var luck = economics.calculateLuck(nextState, this.props);
		nextState.luck = luck;


		//level 1: waste collection: always calculated
		var totalWaste = economics.calculateTotalWaste(nextState, this.props);
		nextState.totalWaste = totalWaste;

		var collectionRate = economics.calculateCollectionRate(nextState, this.props);
		nextState.collectionRate = collectionRate;
		console.log('collection rate is', collectionRate)

		var rodents;
		if(nextState.collectionRate !==100){
			rodents = economics.calculateRodents(nextState);
			console.log('rodents!', rodents);
			if(rodents>10 && this.state.rodentNotification !== true){
				this.runScript('rodents');
				this.state.rodentNotification = true;
			}
		}
		else 
			rodents = 0;

		nextState.rodents = rodents;

		var staffHappiness = economics.calculateStaffHappiness(nextState, this.props);
		nextState.staffHappiness = staffHappiness;

		//level 2: recycling rate
		if(this.props.level >=1){
			console.log('calculating level 2')
			//how much is getting put in recycling
			var recyclingRate = economics.calculateRecyclingRate(nextState, this.props);
			nextState.recyclingRate = recyclingRate;

			//how much did it cost?
			var recyclingCost = economics.calculateRecyclingCost(nextState, this.props);
			nextState.recyclingCost = recyclingCost;

			//is all the recycling collected? if not: run out of space
			var recyclingCollectionRate = economics.calculateRecyclingCollectionRate(nextState, this.props);
			if(recyclingCollectionRate !== 100){
				console.log('running out of space, recyclingcollectionRate is ', recyclingCollectionRate);
			}
		}

		//level 3: recycling quality
		if(this.props.level >=2){
			console.log('calculating level 3')
			var recyclingQuality = economics.calculateRecyclingQuality(nextState, this.props);
			nextState.recyclingQuality = recyclingQuality;

			var educationLevel = economics.calculateEducationLevel(nextState, this.props);
			nextState.educationLevel = educationLevel;
		}

		//level 4: speciality streams
		if(this.props.level >=3){
			if(this.props.compost === true){
				var totalCompost = economics.calculateTotalCompost(nextState, this.props);
				var compostCost = economics.calculateCompostCost(nextState, this.props);
			}
		}

		//finally, calculate the cost
		var wasteCost = economics.calculateWasteCost(nextState, this.props);
		nextState.wasteCost = wasteCost;
		
		//set updated values
		this.state = nextState;
		

		this.props.dispatch({
		    type: 'DAY',
		 	recyclingQuality: nextState.recyclingQuality,
		 	recyclingCost: nextState.recyclingCost,
		 	recyclingRate: nextState.recyclingRate,
		 	collectionRate: nextState.collectionRate,
		 	staffHappiness: nextState.staffHappiness,
		 	wasteCost: nextState.wasteCost,
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

		var monthlyCosts = economics.calculateMonthlyCosts(this.state, this.props);
		console.log('costs for this month were', monthlyCosts);

		this.nextLevel();

	   	this.props.dispatch(
	   	{
		    type: 'MONTH',
		    wages: monthlyCosts,
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

		//check for recycling quality
		if(this.props.level >= 3){
			//contaminant
			if(this.props.day%13 === 0 && this.props.recyclingQuality < 95){
				this.runScript('contaminant');
			}

			//recycling truck rejected
			if(this.props.day%23 === 0 && this.props.recyclingQuality < 95){
				this.runScript('truckRejected');
				this.props.dispatch({
					type: 'MONEY',
					money: -1000,
				})
			}		
		}

		if(this.props.day%7 === 0){
			this.eachWeek();
		}

		if(this.props.day%30 === 0){
			this.eachMonth();
		}


		//add Losing event here!!
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

	showChart = (event) => {
		event.preventDefault();
		this.setState(prevState => ({showChart: !prevState.showChart}));
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
			if(this.props.day !== 0){
				this.check();
			}
	  	}
	}

	render() {
		var population = this.props.faculty+this.props.students;
		var collectionBar = (Math.round(this.state.collectionRate)).toString().concat('%');
		var rateBar = (Math.round(this.state.recyclingRate*100)).toString().concat('%');
		var qualityBar = (Math.round(this.state.recyclingQuality)).toString().concat('%');
		var level = this.props.level;

		console.log('collection rate history is', this.props.collectionRateHistory);

		return(
			<div>

			<div id="topbar">
				<div className="statcontainer" onClick={()=>this.startTimer()}>money: {this.props.money}</div>
				<div className="statcontainer" onClick={(event) => this.showStats(event)}>day: {this.props.day}</div>
				<div className="statcontainer" onClick={(event) => this.showMessages(event)}>messages: {this.state.messageNumber}</div>
				<div className="statcontainer" onClick={(event) => this.reset(event)}>reset</div>		
			</div>

			<div id="statbar">
				{level>=2 && <div className="statcontainer" onClick={()=>this.stopTimer()}>recycling quality: {qualityBar}<div className="progressbar">
					<div className="progress" style={{width: qualityBar}}></div></div></div>}
				{level >=1 && <div className="statcontainer">recycling rate: {rateBar}<div className="progressbar">
					<div className="progress" style={{width: rateBar}}></div></div></div>}
				<div className="statcontainer" onClick={(event) => this.showChart(event)}>collection rate: {collectionBar}<div className="progressbar">
					<div className="progress" style={{width: collectionBar}}></div></div></div>
			</div>

			{this.props.runScript===true && <Story script={this.state.script} buildings={this.props.buildingsVisible} startTimer={this.startTimer}/>}
			{this.state.showMessages===true && <Messages messages={this.props.messages} showMessages={this.showMessages}/>}				
			
			{this.state.showChart===true && <ChartView history={this.props.collectionRateHistory} day={this.props.day} />} 

			{this.state.showStats===true && <StatsView day={this.props.day} custodialStaff={this.props.custodialStaff} recyclingStaff={this.props.recyclingStaff} recyclingQuality={this.state.recyclingQuality} 
			recyclingCost={this.state.recyclingCost} budget={this.props.budget} population={population} buildingsVisible={this.props.buildingsVisible}/>}
			
			{/* {this.state.runDay===true && <Day startTimer={this.startTimer} stopTimer={this.stopTimer} />} */}
			</div>
		);
	}
}

class ChartView extends Component {
	render() {
	var days = [];
	for(var i=0; i<this.props.day; i++){
		days.push(i);
	}
	var data= {
			labels: days,
	        datasets: [{
	        label: "collection rate",
	        backgroundColor: 'rgb(255, 99, 132)',
	        borderColor: 'rgb(255, 99, 132)',
	        data: this.props.history,
	        }]
	    }

		return(
		<div className="statsbox">
			<Line data={data} />
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