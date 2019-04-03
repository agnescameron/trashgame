import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {characters} from './helpers/characters.js'
import { connect } from 'react-redux';
import {buildings} from './helpers/buildings.js'
import {Redirect} from 'react-router'
import '../css/main.css'


//gets the stored username+uuid from the state
const mapStateToProps = (state) => {
  return{
  	runScript: state.appReducer.runScript,
  	buildingsVisible: state.appReducer.buildingsVisible,
  	recyclingQuality: state.appReducer.recyclingQuality,
  	recyclingCost: state.appReducer.recyclingCost,
  	staffHappiness: state.appReducer.staffHappiness,
  	collectionRate: state.appReducer.collectionRate,
  	custodialStaff: state.appReducer.custodialStaff,
  	recyclingRate: state.appReducer.recyclingRate,
  	week: state.appReducer.week,
  	month: state.appReducer.month,
  	onboarded: state.appReducer.onboarded,
  	day: state.appReducer.day,
  	money: state.appReducer.money,
  	totalLandfill: state.appReducer.totalLandfill,
  	totalWaste: state.appReducer.totalWaste,
  	isFired: state.appReducer.isFired,
  	endgame: state.appReducer.endgame,
  	staffHappiness: state.appReducer.staffHappiness,
  }
}

const clickRecycling = () => {
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



const weekCollection = (rate) => {
	var message;

	if(rate === 100)
		message = `All good so far!`
	if(rate < 100)		
		message = `Things seem OK, but you might need to hire some more custodial staff to\
	deal with the extra waste: this will only become more of an issue!`
	if(rate < 85)
		message = `This is going to turn into a huuuge problem if you can't sort it out!\
	Hire some more custodial staff!`

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
		isFired: false,
		endgame: false,
		scripts: [

			//general information

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
				"You're in charge of managing the Lab's solid waste stream, \
				which is currently all going to landfill",
				`Eventually, we'll want you to start a recycling programme, and maybe even\
				some speciality streams: but for now, you should just focus on making sure\
				that everything's getting collected`,
				"The lab is pretty new, and is set to grow a lot in the coming months\
				...so you'll need to hire new staff to deal with the extra waste.\
				Also: if you do a good job here, we'll ask you to expand to more buildings on campus",
				"The map in the centre represents the whole campus:\
				right now, the only building you have to worry about is the Media Lab.\
				The only people in the building are 10 faculty and 30 students --\
				they've not got a lot of funding yet, so won't be ordering a lot of materials, \
				or producing much waste",
				`You'll need to start by hiring some custodians\
				 -- without them, you won't be able to collect any waste at all!`,
				 `Be careful: if you don't hire enough custodial staff, waste can build up: this gets\
				 out of control fast! We don't want any more rodent problems...`,
				 `Why not hire someone right now? Click on the 'custodial' menu at the bottom, and click 'hire'.\
				 They should appear in the lab.\
				 After you've got collection under control, we can talk about recycling!`,
				"That's all from me right now.\
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
				contents: [`it's been a week! Your collection rate is at \
		    		${Math.round(this.props.collectionRate)}%, and you've hired ${this.props.custodialStaff}
		    		custodian.`,
		    		weekCollection(this.props.collectionRate),
		    		`There's a new research group joining the lab: 10 new students, and another 2 faculty`,
		    		`Good luck!`,
				],
			},

			{
				sender: characters.management,
				script: 'recyclingWeek',
				contents: [`the recycling program has been up and running for a week now. Your recycling rate is at \
		    		${Math.round(this.props.recyclingRate)}%, costing $${this.props.recyclingCost}`,
		    		`The quality of the last load was ${Math.round(this.props.recyclingQuality)}%: \
		    		${weekQuality(this.props.recyclingQuality)}`
				],
			},

			//character intros/development
			
			{
				sender: characters.custodial.name,
				script: 'hiredCustodian',
				contents: [`Hi there! I'm your new custodial worker.`
				],
			},
			{
				sender: characters.recycling.name,
				script: 'hiredRecycling',
				contents: [`Hi there! I'm your new recycling worker.`
				],
			},


			//events

			{
				sender: characters.custodial.name,
				script: 'strike',
				contents: [`We can't work under these conditions! You need to hire more staff,\
				if you want all these bins to be collected. And stop firing people without
				warning! We're calling a 1-day strike: no trash collected tonight! Sort it out!!`
				],
			},

			{
				sender: characters.processing,
				script: 'contaminationAtPlant',
				contents: [`Hi there, I'm calling from the processing plant. We've had a bunch of\
				contaminated loads from you guys recently, and it's putting a real strain on our staff -- \
				not to mention, you're racking up a bunch of fines. You've really got to sort this out!`,
				`Things like plastic bags are particularly bad: they clog up our machines and somebody\
				has to go in there by hand and fix them!`
				],
			},

			{
				sender: characters.recycling.name,
				script: 'truckRejected',
				contents: [`Our truck just got turned back at the recycling plant! They said that\
				the contamination level in the trash was too high. We got fined like $1000! Train the custodians\
				to spot trash in the recycling so it doesn't happen again!`
				],
			},

			{
				sender: characters.recycling.name,
				script: 'binsFull',
				contents: [`People keep dumping random trash in the recycling bins!\
				It's not our job to clean them, but the custodians don't either. You\
				need to tell people that those bins aren't just general! `
				],
			},

			{
				sender: characters.custodial.name,
				script: 'contaminant',
				contents: [`we keep finding <div class='tooltip'>contaminants in the recycling!\
				<span class="tooltiptext">recycling contamintation is a big problem at MIT!</span> </div> \
				You need to remind people that ${this.randomContaminant()} can't be recycled! 
				<div class='boxpic'><img src='/css/img/${this.randomContaminant().replace(/\s/g, '')}.jpg'/></div>`
				],
			},

			{
				sender: characters.custodial.name,
				script: 'conference',
				contents: [`There's been a big conference going on this week, and the waste quality is
				taking a real hit! The caterers don't know what to do with the food waste, so it's all
				going into the trash, and attracting a bunch of rodents`,
				`this also means that our recycling rate and quality have taken a hit: this is going
				to be a difficult month! Make sure you keep the collection rate on track, or the rodent
				problem will only get worse!`
				],
			},

			{
				sender: characters.management,
				script: 'policyChangeLabGlass',
				contents: [`There's been a recent policy change from China, and we're having to comply. 
				Lab glass can no longer be recycled: we'll need tell people about this, or our recycling
				will be contaminated!`],

			},

			{
				sender: characters.management,
				script: 'addBuilding',
				contents: ["Things seem to be going pretty well here!",
				`you've got the waste collection under control, and your staff are ${this.props.staffHappiness}% happy`,
				"It's time we gave you some more responsibilities!",
				`We're asking you to take charge of ${buildings[this.props.buildingsVisible-1].building}. They have a solid waste management budget\
				of $${buildings[this.props.buildingsVisible-1].budget} per month, with ${buildings[this.props.buildingsVisible-1].faculty*10} faculty,\
				with ${buildings[this.props.buildingsVisible-1].students*10} students, and with ${buildings[this.props.buildingsVisible-1].labs} \
				specialised labs.`,
				`We think you'll do great! Let me know if you need any help`,
				`thanks!`
				],
			},

			{
				sender: characters.students.name,
				script: 'studentRodents',
				contents: [`We keep finding rodents in the office! It's becoming a real problem.
				You have to sort this out!`
				],
			},

			{
				sender: characters.students.name,
				script: 'changeInEducation',
				contents: [`How come we can't recycle lab glass anymore? We've always been able to.`
				],
			},

			{
				sender: characters.faculty.name,
				script: 'moreBins',
				contents: [`We need more recycling bins in our part of the building, we use a lot of
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

			//levels

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
				trash: the recycling rate depends a lot on what people are buying, too. So don't worry
				too much if the rate goes up and down: we can try and deal with purchasing later.`
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

			//endgame
			{
				sender: characters.management,
				script: 'scoring',
				contents: [`It's been 4 months now, and it's time we went over the staff review.`,
				`${this.isFired()}`,
				`${this.scoring()}`,
				],
			},

		],
		progress: 0,
	}
	    this.nextPage = this.nextPage.bind(this);
	}

	isFired = () => {
		//are they fired?
		var firedReasons = [];
		if(this.props.staffHappiness < 30) firedReasons.push(' the staff are super unhappy with you');
		if(this.props.money < -10000) firedReasons.push(` you've gone way waaaaay over budget`);
		if(this.props.rodents/(this.props.students+this.props.faculty) > 2) firedReasons.push(` there are a *lot* of rodents`);
		if(this.props.collectionRate < 70) firedReasons.push(` barely any of the waste is getting collected`);

		//if more than one reason, add an and
		if(firedReasons.length >= 2) 
			firedReasons[firedReasons.length-1] = ' and' + firedReasons[firedReasons.length-1];

		//you're fired
		if(firedReasons.length !== 0){
			firedReasons[0] = `We regret to inform you, but you're fired. It's nothing personal, but ` + firedReasons[0];
			this.props.dispatch({
				type: 'fired',
			})
		}	
		
		//not fired
		else
			firedReasons.push(`We're glad to inform you that we'd like to keep you on!`)

		console.log(firedReasons);
		//how they do?
		return firedReasons;
	}

	scoring = () => {
		var scoring;
		console.log('landfill over waste', this.props.totalLandfill/this.props.totalWaste);
		var isFired = this.props.isFired;
		//0-40% diverted
		if(this.props.totalLandfill/this.props.totalWaste < 1.1){
			if(isFired) scoring = `You've really not done much about diverting waste either!\
				All in all, we're pretty disappointed.`
			else scoring = `However, you've barely made a dent in our landfill issues\
				We brought you on to make a change, not just to pick up more bags!\
				In the future, we'd like to see more of a focus on sustainability.`
		}
		//>40% diverted
		if(this.props.totalLandfill/this.props.totalWaste < 0.6){
			if(isFired) scoring = `You did start to make some progress with diverting waste\
				from landfill, but didn't get very far!`
			else scoring = `You've started to make some progress with diverting waste\
				from landfill, but you haven't yet got very far!\
				In the future, we'd like to see more of a focus on sustainability.`
		}
		//getting there
		if(this.props.totalLandfill/this.props.totalWaste < 0.4){
			if(isFired) scoring = `However, you did manage to make something of a dent\
				in our landfill issue! We will continue to implement some of the\
				programs you've initiated.`
			else scoring = `You've made good progress on getting to Zero Waste, though\
				there's still some way to go!`
		}
		//close
		if(this.props.totalLandfill/this.props.totalWaste < 0.2){
			if(isFired) scoring = `That said, you made a great effort on our landfill\
				waste issue! We'll be continuing with a number of the programs you implemented`
			else scoring = `You're almost there with zero waste! I'm confident we'll get there\
				in a couple of months, great work!`
		}
		//you win
		if(this.props.totalLandfill/this.props.totalWaste < 0.1){
			if(isFired) scoring = `That said, you've done a fantastic job getting us to zero\
				waste: though we can't keep you on, we will be trying to keep the\
				program running!`;
			else scoring = `You did it!! The campus is now at zero waste, diverting 90% or more of\
				all the waste generated from landfill. Fantastic work!`
		}
		return scoring;


	}

	randomContaminant = () => {
		var contaminants = ["food", "coffee cups", "plastic bags", "greasy paper", "clothing", "styrofoam"];
		var rand;
		if(this.props.day)
			rand = ((this.props.day+this.props.week+this.props.recyclingCost)%contaminants.length);
		else
			rand =0; 
		var contaminant = contaminants[rand];
		return contaminant;
	}

	nextPage = (event) => {
		event.preventDefault();
		if(this.state.scriptSelected[this.state.progress + 1]===undefined){
			this.props.dispatch({
			    type: 'ENDSCRIPT',
			});
			if(this.props.onboarded === false){
				this.props.dispatch({
			    	type: 'ONBOARD',
				});
			}
			if(this.props.script === 'scoring'){
				console.log('ending...')
				this.props.dispatch({
				    type: 'ENDGAME',
				});	
			}
		this.props.startTimer();
		}
		else (this.setState({progress: this.state.progress+1}))
	}

	selectScript = (script) => {
		var scriptSelected;
		var scriptSender;
		this.setState({xpos: this.state.xpos+10});
		this.setState({ypos: this.state.ypos+10});

		this.state.scripts.forEach(function(element) {
			if(element.script === script){
				scriptSender = element.sender;
				scriptSelected = element.contents;
			}		
		});
		if(this.props.onboarded === false){
			this.setState({scriptSelected: this.state.scripts[1].contents});
			this.setState({scriptSender: characters.management});
		}
		else if(scriptSelected === undefined){
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

	componentDidUpdate(prevProps) {
		if(this.props.endgame !== prevProps.endgame){
			this.render();
		}
	}

	render() {
      if (this.props.endgame === true) {
        return <Redirect to='/Frontpage' />;
      }

		let contaminant = this.state.contaminant;

		return(
			<div>
				<div className="script"> 
				<h1 className="menutitle">{this.state.scriptSender}</h1>
				<div className="scriptText"  dangerouslySetInnerHTML={this.messageText()} ></div>
				<button className="nextButton" onClick={(event) => this.nextPage(event)}> > </button>
				</div>
			</div>
		);
	}
}
export default connect(mapStateToProps)(Story);
