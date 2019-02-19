import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import '../css/main.css'


//gets the stored username+uuid from the state
const mapStateToProps = (state) => {
  return{
  	money: state.appReducer.money,
  	staff: state.appReducer.staff,
  }
}


class Menu extends Component{
  constructor(props) {
    super(props);
	this.state = {
	  username: '',
	  mainMenu: [],
	  hideMenu: true,
	  menuSelected: '',
	  menuContents: [],
	  money: 10000,
	  staff: {
		custodial: '',
		recycling: '',
		supervisors: '',
		managers: '',
	},
	}
	this.renderMenu = this.renderMenu.bind(this);
	this.menuAction = this.menuAction.bind(this);
	this.renderMainMenu = this.renderMainMenu.bind(this);	
}

	renderMainMenu = () => {
		this.setState( {mainMenu: ["staff", "education", "recycling"]} );
		return this.state.mainMenu;
	}

	renderMenu = (menu, event) => {
		event.preventDefault();
		console.log(menu)
		if(menu === 'staff')
			this.setState( {menuContents: ["hire", "fire", "train"]} );
		if(menu === 'recycling')
			this.setState( {menuContents: ["bins", "staff", "vans", "offsite"]} );
		if(menu === 'education')
			this.setState( {menuContents: ["lecture", "workshop", "signs", "advertising campaign"]} );
		console.log("menu is ", this.state.menuContents)
		this.setState({
      		hideMenu: !this.state.hideMenu,
      		menuSelected: menu,
    	})
	}


	menuAction = (action, event) => {
		event.preventDefault();
		console.log(action);
	
		switch(action){
			case "hire":
				this.setState({staff: this.state.staff+1});
				this.setState({money: this.state.money-100});
				break;
			case 'fire':
				this.setState({staff: this.state.staff-1});
				this.setState({money: this.state.money+100});
				break;
			case 'train':
				this.setState({money: this.state.money-100});
				break;
			case 'bins':
				this.setState({bins: this.state.bins+1});
				this.setState({money: this.state.money-10});
				break;
			case "vans":
				this.setState({vans: this.state.vans+1});
				this.setState({money: this.state.money-10000});
				break;
		}
		this.props.dispatch({
		 	type: 'MONEY',
		   	money: this.state.money,
		},
		{	type: 'STAFF',
		    staff: this.state.staff,
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