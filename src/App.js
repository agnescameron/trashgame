import React, { Component } from 'react';
import Main from './Main.js';
import Endgame from './scripts/Endgame.js'
import { Route, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import './css/main.css';

const mapStateToProps = (state) => {
  return {
    username: state.appReducer.username,
  };
}


class App extends Component {

constructor(props){
	super(props);
}

  render() {

    return (   
    <div>
	    <Switch>
	    <Route exact path="/" component={Main}/>
	    <Route path="/Endgame" component={Endgame}/>
	  	</Switch>
   	</div> 
    );
  }
}

export default withRouter(App);
