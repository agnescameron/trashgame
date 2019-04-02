export const menus = [
	  	{
	  		menu: 'main1', 
	  		items: ["custodial"],
	  	},
	  	{
	  		menu: 'main2', 
	  		items: ["custodial", "recycling"],
	  	},
	  	{
	  		menu: 'main3', 
	  		items: ["custodial", "recycling", "education"],
	  	},
	  	{
	  		menu: 'main4', 
	  		items: ["custodial", "recycling", "education", "speciality"],
	  	},
	  	{
	  		menu: 'custodial', 
	  		items: [
		  		{
		  			item: "hire",
		  			cost: 100,
		  			info: "Hire a custodian to join the team! They will help\
		  			boost your collection rate. You'll need to pay them a monthly\
		  			wage of $100"
		  		},		  		
		  		{
		  			item: "fire",
		  			cost: -80, 
		  			info: "Low on money? Your personnel costs might be eating away\
		  			at your finances. Getting rid of staff is risky, and can make\
		  			you pretty unpopular, but will save on weekly costs."
		  		},
		  		{
		  			item: "train",
		  			cost: 60,
		  			info: "It's the custodial staff that have to spot recycling\
		  			contamination: if they're trained, it can help increase your\
		  			recycling quality, and reduce costs"
		  		}
	  		],
	  	},
	  	{
	  		menu: 'recycling', 
	  		items: [
	  		{
	  			item: "bins",
	  			cost: 100,
	  			info: "Can't recycle without a recycling bin! Careful though: too\
	  			many bins can overwork your custodians, and people might not think\
	  			hard enough about what they put in."
	  		},
	  		{
	  			item: "staff",
	  			cost: 200, 
	  			info: "Hire some recycling staff! These are the people who will take\
	  			collected recycling from each building, and drive it to the dump. As\
	  			you increase the amount of recycling, you'll need to hire more staff\
	  			to cope. You'll need to pay them a monthly wage of $100"
	  		},
	  		{
	  			item: "recycling van",
	  			cost: 100000,
	  			info: "The van you're using should be fine... for now! As\
	  			you increase the amount of recycling, you'll need a bigger van\
	  			to cope."
	  		}],
	  	},
	  	{
	  		menu: 'education', 
	  		items: [
		  		{
		  			item: "signs",
		  			cost: 10,
		  			info: "Clear signage is key to communicating what to recycle or not!\
		  			You need to get a sign for each bin you buy."
		  		},
		  		{
		  			item: "outreach",
		  			cost: 1000,
		  			info: "Talk to the student newspaper! Maybe if people are more aware\
		  			then they'll recycle better."
		  		},
		  		{
		  			item: "workshop",
		  			cost: 2000, 
		  			info: "Get everyone together to talk about recycling! This takes time\
		  			and money, but might up the quality"
		  		},
	  		],
	  	},
	  	{
	  		menu: 'speciality', 
	  		items: [
		  		{
		  			item: "compost",
		  			cost: 1000,
		  			info: "Want to start diverting food waste from landfill? Good shout!\
		  			Compost collection costs $500 per building each month (+ some starting costs), \
		  			and you'll need to tell people about it before they use it!"
		  		},
		  		{
		  			item: "batteries",
		  			cost: 500,
		  			info: "A specialist battery stream is a great idea! This will cost about $500/month to run"
		  		},
		  		{
		  			item: "clothing",
		  			cost: 500, 
		  			info: "A specialist clothing stream is a great idea! This will cost about $500/month to run"
		  		},
	  		],
	  	}

	  ]


export default { menus, };