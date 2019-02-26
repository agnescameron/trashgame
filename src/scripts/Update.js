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


class Update extends Component{
  constructor(props) {
    super(props);
	this.state = {
		messages: [],
	}
}

	componentDidMount() {
	}

	render() {
		return(
			<div>
			<div id="menubox" className='menu'>
				<h1>{'messages'}</h1>
			</div></div>
		);
	}
}

export default connect(mapStateToProps)(Update);