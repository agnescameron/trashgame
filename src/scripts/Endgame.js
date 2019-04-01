import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router'
import '../css/main.css'
import { connect } from 'react-redux';

//gets the stored username+uuid from the state
const mapStateToProps = (state) => {
  return{
  	endgame: state.appReducer.endgame,
  }
}


class Endgame extends Component{
  constructor(props) {
    super(props);
	this.state = {
		username: '',
		}
	}


	startGame = (event) => {
		event.preventDefault();
		console.log('oooooo')
		this.props.dispatch({
		   type: 'INITIALISE',
		});
	}

	componentDidMount() {
		console.log('mounting')
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
			<div>
				<div className="endgame"></div>
				<button onClick={(event) => this.startGame(event)}>start {this.props.endgame}</button>
			</div>
		);
	}
}
export default connect(mapStateToProps)(Endgame);
