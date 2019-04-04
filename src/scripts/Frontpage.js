import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router'
import '../css/frontpage.css'
import { connect } from 'react-redux';

//gets the stored username+uuid from the state
const mapStateToProps = (state) => {
  return{
  	endgame: state.appReducer.endgame,
  }
}


class Frontpage extends Component{
  constructor(props) {
    super(props);
	this.state = {
		username: '',
		showAbout: false,
		showParticipate: false,
		}
	}

	startGame = (event) => {
		event.preventDefault();
		this.props.dispatch({
			type: 'PURGE'
		});		
		this.props.dispatch({
		   type: 'INITIALISE',
		});
	}

	renderAbout = (event) => {
		console.log('about')
		this.setState({showAbout: !this.state.showAbout})
	}


	renderParticipate = (event) => {
		console.log('about')
		this.setState({showParticipate: !this.state.showParticipate})
	}

	redirect = () => {
		console.log('redirecting')
        return <Redirect to='/Main' />;
	}

	componentDidMount() {
	}

	render() {
	if (this.props.endgame === false) {
        return <Redirect to='/Main' />;
      }

		return(
			<div className="frontpagebody">
			<div className="frontpagecentre"> <p>Let's play: Waste at MIT</p> </div>
			<div className="frontpagecentre">
				<button className="button" onClick={(event) => this.startGame(event)}>start</button>
				<button className="button" onClick={(event) => this.renderAbout(event)}>about</button>
				<button className="button" onClick={(event) => this.renderParticipate(event)}>participate!</button>
			</div>
			<div className="image"></div>
			{this.state.showAbout && 
				<div className="about">
					<div className="close" onClick={(event) => this.renderAbout(event)}>x</div>
					<div className="textwrap">
					Let's play: Waste at MIT is a game about trash. Specifically, 
					it's about where our trash comes from, who deals with it, and
					where it goes after it leaves the bin. This game does not seek
					to represent an entire waste system, but instead, a small segment
					of one: solid waste management on the MIT Campus.
					<br/><br/>
					Let's play: Waste at MIT was developed from a series of interviews
					with the people that manage waste at MIT. Not all of the numbers
					are real (and neither are the buildings to scale), but the intention
					is to paint a picture of the challenges and considerations of managing
					solid waste on a large campus.
					<br/><br/>
					Let's play: Waste at MIT has been developed as research for a thesis project
					at the MIT Media Lab. It is a work in progress, and if you have
					any comments or questions, please direct them to: <b>agnescam at media
					. mit . edu </b>
					</div></div>}
			{this.state.showParticipate && 
				<div className="about">
					<div className="close" onClick={(event) => this.renderParticipate(event)}>x</div>
					<div className="textwrap">
					This work is part of an ongoing study of attitudes toward waste management.
					As part of this, I am seeking participation in a study on how attitudes
					toward waste systems can be influenced by playing civic games.
					<br/><br/>
					This study consists of two short surveys, one to be completed before playing the 
					game, and one after. The data from these surveys will be anonymously aggregated,
					and presented as part of a thesis project. Participation is voluntary, and can be
					withdrawn at any time. If you would like to support this work, the surveys can
					be found here:
					<br/><br/>
					<a href="https://docs.google.com/forms/d/e/1FAIpQLSc7TAT-doERtu8B9A5ed1raXcu7Fyi1k-Hqt1uJNOADktA5Mw/viewform?usp=sf_link">
					pre-game survey</a><br/>
					<a href="https://docs.google.com/forms/d/e/1FAIpQLScWeryvPPWx7Y3tUKBPYqfCWK24aTZ_VPnu9AbHeE3UvCjYfw/viewform?usp=sf_link">
					post-game survey</a><br/><br/>
					If taking part, please take both sections of the survey! 
					Any participation is greatly appreciated, and if you have further feedback (or questions)
					please contact me at <b>agnescam at media . mit . edu</b>
					</div></div>}					
			</div>
		);
	}
}

export default connect(mapStateToProps)(Frontpage);
