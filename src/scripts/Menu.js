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
	}
	this.renderMainMenu = this.renderMainMenu.bind(this);
	this.renderMenu = this.renderMenu.bind(this);
	this.renderStaffMenu = this.renderStaffMenu.bind(this);
	this.renderRecyclingMenu = this.renderRecyclingMenu.bind(this);	
}


	renderMainMenu = () => {
		this.setState( {mainMenu: ["staff", "education", "recycling"]} );
		return this.state.mainMenu;
	}


	renderStaffMenu = () => {
		this.staffMenu = ["A", "B", "C", "D", "E"];
		return this.staffMenu;
	}


	renderRecyclingMenu = () => {
		this.recyclingMenu = ["bins", "staff", "vans", "offsite"];
		return this.recyclingMenu;
	}

	renderMenu = (menu, event) => {
		event.preventDefault();
		this.setState({
      		hideMenu: !this.state.hideMenu,
      		menuSelected: menu
    	})
    	console.log('clicked', menu, "hideMenu is", this.state.hideMenu);
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
			{!this.state.hideMenu && <Child menuSelected={this.state.menuSelected} />}
			</div>
		);
	}
}

class Child extends Component {
	
	render() {
		return(
			<div id="menubox" className='menu'>
				{this.props.menuSelected}
			</div>
		);
	}
}

export default Menu;