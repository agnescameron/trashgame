import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {buildings} from './helpers/buildings.js';
import {characters} from './helpers/characters.js';
import {Line} from 'react-chartjs-2';
import '../css/main.css'
import '../css/agents.css'

const mapStateToProps = (state) => {
  return{
  	buildingsVisible: state.appReducer.buildingsVisible,
  	custodialStaff: state.appReducer.custodialStaff,  
  	recyclingStaff: state.appReducer.recyclingStaff, 
  	recyclingQuality: state.appReducer.recyclingQuality,
  	collectionRate: state.appReducer.collectionRate, 
  	collectionRateHistory: state.appReducer.collectionRateHistory,
  	students: state.appReducer.students,
  	faculty: state.appReducer.faculty,
  	level: state.appReducer.level,
  	bins: state.appReducer.bins,
  	day: state.appReducer.day,
  	rodents: state.appReducer.rodents,
  	trashbins: state.appReducer.trashbins,
  }
}


class Sidebar extends Component{
  constructor(props) {
    super(props);
	this.state = {

	}
}

	closeInfo = (event) => {
		event.preventDefault();
		this.setState({showBuildingInfo: false});
	}

	componentDidMount() {

	}

	componentDidUpdate(prevProps) {
		if (this.props.collectionRate !== prevProps.collectionRate) {
	    	this.componentDidMount();
	  	} 
	}

	render() {
		//super hacky, gets buildings visible from props

		return(
			<div className="sidebar">
				<div className="sidebox">
					<div className="column">
					{this.props.faculty} faculty: <div className="faculty" style={{margin: '4px'}}></div><br/>
					{this.props.students} students: <div className="student" style={{margin: '4px'}}></div>
					</div>
					<div className="column" style={{marginLeft: '-10px'}}>
					{this.props.custodialStaff} custodial staff: <div className="custodian" style={{margin: '4px'}}></div><br/>
					{this.props.level >=1 && <div>{this.props.recyclingStaff} recycling staff: <div className="recycling" style={{margin: '4px'}}></div></div>}<br/>
					</div>
					🐀: {this.props.rodents} rodents<br/>
					🗑: {this.props.trashbins} trash bins <br/>
					{this.props.level >=1 && <div>♻️: {this.props.bins} recycling bins</div>}
				</div>

				<div>
				<div className="menutitle">{this.props.collectionRate}% collection rate</div>
				<Chart history={this.props.collectionRateHistory} day={this.props.day} />
				</div>
				<div className="sidebox">
				
				</div>

			</div>
		);
	}
}

class Chart extends Component {
	render() {

	if(this.props.history)
		console.log('history length is', this.props.history.length, 'days are', this.props.day);

	var days = [];
	for(var i=0; i<=this.props.day; i++){
		days.push(i);
	}
	var data= {
			labels: days,
	        datasets: [{
		        backgroundColor: 'rgb(255, 99, 132)',
		        borderColor: 'rgb(255, 99, 132)',
		        data: this.props.history,
		        fill: false,
		        pointRadius: 0,	
		    }]
	    }

	var options={
		yAxisID: this.props.label + '%',
	    maintainAspectRatio: false,
	     layout: {
		    padding: {
		      top: 5,
		      bottom: 5
		    }
		},
	    legend: {
            display: false
       	},
	    elements: {
	        line: {
	            tension: 0.2
	        }
	    },
	    scales: {
	        xAxes: [{
	        	display:false,
	            gridLines: {
	                display:false
	            },
	            ticks: {
                beginAtZero: true
            	}  
	        }],
	        yAxes: [{
	            display:false,
	            gridLines: {
	                display:false
	            },
	            ticks: {
                beginAtZero: true
            	}   
	        }]
	    }       	
	}
		return(
		<div>
			<div className="menutitle">{this.props.label}</div>
			<div className="sidechartcontainer">
				<Line data={data} options={options} width={100} height={70}/>
			</div>
		</div>
		);
	}
}


export default connect(mapStateToProps)(Sidebar);