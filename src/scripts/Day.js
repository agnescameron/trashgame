import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
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

class Day extends Component{
  constructor(props) {
    super(props);
	this.state = {
		messages: [],
	}
}

	//need to call after day changes
	eachDay = () => {
		this.setState({population: this.props.faculty+this.props.students});
		console.log('population is', this.state.population)

		//first, calculate the education level
		var luck = economics.calculateLuck(this.state, this.props);
		this.setState({luck: luck});
		// console.log('luck is', luck);

		//first, calculate the education level
		var educationLevel = economics.calculateEducationLevel(this.state, this.props);
		this.setState({educationLevel: educationLevel});
		// console.log('educationLevel is', educationLevel);

		//then, calculate all the waste being generated
		var totalWaste = economics.calculateTotalWaste(this.state, this.props);
		this.setState({totalWaste: totalWaste});
		// console.log('totalWaste is', totalWaste);

		//is all the waste collected? if not: rodents
		var collectionRate = economics.calculateCollectionRate(this.state, this.props);
		this.setState({collectionRate: collectionRate});
		// console.log('collectionRate is', collectionRate);

		//how much is getting put in recycling
		var recyclingRate = economics.calculateRecyclingRate(this.state, this.props);
		this.setState({recyclingRate: recyclingRate});
		// console.log('recyclingRate is', recyclingRate);

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
		this.setState({recyclingQuality: recyclingQuality});	
		// console.log('quality is', recyclingQuality);

		//how much did it cost?
		var recyclingCost = economics.calculateRecyclingCost(this.state, this.props);
		this.setState({recyclingCost: recyclingCost});
		// console.log('cost is', recyclingCost);

		//take away the (collected) recycling and compost: how much waste is left, how much did
		//it cost to dispose of
		var wasteCost = economics.calculateWasteCost(this.state, this.props);
		this.setState({wasteCost: wasteCost});
		// console.log('waste cost is', wasteCost);

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
			this.setState({staffHappiness: staffHappiness});
			// console.log('staff happiness is', staffHappiness);

			   	
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

	componentDidMount() {
	}

	render() {
		return(
			<div></div>
		);
	}
}

export default connect(mapStateToProps)(Day);