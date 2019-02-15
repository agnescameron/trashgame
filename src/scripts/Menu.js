import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../css/main.css'

class Menu extends Component{
  constructor(props) {
    super(props);
	this.state = {
	  username: '',
	  mainMenu: [],
	  hideMenu: true,
	  menuSelected: '',
	  menuContents: [],
	}
	this.renderMenu = this.renderMenu.bind(this);
	this.menuAction = this.menuAction.bind(this);
	this.renderMainMenu = this.renderMainMenu.bind(this);
	this.renderStaffMenu = this.renderStaffMenu.bind(this);
	this.renderRecyclingMenu = this.renderRecyclingMenu.bind(this);			
}

	renderMainMenu = () => {
		this.setState( {mainMenu: ["staff", "education", "recycling"]} );
		return this.state.mainMenu;
	}

	renderStaffMenu = () => {
		this.setState( {menuContents: ["staff", "education", "recycling"]} );
		return this.state.menuContents;
	}

	renderRecyclingMenu = () => {
		this.setState( {menuContents: ["bins", "staff", "vans", "offsite"]} );
		return this.state.menuContents;
	}	

	renderMenu = (menu, event) => {
		event.preventDefault();
		console.log(menu)
		if(menu === 'staff')
			this.renderStaffMenu();
		if(menu === 'recycling')
			this.renderRecyclingMenu();
		console.log("menu is ", this.state.menuContents)
		this.setState({
      		hideMenu: !this.state.hideMenu,
      		menuSelected: menu,
    	})
	}


	menuAction = (action, event) => {
		event.preventDefault();
		console.log(action);
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

export default Menu;