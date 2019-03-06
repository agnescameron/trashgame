//should start introducing variable costs here


const helpers = {
 
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
		var recyclingCost;
			if (recyclingQuality<95){
				recyclingCost = 1000;			
			}
				
			if (recyclingQuality<90){
				recyclingCost = 2000;			
			}

			if (recyclingQuality<80){
				recyclingCost = 2500;			
			}
		
			else 
				recyclingCost = 500;
		return recyclingCost;
	},

	calculateCollectionRate: function(state, props) {
		var collectionRate= 100-((props.faculty+props.students)-10*props.staff)-((props.faculty+props.students)-10*props.bins);
		if(collectionRate > 100)
			collectionRate = 100;
		return collectionRate;
	},

	calculateWasteCost: function(state, props) {
		var wasteCost = (props.faculty+props.students)*state.collectionRate + props.labs*100*state.collectionRate;
		return wasteCost;
	},			
}

export default helpers;