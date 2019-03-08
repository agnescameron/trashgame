//should start introducing variable costs here
import stats from './stats.js'


const economics = {

	calculateLuck: function(state, props) {
		var luck;
		if(props.clothing === true || props.batteries == true) {
			luck=0.8;
		}
		else luck = 0.6;
		return luck;
	},

	calculateTotalWaste: function(state, props) {
		//waste proportion varies between 60% and 100%
		var wasteProportion = (0.6+(1-stats.rollDice(state.luck)));
		var totalWaste = (props.faculty+props.students)*wasteProportion*10 + props.buildingsVisible*100;
		return totalWaste;
	},

 
	calculateRecyclingRate: function(state, props) {
		var recyclingRate = 100-((props.faculty+props.students)-10*props.bins);
		if(recyclingRate > 100)
			recyclingRate = 100;
		return recyclingRate;
	},

	calculateRecyclingQuality: function(state, props) {
		var recyclingQuality = 100-((props.faculty+props.students)-10*props.staff)-((props.faculty+props.students)-10*props.bins);
		if(recyclingQuality > 100)
			recyclingQuality = 100;
		console.log('recyclingQuality is', recyclingQuality);
		return recyclingQuality;
	},

	//instead of number values have 'classA cost', 'classB cost', 'classA limit', classB limit
	calculateRecyclingCost: function(state, props) {
		var recyclingQuality = state.recyclingQuality;
		var recyclingUnitCost;
			if (recyclingQuality<95){
				recyclingUnitCost = 1000;			
			}
				
			if (recyclingQuality<90){
				recyclingUnitCost = 2000;			
			}

			if (recyclingQuality<80){
				recyclingUnitCost = 2500;			
			}
		
			else 
				recyclingUnitCost = 500;
		var recyclingUnits = state.recyclingRate*state.totalWaste;
		var recyclingCost = recyclingUnits*recyclingUnitCost;
		return recyclingUnitCost;
	},

	calculateCollectionRate: function(state, props) {
		var collectionRate= 100-((props.faculty+props.students)-10*props.staff)-((props.faculty+props.students)-10*props.bins);
		if(collectionRate > 100)
			collectionRate = 100;
		return collectionRate;
	},

	calculateWasteCost: function(state, props) {
		var wasteCost = (props.faculty+props.students)*state.collectionRate; //+ props.labs*100*state.collectionRate;
		return wasteCost;
	},


}

export default economics;