import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
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
	  menus: [
	  	{
	  		menu: 'main', 
	  		items: ["staff", "education", "recycling"],
	  	},
	  	{
	  		menu: 'staff', 
	  		items: ["hire", "fire", "train"],
	  	},
	  	{
	  		menu: 'recycling', 
	  		items: ["bins", "staff", "vans", "offsite"],
	  	},
	  	{
	  		menu: 'education', 
	  		items: ["lecture", "workshop", "signs", "adverts"],
	  	}
	  ],
	  menuSelected: '',
	  menuContents: [],
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
		this.setState( {mainMenu: ["staff", "education", "recycling"]} );
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
				<div className="menubutton" key={i} onClick={(event) => this.renderMenu(d, event)}>{d}</div>
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
				<h1>{this.props.menuSelected}</h1>
				{menuList.map((d, i) =>
					<div className="menuelement" key={i} onClick={(event) => this.props.menuAction(d, event)}>{d}</div>
				)}
			</div>
		);
	}
}

export default connect(mapStateToProps)(Menu);