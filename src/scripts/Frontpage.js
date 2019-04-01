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
		}
	}


	startGame = (event) => {
		event.preventDefault();
		this.props.dispatch({
		   type: 'INITIALISE',
		});
	}

	renderAbout = (event) => {
		console.log('about')
	}

	componentDidMount() {
	}


	componentDidUpdate(prevProps) {
		if(this.props.endgame !== prevProps.endgame){
			this.componentDidMount();
		}
	}

	render() {
      if (this.props.endgame === false) {
        return <Redirect to='/' />;
      }

      console.log('rendering, endgame is', this.props.endgame)
		return(
			<div className="frontpagebody">
			<div className="frontpagecentre"> Let's play: Waste at MIT </div>
				<div className="frontpagecentre">
					<button className="button" onClick={(event) => this.startGame(event)}>start</button>
					<button className="button" onClick={(event) => this.renderAbout(event)}>about</button>
				</div>
			<div className="image"></div>
			</div>
		);
	}
}
export default connect(mapStateToProps)(Frontpage);
