import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Story from '../scripts/Story';
import Messages from '../scripts/Messages';
import { connect } from 'react-redux';
import helpers from './helpers/helpers';
import '../css/main.css'


//gets the stored username+uuid from the state
const mapStateToProps = (state) => {
  return{
  	onboarded: state.appReducer.onboarded,
  	runScript: state.appReducer.runScript,
  	faculty: state.appReducer.faculty,
  	students: state.appReducer.students,
  	day: state.appReducer.day,
  	staff: state.appReducer.staff,
  	bins: state.appReducer.bins,
  	money: state.appReducer.money,
  	messages: state.appReducer.messages,
  	budget: state.appReducer.budget,
  	recyclingQuality: state.appReducer.recyclingQuality,
  	collectionRate: state.appReducer.collectionRate,
  	week: state.appReducer.week,
  }
}

class Stats extends Component{
  constructor(props) {
    super(props);
	this.state = {
		showMessages: '',
		showStats: '',
		messages: '',
		faculty: 5,
		students: 20,
		messageNumber:'',
		recyclingQuality: 0,
		recyclingCost: '',
		collectionRate: 0,
		wasteCost: '',
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

			var collectionRate = helpers.calculateCollectionRate(this.state, this.props);
			this.setState({collectionRate: collectionRate});

			var wasteCost = helpers.calculateWasteCost(this.state, this.props);
			this.setState({wasteCost: wasteCost});

		   	this.props.dispatch({
			    type: 'WEEK',
			 	recyclingQuality: recyclingQuality,
			 	recyclingCost: recyclingCost,
			 	collectionRate: collectionRate,
			 	wasteCost: wasteCost,
			});

		if(this.props.week === 1){
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
		if(this.props.day === 5 && this.props.staff < 1){
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

		if(this.props.day === 10){			
			this.runScript('addBuilding');
			this.props.dispatch({
		    	type: 'addBuilding',
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


	runScript = (script) => {
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
		clearInterval(this.state.day);
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
		var population = this.props.faculty+this.props.students;
		var collectionBar = this.state.collectionRate.toString().concat('%');
		var qualityBar = this.state.recyclingQuality.toString().concat('%');

		// console.log('staff is ', this.props.staff);

		return(
			<div>

			<div id="topbar">
				<div className="statcontainer">money: {this.props.money}</div>
				<div className="statcontainer" onClick={(event) => this.showStats(event)}>day: {this.state.currentCount}</div>
				<div className="statcontainer" onClick={(event) => this.showMessages(event)}>messages: {this.state.messageNumber}</div>
				<div className="statcontainer" onClick={(event) => this.reset(event)}>reset</div>		
			</div>

			<div id="statbar">
				<div className="statcontainer">recycling quality: <div className="progressbar">
					<div className="progress" style={{width: qualityBar}}></div></div></div>
				<div className="statcontainer">collection rate: <div className="progressbar">
					<div className="progress" style={{width: collectionBar}}></div></div></div>
			</div>

			{this.props.runScript===true && <Story script={this.state.script} />}
			{this.state.showMessages===true && <Messages messages={this.props.messages} showMessages={this.showMessages}/>}			
			{this.state.showStats===true && <StatsView day={this.state.currentCount} staff={this.props.staff} recyclingQuality={this.state.recyclingQuality} 
			budget={this.props.budget} population={population} buildingsVisible={this.props.buildingsVisible}/>}
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
					recycling staff: {this.props.staff}<br/><br/>
					custodial staff: {this.props.staff}<br/><br/>
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