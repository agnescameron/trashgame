import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../css/main.css'


class Menu extends Component{
  constructor(props) {
    super(props);
	this.state = {
	  username: '',
	  mainMenu: [],
	}
	this.renderMainMenu = this.renderMainMenu.bind(this);
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

	componentDidMount() {
		this.renderMainMenu();
	}

	render() {
		let menuBar = this.state.mainMenu;

		return(

			<div id="menubar">
			{menuBar.map((d, i) => <div id="menubar">
				<div className="menubutton" onClick={(console.log('click'))}>{d}</div>
			</div>)}
			</div>
		);
	}
}

export default Menu;