//should start introducing variable costs here

export const stats = {

 	//high is lucky, returns a number between 'luck' and 1
	rollDice: function(luck) {
		var score
		do {
			score = Math.random();
		} while(score < luck);
		
		return score
	},

	gaussianRandRange: function(start, end) {
	  return Math.floor(start + this.gaussianRand() * (end - start + 1));
	},

	gaussianRand: function() {
	  var rand = 0;

	  for (var i = 0; i < 6; i += 1) {
	    rand += Math.random();
	  }

	  return rand / 6;
	},
}

export default stats;