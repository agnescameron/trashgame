import React, { Component } from 'react';
import Main from './Main.js';
import Frontpage from './scripts/Frontpage.js'
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
	    <Route exact path="/" component={Frontpage}/>	    
	    <Route path="/Main" component={Main}/>
	  	</Switch>
   	</div> 
    );
  }
}

export default withRouter(App);
