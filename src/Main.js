import React, { Component } from 'react';
import Stats from './scripts/Stats.js';
import Menu from './scripts/Menu.js';
import GameMap from './scripts/GameMap.js';
import Sidebar from './scripts/Sidebar.js';
import GameLoop from './GameLoop.js';
import { connect } from 'react-redux';
import {Redirect} from 'react-router'
import './css/main.css';

const mapStateToProps = (state) => {
  return {
    username: state.appReducer.username,
    endgame: state.appReducer.endgame,
  };
}


class Main extends Component {

constructor(props){
	super(props);
}

  render() {
    
    if (this.props.endgame === true) {
      return <Redirect to='/' />;
    }

    return (     
    <div className="App">
		<div>
			<Stats />
				<div id="centre">
					<GameMap />
					<Sidebar />
				</div>	
			<Menu />
		</div>
	</div>		
    );
  }
}

export default Main;
