import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {management, processing, recycling, van, students, faculty} from './helpers/constants';
import '../css/main.css'


//gets the stored username+uuid from the state
const mapStateToProps = (state) => {
  return{
  	messages: state.appReducer.messages,
  }
}


class Messages extends Component{
  constructor(props) {
    super(props);
	this.state = {
		messages: [],
		messageIndex: '',
		readMessage: false,
	}
}

	closeMessage = (event) => {
		event.preventDefault();
		this.setState({readMessage: false});
	}


	readMessage = (i, event) => {
		event.preventDefault();
		console.log('messages length is ', this.props.messages.length)
		var index = this.props.messages.length - i - 1;
		this.setState({messageIndex: index});
		this.setState({readMessage: true});
		this.props.dispatch({
		 	type: 'readMessage',
		 	index: index,
		});		
	}


	componentDidMount() {
	}

	render() {
		let messages = this.props.messages;
		return(
			<div>
			<div id="menubox" className='menu'>
				<button className="closebutton" onClick={(event) => this.props.showMessages(event)}> x </button>
				<h1 className='menutitle'>{'messages'}</h1>
				{messages.reverse().map((d, i) =>
					<div className="menuelement" key={i} onClick={(event) => this.readMessage(i, event)}><b>{d.sender}</b> <br/> {d.contents.substring(0, 40)}...</div>
				)}
			</div>
			{this.state.readMessage===true && <Child messageIndex={this.state.messageIndex} messages={this.props.messages} closeMessage={this.closeMessage}/>}
			</div>
		);
	}
}

class Child extends Component {
	render() {
	var messageContents = this.props.messages[this.props.messageIndex].contents;
	var sender = this.props.messages[this.props.messageIndex].sender;
		return(
			<div id="menubox" className='menu'>
				<div className="menuTitle"> {sender} </div>
				{messageContents}
				<button onClick={(event) => this.props.closeMessage(event)}> x </button>
			</div>
		);
	}
}


export default connect(mapStateToProps)(Messages);