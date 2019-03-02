import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import '../css/main.css'


//gets the stored username+uuid from the state
const mapStateToProps = (state) => {
  return{
  	messages: state.appReducer.messages,
	  }
	}


class Events extends Component{
  constructor(props) {
    super(props);
	this.state = {
		messages: [],
	}
}


	readMessage = (index, event) => {
		event.preventDefault();
		this.setState({messageIndex: index});
		this.setState({readMessage: true});
		this.props.dispatch({
		 	type: 'readMessage',
		 	index: index,
		});		
	}

	render() {

		return;
	}
}


export default connect(mapStateToProps)(Events);