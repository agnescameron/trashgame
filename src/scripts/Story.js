import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {buildings} from './helpers/buildings.js'
import '../css/main.css'


//gets the stored username+uuid from the state
const mapStateToProps = (state) => {
  return{
  	runScript: state.appReducer.runScript,
  	onboarded: state.appReducer.onboarded,
  	buildingsVisible: state.appReducer.buildingsVisible,
  	recyclingQuality: state.appReducer.recyclingQuality,
  	recyclingCost: state.appReducer.recyclingCost,
  	recyclingRate: state.appReducer.recyclingRate,
  }
}

const getStaffSentiment = () => {
	return '50% happy';
}

const clickRecycling = () => {
	console.log('recycling');
}

const weekQuality = (quality) => {
	console.log('quality is', quality);

	var message;

	if(quality < 95)
		message = `which is pretty good. If you can get higher, our costs will decrease!`
	if(quality < 90)		
		message = `it's OK, but see if you can do something to reduce the contamination rate.\
		You might need to reach out to people, let them know what they can and can't recycle! If \
		the quality goes up, our costs go down, win-win!`
	if(quality < 80)
		message = `it's pretty poor: you've got to try and reduce the contamination rate! At this\
		purity level, everything we take over is basically landfill, sad but it's true. It's also costing\
		us a lot! You've got to educate people on what they can and can't recycle!`
	else
		message = `making the cost per weight really low: you're doing great!`

	return message;
}

class Story extends Component{
  constructor(props) {
    super(props);
	this.state = {
		username: '',
		runScript: true,
		scriptSelected: [],
		scripts: [
			{
				script: 'onboard',
				contents: [`Hello and welcome to 'let's play, waste at MIT'\
				You are the new head of waste management at the Media Lab.\
				We're glad to have you on the team!`,
				"You're in charge of solid waste, which covers trash, recycling and compost",
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
				`for now, you should focus on getting recycling up and running in the lab\
				to bring up the recycling menu, click the symbol here ${clickRecycling()}`,
				//show recycling
				"that's how the menu starts: as you get more buildings, more items will be added\
				as you acquire items and staff, the percentage of recycling will increase\
				but be careful not to go over budget!",
				"also, if you want to hire and train custodial staff, press here",
				"and to run outreach and education campaigns, press here",
				"that's all from me right now. for the help menu, press here\
				...I'll be in touch once you've made some progress",
				],
			},

			{
				script: 'week',
				contents: [`it's been a week! Your recycling rate is at \
		    		${this.props.recyclingRate}%, costing $${this.props.recyclingCost}`,
		    		`The quality of the last load was ${this.props.recyclingQuality}%: \
		    		${weekQuality(this.props.recyclingQuality)}`
				],
			},

			{
				script: 'addBuilding',
				contents: ["Things seem to be going pretty well here!",
				`you've got the recycling and waste collection under control, and your staff are ${getStaffSentiment()}`,
				"It's time we gave you some more responsibilities!",
				`We're asking you to take charge of ${buildings[this.props.buildingsVisible-1].building}. They have a budget\
				of ${buildings[this.props.buildingsVisible-1].budget}, with ${buildings[this.props.buildingsVisible-1].faculty} faculty,\
				with ${buildings[this.props.buildingsVisible-1].students} students, and with ${buildings[this.props.buildingsVisible-1].labs} \
				specialised labs.`,
				`We think you'll do great! Let me know if you need any help`,
				`thanks!`
				],
			},
			{
				script: 'rodents',
				contents: [`We realise that this is a difficult time right now -- you've only been at the job for ${this.props.week} weeks,\
				but we really need you to do something about the waste collection rate`,
				`The rodent population was under control before, but it's spiking again! The custodial staff -- not to mention\
				the faculty and the students \
				are going to be super unhappy if this continues!`,
				`Sort it out before the mice go out of control!`
				],
			},
		],
		progress: 0,
	}
	}

	nextPage = (event) => {
		event.preventDefault();
		if(this.state.scriptSelected[this.state.progress + 1]===undefined){
			this.props.dispatch({
			    type: 'ENDSCRIPT',
			})
			if(this.props.script === 'onboard'){
				this.props.dispatch({
			    type: 'ONBOARD',
			})
			}

		}
		else (this.setState({progress: this.state.progress+1}))
	}

	selectScript = (script) => {
		var scriptSelected;
		this.state.scripts.forEach(function(element) {
		if(element.script === script)
			scriptSelected = element.contents;		
		});
		
		//hacky: if reset without auto loading script
		if(scriptSelected === undefined){
			console.log('here', this.state.scripts[0].contents)
			this.setState({scriptSelected: this.state.scripts[0].contents})
		}
		else
			this.setState({scriptSelected: scriptSelected});
	}


	componentDidMount() {
		this.selectScript(this.props.script);
	}


	render() {
		let messageText = this.state.scriptSelected[this.state.progress];

		return(
			<div>
				<div className="menu"> {messageText}   
				<button onClick={(event) => this.nextPage(event)}> > </button>		
				</div>
			</div>
		);
	}
}
export default connect(mapStateToProps)(Story);
