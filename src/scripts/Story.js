import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {characters} from './helpers/characters.js'
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
  	staffHappiness: state.appReducer.staffHappiness,
  	recyclingRate: state.appReducer.recyclingRate,
  	week: state.appReducer.week,
  	month: state.appReducer.month,
  	onboarded: state.appReducer.onboarded,
  	day: state.appReducer.day,
  }
}

const clickRecycling = () => {
	console.log('recycling');
}

const weekQuality = (quality) => {
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
		scriptSender: '',
		scripts: [
			{
				sender: characters.management,
				script: 'default',
				contents: [`welcome back!`]
			},

			{
				sender: characters.management,
				script: 'onboard',
				contents: [`Hello and welcome to 'let's play, waste at MIT'\
				You are the new head of waste management at the Media Lab.\
				We're glad to have you on the team!`,
				"You're in charge of solid waste, which currently just covers trash",
				`Eventually, we'll want you to start a recycling programme, and maybe even\
				some speciality streams.`,
				"The lab is pretty new, and is set to grow a lot in the coming months\
				...so you'll need to hire new staff to deal with the extra waste\
				Also: if you do a good job here, we'll ask you to expand to more buildings on campus",
				"the map in the centre represents the whole campus:\
				right now, the only building you have to worry about is the Media Lab\
				the only people in the building are 1 faculty and 3 students\
				they've not got a lot of funding yet, so won't be ordering a lot of materials, \
				or producing much waste",
				`You'll need to start by hiring some custodians\
				 -- without them, you won't be able to collect any waste at all!`,
				 `Hire and train custodial staff in the 'custodial' menu at the bottom.\
				 After you've got collection under control, we can talk about recycling!`,
				"that's all from me right now.\
				...I'll be in touch once you've made some progress",
				],
			},

			{
				sender: characters.management,
				script: 'e-waste',
				contents: [`a number of students have been asking about the possibilities\
				for disposing of e-waste: a lot of it's ending up in the trash, and that's a bad thing!`,
				`if you can fund an e-waste programme for campus, `
				],
			},

			{
				sender: characters.management,
				script: 'week',
				contents: [`it's been a week! Your recycling rate is at \
		    		${Math.round(this.props.recyclingRate)}%, costing $${this.props.recyclingCost}`,
		    		`The quality of the last load was ${Math.round(this.props.recyclingQuality)}%: \
		    		${weekQuality(this.props.recyclingQuality)}`
				],
			},
			
			//events

			{
				sender: characters.recycling,
				script: 'truckRejected',
				contents: [`Our truck just got turned back at the recycling plant! They said that\
				the contamination level in the trash was too high. We got fined like $1000! Train the custodians\
				to spot trash in the recycling so it doesn't happen again!`
				],
			},

			{
				sender: characters.recycling,
				script: 'binsFull',
				contents: [`People keep dumping random trash in the recycling bins!\
				It's not our job to clean them, but the custodians don't either. You\
				need to tell people that those bins aren't just general! `
				],
			},

			{
				sender: characters.custodial,
				script: 'contaminant',
				contents: [`we keep finding <div class='tooltip'>contaminants in the recycling!\
				<span class="tooltiptext">recycling contamintation is a big problem at MIT!</span> </div> \
				You need to remind people that ${this.randomContaminant()} can't be recycled! 
				<div class='boxpic'><img src='/css/img/${this.randomContaminant().replace(/\s/g, '')}.jpg'/></div>`
				],
			},

			{
				sender: characters.custodial,
				script: 'conference',
				contents: [`There's been a big conference going on this week, and the waste quality is/
				taking a real hit! The caterers don't know what to do with the food waste, so it's all/
				going into the trash, and attracting a bunch of rodents`,
				`this also means that our recycling rate and quality have taken a hit: this is going/
				to be a difficult month! Make sure you keep the collection rate on track, or the rodent/
				problem will only get worse!`
				],
			},

			{
				sender: characters.management,
				script: 'policyChangeLabGlass',
				contents: [`There's been a recent policy change from China, and we're having to comply/
				Lab glass can no longer be recycled: we'll need tell people about this, or our recycling/
				will be contaminated!`],

			},

			{
				sender: characters.management,
				script: 'addBuilding',
				contents: ["Things seem to be going pretty well here!",
				`you've got the recycling and waste collection under control, and your staff are ${this.props.staffHappiness}% happy`,
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
				sender: characters.students,
				script: 'studentRodents',
				contents: [`We keep finding rodents in the office! It's becoming a real problem. \
				You have to sort this out!`
				],
			},

			{
				sender: characters.students,
				script: 'changeInEducation',
				contents: [`How come we can't recycle lab glass anymore? We've always been able to.`
				],
			},

			{
				sender: characters.faculty,
				script: 'moreBins',
				contents: [`We need more bins in our part of the building, we use a lot of \
				items for research! Please can you get us some by the end of the week. Thanks!`
				],
			},

			{
				sender: characters.management,
				script: 'rodents',
				contents: [`We realise that this is a difficult time right now ,\
				but we really need you to do something about the waste collection rate`,
				`The rodent population was under control before, but it's spiking again! The custodial staff -- not to mention\
				the faculty and the students \
				are going to be super unhappy if this continues!`,
				`Sort it out before the mice go out of control!`
				],
			},

			{
				sender: characters.management,
				script: '1',
				contents: [`good job getting the garbage collection up and running!\
				Now, it's time to get onto making some real changes round here`,
				`The reason we hired you was to improve our recycling programme, and\
				to help the campus achieve 'zero waste' status`,
				`The first step of that is getting the recycling rate up: this is the total\
				proportion of landfill waste that is diverted to recycling. This will change\
				according to the amount of bins you have, and recycling staff able to collect\
				recyclables.`,
				`That said, you can also only recycle so much before you're trying to recycle\
				trash: the recycling rate depends a lot on what people are buying, too.`
				],
			},
			{
				sender: characters.management,
				script: '2',
				contents: [`your recycling rate is getting there, but we need to talk about something else:\
				quality!`,
				`An issue common in recycling is that of contamination: if just 1 or 2 items that are meant \
				to go in the trash end up in the recycling, then it can spoil the whole load`,
				`depending on where the contamination is caught, this can mean that anything from a\
				single blue bin, a truck, or a container's load of recycling becomes garbage`,
				`And when that happens, you don't divert anything from landfill`,
				`There's a whole load of things people think are recyclable but aren't: coffee cups,\
				 plastic bags, plastic forks, styrofoam... in fact, most plastics! You need to reach\
				 out to people and let them know what they can and can't recycle`
				],
			},
			{
				sender: characters.management,
				script: '3',
				contents: [`a number of students have been asking about the possibilities\
				for disposing of food waste. Currently, it's all just being put in the trash`,
				`If you could arrange some kind of composting programme, that would be great. You'll\
				need to find funding for it though, and also make sure people know how to use it!`
				],
			},
			{
				sender: characters.management,
				script: '4',
				contents: [`Lab waste is a biiiig problem for the institute right now!`
				],
			},
			{
				sender: characters.management,
				script: '5',
				contents: [`speciality: e-watste, clothing, etc`
				],
			},
		],
		progress: 0,
	}
	}

	randomContaminant = () => {
		var contaminants = ["food", "coffee cups", "plastic bags", "greasy paper", "clothing", "styrofoam"];
		var rand;
		if(this.props.day)
			rand = ((this.props.day+this.props.week+this.props.recyclingCost)%contaminants.length);
		else
			rand =0; 
		var contaminant = contaminants[rand];
		console.log('contaminant is ', contaminant);
		return contaminant;
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
		this.props.startTimer();
		}
		else (this.setState({progress: this.state.progress+1}))
	}

	selectScript = (script) => {
		var scriptSelected;
		var scriptSender;
		console.log('script is', script);
		this.state.scripts.forEach(function(element) {
			if(element.script === script){
				scriptSender = element.sender;
				scriptSelected = element.contents;
			}		
		});
		console.log('selected', scriptSelected);
		if(scriptSelected === undefined){
			console.log('here', this.state.scripts[0].contents)
			this.setState({scriptSelected: this.state.scripts[0].contents});
			this.setState({scriptSender: characters.management});
		}
		else {
			this.setState({scriptSelected: scriptSelected});
			this.setState({scriptSender: scriptSender});
		}
	}

	messageText = () => {
		var messageText = this.state.scriptSelected[this.state.progress];
		return {__html: messageText}
	}

	componentDidMount() {
		this.selectScript(this.props.script);
	}


	render() {
		let contaminant = this.state.contaminant;

		return(
			<div>
				<div className="menu"> 
				<h1 className="menutitle">{this.state.scriptSender}</h1>
				<div className="scriptText"  dangerouslySetInnerHTML={this.messageText()} ></div>
				<button className="nextButton" onClick={(event) => this.nextPage(event)}> > </button>
				</div>
			</div>
		);
	}
}
export default connect(mapStateToProps)(Story);
