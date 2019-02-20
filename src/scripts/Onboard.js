import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import '../css/main.css'


//gets the stored username+uuid from the state
const mapStateToProps = (state) => {
  console.log(state.appReducer.onboarded);
}


class Onboard extends Component{
  constructor(props) {
    super(props);
	this.state = {
		username: '',
		onboarded: false,
		onboard: ["Hello and welcome to 'let's play, waste at MIT'\
		You are the new head of waste management at the Media Lab.\
		We're glad to have you on the team!",
		"Right now, the biggest challenge that the lab is facing is landfill: 100% of our waste gets thrown away, and that's a problem!\
		it can be hard to get people to listen...\
		but we're sure you'll be fine!",
		"the lab is pretty new, and is set to grow a lot in the coming months\
		...so you'll need to hire new staff to deal with the extra waste\
		Also: if you do a good job here, we'll ask you to expand to more buildings on campus",
		//show campus
		"this is the whole campus:\
		right now, the only building you have to worry about is this one:\
		the only people in the building are 1 faculty and 3 students\
		they've not got a lot of funding yet, so won't be ordering a lot of materials, or producing much waste",
		"for now, you should focus on getting recycling up and running in the lab\
		to bring up the recycling menu, click the symbol here",
		//show recycling
		"that's how the menu starts: as you get more buildings, more items will be added\
		as you acquire items and staff, the percentage of recycling will increase\
		but be careful not to go over budget!",
		"also, if you want to hire and train custodial staff, press here",
		"and to run outreach and education campaigns, press here",
		"that's all from me right now. for the help menu, press here\
		...I'll be in touch once you've made some progress",
		],
		progress: 0,
	}
	this.runOnboard = this.runOnboard.bind(this);	
	}

	runOnboard = async (ms) => {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	nextPage = (event) => {
		event.preventDefault();
		if(this.state.onboard[this.state.progress + 1]===undefined){
			this.setState({onboarded: true})
			this.props.dispatch({
			    type: 'ONBOARD',
			})			
		}
		else (this.setState({progress: this.state.progress+1}))
		console.log('next page');
	}

	async componentDidMount() {
		// await this.runOnboard(10000).then(
		// 	(response) => {
		// 		console.log('onboarded is', this.state.onboarded);
		// 		this.setState({onboarded: true})
		// 	    this.props.dispatch({
		// 	        type: 'ONBOARD',
		// 	    })
		// 	});
	}

	componentWillUnmount() {
	   clearInterval(this.state.day);
	}

	render() {
	let messageText = this.state.onboard[this.state.progress];
		return(
			<div>
				<div className="menu"> {messageText}   
				<button onClick={(event) => this.nextPage(event)}> > </button>		
				</div>
			</div>
		);
	}
}
export default connect(mapStateToProps)(Onboard);
