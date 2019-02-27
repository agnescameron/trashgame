import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Onboard from '../scripts/Onboard';
import Messages from '../scripts/Messages';
import { connect } from 'react-redux';
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


	calculateRecyclingQuality = () => {
		var recyclingQuality = 100-((this.state.faculty+this.state.students)-10*this.props.staff)-((this.state.faculty+this.state.students)-10*this.props.bins);
		this.setState({recyclingQuality: recyclingQuality});

		var recyclingCost;
		if (recyclingQuality<98){
			recyclingCost = 500;			
		}

		if (recyclingQuality<95){
			recyclingCost = 1000;			
		}
		
		if (recyclingQuality<90){
			recyclingCost = 2000;			
		}

		if (recyclingQuality<80){
			console.log('trash');
			recyclingCost = 2500;			
		}
		this.setState({recyclingCost: recyclingCost});
	}	

	timer = () => {
	   	this.setState({ currentCount: this.state.currentCount+1 });
	   	
		if(this.state.currentCount === 5 && this.props.staff < 1){
			this.props.dispatch({
		    	type: 'addMessage',
		    	message: {
		    		contents: `how about hiring some staff? go to the staff menu and click 'hire'`,
		    		read: false,
		    	}
			});
			this.setState({messageNumber: this.props.messages.length})
		}

	   	this.props.dispatch({
		    type: 'DAY',
		    day: this.state.currentCount,
		});


		//each week do
		if(this.state.currentCount%7 === 0){
			this.calculateRecyclingQuality();
			console.log('recycling cost is', this.state.recyclingCost);
		   	this.props.dispatch({
			    type: 'WEEK',
			    day: this.state.currentCount,
			    recyclingCost: this.state.recyclingCost,
			},
			{
		    	type: 'addMessage',
		    	message: {
		    		contents: `it's been a week! Your recycling quality is at \
		    		${this.state.recyclingQuality}%, costing $${this.state.recyclingCost}`,
		    		read: false,
				}
		    });			
		}

		//each month do
		if(this.state.currentCount%30 === 0){
		   	this.props.dispatch({
			    type: 'MONTH',
			    day: this.state.currentCount,
			});			
		}

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
		return(
			<div>
			<div id="topbar">
				<div className="statcontainer">money: {this.props.money}</div>
				<div className="statcontainer">day: {this.state.currentCount}</div>
				<div className="statcontainer" onClick={(event) => this.showMessages(event)}>messages: {this.state.messageNumber}</div>
				<div className="statcontainer" onClick={(event) => this.reset(event)}>reset</div>		
			</div>
			{this.props.onboarded===false && <Onboard />}
			{this.state.showMessages===true && <Messages messages={this.props.messages}/>}
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

export default connect(mapStateToProps)(Stats);