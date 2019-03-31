//should start introducing variable costs here
import stats from './stats.js'
import {constant} from './constants.js'

const economics = {

	calculateLuck: function(state, props) {
		var luck;
		if(props.clothing === true || props.batteries === true) {
			luck=0.8;
		}
		else luck = 0.6;
		return luck;
	},

	calculateEducationLevel: function(state, props) {
		//calculate percent signage
		var signRate, outreachRate, workshopRate, educationLevel;
		
		if (props.bins>props.signs)
			signRate = 1 - (props.bins-props.signs)/props.bins;
		else signRate = 1;

		//calculate advertising
		if (state.population > props.outreach)
			outreachRate = 1 - (state.population - props.outreach)/state.population;
		else outreachRate = 1;

		//calculate workshops
		if (props.buildingsVisible > props.workshops)
			workshopRate = 1 - (props.buildingsVisible - props.workshops)/props.buildingsVisible;
		else workshopRate = 1;

		//calculate education level
		educationLevel = (signRate+outreachRate+workshopRate)/3;
		return educationLevel;
	},

	calculateTotalWaste: function(state, props) {
		//waste proportion varies between 60% and 100%: higher number is worse here, thus inverted
		var leftoverWaste;
		if(props.day !==0 && props.day !==1)
			leftoverWaste = props.leftoverWasteHistory.slice(-1)[0];
		else
			leftoverWaste = 0;
		var wasteProportion = ((1+state.luck)-stats.rollDice(state.luck));
		var totalWaste = (state.population)*wasteProportion*constant.wastePopMultiplier 
			+ constant.wasteBuildingConst*props.buildingsVisible + leftoverWaste;
		return totalWaste;
	},

	//this is for custodial collection: they cover both recycling and trash
	//should this scale with number of bins?
	calculateCollectionRate: function(state, props) {
		var collectionRate;
		//are there enough custodians for all the bins + extra trash (penalty for trash not in bins)
		var collectionPower = props.custodialStaff*constant.custodialCollection;
		if(props.custodialStaff === 0 || props.strike === true)
			collectionRate = 0;
		else
			collectionRate = 100 - Math.round(100*((state.totalWaste-collectionPower)/state.totalWaste)) 
		//sanity check
		if(collectionRate > 100){
			collectionRate = 100;
		}
		if(collectionRate < 0){
			collectionRate = 0;
		}

		return collectionRate;
	},


	//RECYCLING CALCULATIONS

	//function of: accessible bins, advertising, proportion of recyclables
	calculateRecyclingRate: function(state, props) {
		var recyclingRate
		//check there are enough bins
		if (props.bins/state.population > 0.1){
			recyclingRate = constant.proportionRecyclables*stats.rollDice(state.luck);
		}
		//insufficient bins
		else {
			recyclingRate = (props.bins/state.population)*10*
				constant.proportionRecyclables*stats.rollDice(state.luck);
		}
		return recyclingRate;
	},

	//returns a %, function of van capacity
	calculateRecyclingCollectionRate: function(state, props) {
		var recyclingUnits = state.recyclingRate*state.totalWaste;
		var collectionRate;
		if(recyclingUnits > constant.vanCapacity*props.vans)
			collectionRate = 1 - (recyclingUnits - constant.vanCapacity*props.vans)/recyclingUnits;
		else
			collectionRate = 1;
		return collectionRate*100;
	},

	//function of: education, signage, outreach, recycling staff
	calculateRecyclingQuality: function(state, props) {
		var recyclingQuality = (state.educationLevel*100*state.luck) + (state.luck*(props.recyclingStaff*30)/state.population)*50;
		if(recyclingQuality > 100)
			recyclingQuality = 100;
		return recyclingQuality;
	},

	//instead of number values have 'classA cost', 'classB cost', 'classA limit', classB limit
	calculateRecyclingCost: function(state, props) {
		var recyclingQuality = state.recyclingQuality;
		var recyclingUnitCost;
			if (recyclingQuality<95){
				recyclingUnitCost = 100;			
			}
				
			if (recyclingQuality<90){
				recyclingUnitCost = 200;			
			}

			if (recyclingQuality<80){
				recyclingUnitCost = 250;			
			}
		
			else 
				recyclingUnitCost = 50;
		var recyclingUnits = state.recyclingRate*state.totalWaste;
		var recyclingCost = recyclingUnits*recyclingUnitCost;
		return recyclingUnitCost;
	},

	calculateCompostRate: function(state, props){
		return props.buildingsVisible*state.educationLevel*constant.proportionFoodWaste;		
	},

	//compost
	calculateTotalCompost: function(state, props){
		return state.compostRate*state.totalWaste;
	},

	calculateCompostCost: function(state, props){
		var compostCost = props.buildingsVisible*constant.compostBuildingCost;
		console.log('compost costs', compostCost);
		return compostCost;
	},

	calculateRodents: function(state, props){
		//consider the last 4 days: average to get 
		var wasteArr = 	props.leftoverWasteHistory.slice(1).slice(-4);
		var sum;
		if(wasteArr)
			sum = wasteArr.reduce((x, y) => x + y);
		else
			sum = 0;
		var rodents = Math.round(sum/4);
		return rodents;
	},

	calculateStaffHappiness: function(state, props) {
		//take existing staff happiness and modulate
		//should be good if: good staff:population ratio
		//nobody getting fired too rapidly
		if(props.custodialStaff){
			var staffHappiness = 100 - props.staffHappiness*(state.population+props.bins+state.rodents/(props.custodialStaff+props.recyclingStaff)
				-(props.custodialStaff+props.recyclingStaff)*(constant.custodialCollection/constant.wastePopMultiplier))/state.population;
		}
		else staffHappiness = 0;
		//sanity check
		if(staffHappiness > 100){
			staffHappiness = 100;
		}
		if(staffHappiness < 0){
			staffHappiness = 0;
		}
		return staffHappiness;
	},

	calculateWeeklyCosts: function(state, props) {
		var wages = props.custodialStaff*100 + props.recyclingStaff*250;
		if(state.compostCost) return (state.compostCost + wages);
		else return wages;
	},

	//after you've calculated waste, recycling, compost, etc
	calculateTotalLandfill: function(state, props){
			var totalLandfill = state.totalWaste;
			if(props.level  >=1){
				totalLandfill = state.totalWaste - 
					state.totalWaste*state.recyclingRate*props.recyclingQuality;
			}
			if(props.level >=2){
				totalLandfill = state.totalWaste - 
					state.totalWaste*state.recyclingRate*state.recyclingQuality;				
			}
			if(props.level >=3){
				totalLandfill = state.totalWaste - 
					state.totalWaste*state.recyclingRate*state.recyclingQuality - 
					state.compostRate*state.totalWaste;				
			}
			return totalLandfill;
	},

	calculateWasteCost: function(state, props) {
		//need to adjust for levels (e.g. -- if level ==== 0, else if...)
		//tweak 'unit costs' to provide a realistic + sustainable picture
		//++ display costs to player
		var landfillCost = state.totalLandfill*constant.landfillUnitCost;
		return landfillCost;
	},

}

export default economics;