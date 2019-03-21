import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { menus } from './helpers/menus.js'
import ReactTooltip from 'react-tooltip'
import '../css/main.css'


//gets the stored username+uuid from the state
const mapStateToProps = (state) => {
  return{
  	money: state.appReducer.money,
  	staff: state.appReducer.staff,
  	bins: state.appReducer.bins,
  	vans: state.appReducer.vans,
  	level: state.appReducer.level,
  }
}


class Menu extends Component{
  constructor(props) {
    super(props);
	this.state = {
	  username: '',
	  hideMenu: true,
	  menuSelected: [],
	  menuContents: [],
	  menus: menus,
	}
	this.menuAction = this.menuAction.bind(this);
}

	renderMenu = (menu, event) => {
		event.preventDefault();
		var menuContents = [];
		this.state.menus.forEach(function(element) {
		if(element.menu === menu)
			menuContents=element.items;
		});
		this.setState({menuContents: menuContents})
		this.setState({
      		hideMenu: !this.state.hideMenu,
      		menuSelected: menu,
    	});
	}

	menuAction = (action, i, event) => {
		setTimeout(function() {document.getElementById(i).blur();}, 150);
		event.preventDefault();
		this.props.dispatch({
		 	type: action,
		});		
	}


	render() {
		var menuBar;

		if (this.props.level === 0)
			menuBar = this.state.menus[0].items;
		else if (this.props.level === 1)
			menuBar = this.state.menus[1].items;
		else if (this.props.level === 2)
			menuBar = this.state.menus[2].items;
		else
			menuBar = this.state.menus[3].items;

		return(
			<div>
			<div id="footer">
			<div id="menubar">
			{menuBar.map((d, i) =>
				<div className="menubutton" id={d} key={i} onClick={(event) => this.renderMenu(d, event)}>{d}</div>
			)}
			</div>
			</div>
			{!this.state.hideMenu && <Child menuSelected={this.state.menuSelected} menuContents={this.state.menuContents} renderMenu={this.renderMenu} menuAction={this.menuAction}/>}
			</div>
		);
	}
}

class Child extends Component {
	render() {
	let menuList = this.props.menuContents;	
		return(
			<div id="menubox" className='menu'>
				<button onClick={(event) => this.props.renderMenu(0, event)}> x </button>
				<h1 className="menuTitle">{this.props.menuSelected}</h1>
				{menuList.map((d, i) =>
					<div className="menuelement" id={i} key={i} tabIndex="1" onClick={(event) => this.props.menuAction(d.item, i, event)}><b>{d.item} ${d.cost}</b> <br/> {d.info}</div>
				)}
			</div>
		);
	}
}

export default connect(mapStateToProps)(Menu);