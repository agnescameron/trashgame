//should start introducing variable costs here


const helpers = {
 
	calculateRecyclingQuality: function(state, props) {
		var recyclingQuality = 100-((state.faculty+state.students)-10*props.staff)-((state.faculty+state.students)-10*props.bins);
		return recyclingQuality;
		},


	//instead of number values have 'classA cost', 'classB cost', 'classA limit', classB limit
	calculateRecyclingCost: function(recyclingQuality) {
		var recyclingCost;
			if (recyclingQuality<98){
				recyclingCost = 500;			
			}

			if (recyclingQuality<95){
				recyclingCost = 1000;			
			}
				
			if (recyclingQuality<90){
				recyclingCost = 2000;			
			}

			if (recyclingQuality<80){
				console.log('trash');
				recyclingCost = 2500;			
			}
		
		return recyclingCost;
	}	
}

export default helpers;