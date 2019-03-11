   export const scripts = [
			{
				script: 'onboard',
				contents: [`Hello and welcome to 'let's play, waste at MIT'\
				You are the new head of waste management at the Media Lab.\
				We're glad to have you on the team!`,
				"You're in charge of solid waste, which covers trash, recycling and compost",
				"Right now, the biggest challenge that the lab is facing is landfill: 100% of our waste gets thrown away, and that's a problem!\
				it can be hard to get people to listen...\
				but we're sure you'll be fine!",
				"the lab is pretty new, and is set to grow a lot in the coming months\
				...so you'll need to hire new staff to deal with the extra waste\
				Also: if you do a good job here, we'll ask you to expand to more buildings on campus",
				//show campus
				"this is the whole campus:\
				right now, the only building you have to worry about is this one:\
				the only people in the building are 1 faculty and 3 students\
				they've not got a lot of funding yet, so won't be ordering a lot of materials, or producing much waste",
				`for now, you should focus on getting recycling up and running in the lab\
				to bring up the recycling menu, click the symbol here ${clickRecycling()}`,
				//show recycling
				"that's how the menu starts: as you get more buildings, more items will be added\
				as you acquire items and staff, the percentage of recycling will increase\
				but be careful not to go over budget!",
				"also, if you want to hire and train custodial staff, press here",
				"and to run outreach and education campaigns, press here",
				"that's all from me right now. for the help menu, press here\
				...I'll be in touch once you've made some progress",
				],
			},
			{
				script: 'addBuilding',
				contents: ["Things seem to be going pretty well here!",
				`you've got the recycling and waste collection under control, and your staff are ${getStaffSentiment()}`,
				"It's time we gave you some more responsibilities!",
				`We're asking you to take charge of ${buildings[this.props.buildingsVisible-1].building}. They have a budget\
				of ${buildings[this.props.buildingsVisible-1].budget}, with ${buildings[this.props.buildingsVisible-1].faculty} faculty,\
				with ${buildings[this.props.buildingsVisible-1].students} students, and with ${buildings[this.props.buildingsVisible-1].labs} \
				specialised labs.`,
				`We think you'll do great! Let me know if you need any help`,
				`thanks!`
				],
			},
			{
				script: 'rodents',
				contents: [`We realise that this is a difficult time right now -- you've only been at the job for ${this.props.week} weeks,\
				but we really need you to do something about the waste collection rate`,
				`The rodent population was under control before, but it's spiking again! The custodial staff -- not to mention\
				the faculty and the students \
				are going to be super unhappy if this continues!`,
				`Sort it out before the mice go out of control!`
				],
			},
		]

		