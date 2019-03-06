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
  }
}


class Menu extends Component{
  constructor(props) {
    super(props);
	this.state = {
	  username: '',
	  mainMenu: [],
	  hideMenu: true,
	  menuSelected: [],
	  menuContents: [],
	  menus: menus,
	  staff: {
		custodial: '',
		recycling: '',
		supervisors: '',
		managers: '',
	},
	}
	this.renderMenu = this.renderMenu.bind(this);
	this.menuAction = this.menuAction.bind(this);
}

	renderMainMenu = () => {
		this.setState( {mainMenu: ["custodial", "education", "recycling", "speciality"]} );
		return this.state.mainMenu;
	}

	renderMenu = (menu, event) => {
		event.preventDefault();
		var menuContents = [];
		this.state.menus.forEach(function(element) {
		if(element.menu === menu)
			menuContents=element.items;
		});
		console.log("menu is ", this.state.menuContents)
		this.setState({menuContents: menuContents})
		this.setState({
      		hideMenu: !this.state.hideMenu,
      		menuSelected: menu,
    	});
	}

	menuAction = (action, event) => {
		event.preventDefault();
		this.props.dispatch({
		 	type: action,
		});		
	}

	componentDidMount() {
		this.renderMainMenu();
	}

	render() {
		let menuBar = this.state.mainMenu;

		return(
			<div>
			<div id="footer">
			<div id="menubar">
			{menuBar.map((d, i) =>
				<div className="menubutton" id={d} key={i} onClick={(event) => this.renderMenu(d, event)}>{d}</div>
			)}
			</div>
			</div>
			{!this.state.hideMenu && <Child menuSelected={this.state.menuSelected} menuContents={this.state.menuContents} menuAction={this.menuAction}/>}
			</div>
		);
	}
}

class Child extends Component {
	render() {
	let menuList = this.props.menuContents;	
		return(
			<div id="menubox" className='menu'>
				<h1 className="menuTitle">{this.props.menuSelected}</h1>
				{menuList.map((d, i) =>
					<div className="menuelement" key={i}  onClick={(event) => this.props.menuAction(d.item, event)}><b>{d.item} ${d.cost}</b> <br/> {d.info}</div>
				)}
			</div>
		);
	}
}

export default connect(mapStateToProps)(Menu);