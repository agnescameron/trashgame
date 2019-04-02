//should start introducing variable costs here 


export const characters = {
	management: '👩🏽‍💼 management',
	processing: '👩🏼‍🔧 processing plant',
	van: '👨🏻‍🔧 recycling van',
	students: {
		name: '👨🏿‍💻👩🏻‍💻 students',
		list: ['👩🏻‍💻', '👨🏿‍💻','👨🏼‍💻','👩🏽‍💻','👩🏼‍💻'],
		thoughts: [
			//low collection
			[
				`ew, the mice are back`,
				`this trash has been here for days!`,
				`have they just forgotten about this floor?`,
				`ah, just dump it by the loading dock!`,
				`ugh!! I just saw a mouse in my office!!`,
			],
			//low quality
			[
				`coffee cups are recyclable, right?`,
				'Is this recyclable?',
				`what goes where again?`,
				`they should put some more signs up`,
				`plastic bags? yeah, I think you can recycle them`
				],
			//normal
			[
				`Wow, I'm so stressed`,
				`Is there a compost bin here?`,
				`...too many things to do...`,
				`all this sustainability stuff seems to be going well`,
				`ah, haven't seen a mouse for a while now`],
		],
	},
 	custodial: {	
 		name: '👷🏻‍♂️ custodial staff',
 		list: ['👷🏻‍♂️', '👷🏿‍♂️', '👷🏾‍♂️', '👷🏼‍♀️', '👷🏽‍♀️'],
		thoughts: [
			//low collection
			[
				`there's so much trash in the building these days...`,
				`I hope they hire some more staff soon`,
				`so many rodents right now!`,
				`trash is turning into a major problem`,
				`I don't have time to collect everything!`,
			],
			//low quality
			[
				`I keep having to throw out recycling`,
				`contamination's really high`,
				`do people even know how to recycle?`,
				`I don't have time for this!`,
				`apparently the last load had to be incinerated`
				],
			//normal
			[
				`Recycling's fine I guess, but it's a lot of extra work`,
				`I hope they hire some more staff soon`,
				`another conference?!`,
				`ah, been better, been worse...`,
				`is there a bin in there?`,
				`I wish people wouldn't just dump stuff there...`],
			]
	},
 	recycling: {	
 		name: '👷🏿‍♀️ recycling staff',
 		list: ['👷🏻‍♂️', '👷🏿‍♂️', '👷🏾‍♂️', '👷🏼‍♀️', '👷🏽‍♀️'],
		thoughts: [
			//low collection
			[
				`wow, the loading dock is gross at the moment`,
				`they really need some more custodial staff`,
				`so many rodents right now!`,
				`trash is turning into a major problem`,
				`is it me, or is there way more trash these days?`],
			//low quality
			[
				`I keep having to throw out recycling`,
				'so much trash in the bottom of the container!',
				'ugh! more food in the recycling',
				`do people even know how to recycle?`,
				`I hope this truckload isn't too contaminated...`,
				],
			//normal
			[
				`people need to break down their cardboard boxes!`,
				`I hope they hire some more staff soon`,
				`another conference?!`,
				`sooo much paper`,
				`I wish there was more storage space for these bins`,],
			]
		},		
 	faculty: {
 		name: '👨🏻‍🔬 faculty',
 		list: ['👨🏻‍🔬', '👨🏽‍🔬', '👩🏿‍🔬', '👩🏻‍🔬', '👩🏼‍🔬'],
		thoughts: [
		'...too many things to do...',
		'are my students even in???',
		'need to submit that paper!!',
		'more bins? I guess so',
		'...too many things to do...']
		},
}