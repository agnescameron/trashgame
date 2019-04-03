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

	redirect = () => {
		console.log('redirecting')
        return <Redirect to='/' />;
	}

	componentDidMount() {
	}

	render() {
	if (this.props.endgame === false) {
        return <Redirect to='/' />;
      }

		return(
			<div className="frontpagebody">
			<div className="frontpagecentre"> <p>Let's play: Waste at MIT</p> </div>
			<div className="frontpagecentre">
				<button className="button" onClick={(event) => this.startGame(event)}>start</button>
				<button className="button" onClick={(event) => this.renderAbout(event)}>about</button>
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
			</div>
		);
	}
}

export default connect(mapStateToProps)(Frontpage);
