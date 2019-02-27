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


	readMessage = (index, event) => {
		event.preventDefault();
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
				<button onClick={(event) => this.props.showMessages(event)}> x </button>
				<h1>{'messages'}</h1>
				{messages.map((d, i) =>
					<div className="menuelement" key={i} onClick={(event) => this.readMessage(i, event)}>{d.sender}</div>
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
		return(
			<div id="menubox" className='menu'>
				{messageContents}
				<button onClick={(event) => this.props.closeMessage(event)}> x </button>
			</div>
		);
	}
}


export default connect(mapStateToProps)(Messages);