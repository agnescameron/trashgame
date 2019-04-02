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
  	leftoverWasteHistory: state.appReducer.leftoverWasteHistory,
  	recyclingRateHistory: state.appReducer.recyclingRateHistory,
   	recyclingQualityHistory: state.appReducer.recyclingQualityHistory, 	
   	rodents: state.appReducer.rodents,
   	trashbins: state.appReducer.trashbins,
   	staffHappiness: state.appReducer.staffHappiness,
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
		compostCost: '',
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
		leftoverWaste: '',
		totalLandfill: '',
		totalWaste: '',
		compostRate: '',
	}
}

	rollDice = (prob) => {
		var rand = Math.random();

		if(rand < prob){
			return true;
		}

		else{
			return false;
		}
	}
	
	tick = () => {
		this.setState({currentCount: this.props.day});
		this.startTimer();
	}

	startTimer = () => {
		this.setState({timerId: setTimeout(() => this.tick(), 5000)})
		this.props.dispatch({
			type: 'NEXTDAY',
		})
	}

	stopTimer = () => {
		clearTimeout(this.state.timerId);
	}

	nextLevel = () => {
		var nextLevel = (this.props.level+1).toString();	

		if(nextLevel <= 5){
			this.runScript(nextLevel);		
			this.props.dispatch({
				type: 'NEXTLEVEL',
			})
		}
	}

	addBuilding = () => {
		var newStudents = buildings[this.props.buildingsVisible].students;
		var newFaculty = buildings[this.props.buildingsVisible].faculty;

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

		nextState.luck = economics.calculateLuck(nextState, this.props);

		//level 1: waste collection: always calculated
		nextState.totalWaste = economics.calculateTotalWaste(nextState, this.props);

		nextState.collectionRate = economics.calculateCollectionRate(nextState, this.props);

		nextState.leftoverWaste = ((100 - nextState.collectionRate)/100)*nextState.totalWaste;

		if(this.props.day>=4){
			nextState.rodents = economics.calculateRodents(nextState, this.props);
		}
		else 
			nextState.rodents = 0;

		nextState.staffHappiness = economics.calculateStaffHappiness(nextState, this.props);

		//level 2: recycling rate
		if(this.props.level >=1){
			//how much is getting put in recycling
			nextState.recyclingRate = economics.calculateRecyclingRate(nextState, this.props);

			//how much did it cost?
			nextState.recyclingCost = economics.calculateRecyclingCost(nextState, this.props);

			//is all the recycling collected? if not: run out of space
			nextState.recyclingCollectionRate = economics.calculateRecyclingCollectionRate(nextState, this.props);
			if(nextState.recyclingCollectionRate !== 100){
			}

			this.props.dispatch({
				type: 'DAYL1',
				recyclingRate: nextState.recyclingRate,
			});			
		}

		//level 3: recycling quality
		if(this.props.level >=2){

			nextState.educationLevel = economics.calculateEducationLevel(nextState, this.props);

			nextState.recyclingQuality = economics.calculateRecyclingQuality(nextState, this.props);

			this.props.dispatch({
				type: 'DAYL2',
				recyclingQuality: nextState.recyclingQuality,
				recyclingCost: nextState.recyclingCost,
				educationLevel: nextState.educationLevel,
			});	
		}

		//level 4: speciality streams
		if(this.props.level >=3){
			nextState.compostRate = economics.calculateCompostRate(nextState, this.props);

			if(this.props.compost === true){
				nextState.totalCompost = economics.calculateTotalCompost(nextState, this.props);
				nextState.compostCost = economics.calculateCompostCost(nextState, this.props);
				console.log('compost cost is ', nextState.compostCost)
			}

			this.props.dispatch({
				type: 'DAYL3',
			});	
		}

		//calculate the amount of landfill waste
		nextState.totalLandfill = Math.round(economics.calculateTotalLandfill(nextState, this.props));

		//finally, calculate the cost
		nextState.wasteCost = Math.round(economics.calculateWasteCost(nextState, this.props));
		
		//set updated values
		this.state = nextState;
	
		this.props.dispatch({
		    type: 'DAY',
		 	collectionRate: nextState.collectionRate,
		 	leftoverWaste: nextState.leftoverWaste,
		 	staffHappiness: nextState.staffHappiness,
		 	wasteCost: nextState.wasteCost,
		 	rodents: nextState.rodents,
		 	staffHappiness: nextState.staffHappiness,
		 	totalLandfill: nextState.totalLandfill,
		 	totalWaste: nextState.totalWaste,
			});
	}


	eachWeek = () => {

		var weeklyCosts = economics.calculateWeeklyCosts(this.state, this.props);
		console.log('costs for this month were', weeklyCosts);

	   	this.props.dispatch({
		    type: 'WEEK',
		    costs: weeklyCosts,
		});

		if(this.props.week === 0){
		 	this.runScript('week');
		 	this.props.dispatch({
		 		type: 'population'
		 	});
		}
	}

	eachMonth = () => {

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

		if(this.props.day%14 === 0 && this.props.collectionRate > 98){
			this.addBuilding();
		}


		if(this.props.day%17 === 0){
			this.nextLevel();
		}

		if(this.props.rodents/(this.props.faculty+this.props.students) > 10 && this.state.rodentNotification !== true){
			this.runScript('rodents');
			this.setState({rodentNotification: true});
		}

		if(this.props.rodents/(this.props.faculty+this.props.students) > 10 && this.state.day%16===0){
			this.runScript('studentRodents');
		}

		//check for recycling rate
		if(this.props.level >= 1){
			if(this.props.day%12 === 0 && this.props.recyclingRate > 30){
				this.runScript('moreBins');
				this.props.dispatch({
					type: 'moreBins',
				})
			}
		}

		//strike?
		if(this.props.staffHappiness < 50){
			if(this.rollDice(0.3)) {
				this.runScript('strike');
				this.props.dispatch({
					type: 'strike',

				})
			}
		}

		//recycling quality/education related events
		if(this.props.level >= 2){
			//contaminant
			if(this.props.recyclingQuality < 95){
				if(this.rollDice(0.08)) this.runScript('contaminant');
			}

			//recycling truck rejected
			if(this.props.recyclingQuality < 95){
				if(this.rollDice(0.03)){
					this.runScript('truckRejected');
					this.props.dispatch({
						type: 'MONEY',
						money: -1000,
					})
				}
			}

			if(this.props.day%19 === 0 && this.props.recyclingQuality > 95){
				this.runScript('policyChangeLabGlass');
				this.props.dispatch({
					type: 'policyChange'
				})
			}

			if(this.props.day%15 === 0 && this.props.educationLevel < 50){
				this.runScript('binsFull');
			}

			if(this.props.day%25 === 0 && this.props.recyclingQuality < 80){
				this.runScript('contaminationAtPlant');
			}


		}

		//speciality stream events
		if(this.props.level >= 3){

			if(this.props.day%13 === 0 && this.props.recyclingQuality > 95){
				this.runScript('conference');
				this.props.dispatch({
					type: 'conference'
				})
			}

			if(this.props.day%18 === 0 && this.props.educationLevel > 70){
				this.runScript('changeInEducation');
			}

		}

		if(this.props.day%7 === 0){
			this.eachWeek();
		}

		if(this.props.day%30 === 0){
			this.eachMonth();
		}

		//add Losing event here!!
		if(this.props.day%120 === 0){
			this.runScript('scoring');
		}
	}

	runScript = (script) => {
		this.stopTimer();
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
	    	this.componentDidMount();
	  	}
	  	if (this.props.day !== prevProps.day){
			if(this.props.day !== 0){
				this.eachDay();
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
		var rodentWarn = this.props.rodents/population;

		return(
			<div>

			<div id="topbar">
				<div className="statcontainer" onClick={()=>this.startTimer()}>money: {this.props.money}</div>
				<div className="statcontainer" onClick={(event) => this.showStats(event)}>day: {this.props.day}</div>
				<div className="statcontainer" onClick={(event) => this.reset(event)}>reset</div>		
			</div>

			<div id="statbar">
				{level>=2 && <div className="statcontainer" onClick={()=>this.stopTimer()}>recycling quality: {qualityBar}<div className="progressbar">
					<div className="progress" style={{width: qualityBar}}></div></div>
						<div id="chartview"><ChartView history={this.props.recyclingQualityHistory} day={this.props.day} label='recycling quality:' /></div>
					</div>}
				{level >=1 && <div className="statcontainer">recycling rate: {rateBar}<div className="progressbar">
					<div className="progress" style={{width: rateBar}}></div></div>
						<div id="chartview"><ChartView history={this.props.recyclingRateHistory} day={this.props.day} label='recycling rate:'/></div>
					</div>}
				<div className="statcontainer" onClick={(event) => this.showChart(event)}>collection rate: {collectionBar}<div className="progressbar">
					<div className="progress" style={{width: collectionBar}}></div></div>
						<div id="chartview"><ChartView history={this.props.collectionRateHistory} day={this.props.day} label='collection rate:' /></div>
					</div>
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

class ChartView extends Component {
	render() {
	var days = [];
	for(var i=0; i<=this.props.day; i++){
		days.push(i);
	}
	var data= {
			labels: days,
	        datasets: [{
		        backgroundColor: 'rgb(255, 99, 132)',
		        borderColor: 'rgb(255, 99, 132)',
		        data: this.props.history,
		        fill: false,
		        pointRadius: 0,	
		    }]
	    }

	var options={
		yAxisID: this.props.label + '%',
	    legend: {
            display: false
       	},
	    elements: {
	        line: {
	            tension: 0.2
	        }
	    },
	    scales: {
	        xAxes: [{
	            gridLines: {
	                display:false
	            }
	        }],
	        yAxes: [{
	            gridLines: {
	                display:false
	            }   
	        }]
	    }       	
	}
		return(
		<div className="statsbox">
			<div className="menutitle">{this.props.label}</div>
			<div className="chartcontainer">
				<Line data={data} options={options}/>
			</div>
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