import { PURGE } from 'redux-persist';

function appReducer (state, action) {
  if(state === undefined) {
    return {};
  }

  switch (action.type) {

    //menu options

    //custodial staff menu
    case 'hire':
      return Object.assign({}, state, {
        custodialStaff: state.custodialStaff+1,
        money: state.money-100,
      });

    case 'trash bins':
      return Object.assign({}, state, {
        trashbins: state.trashbins+1,
        money: state.money-10,
      });

    case 'fire':
      return Object.assign({}, state, {
        custodialStaff: state.custodialStaff-1,
        staffHappiness: state.staffHappiness*0.9,
        money: state.money+80,
      });

    case 'train':
      return Object.assign({}, state, {
        money: state.money-100,
      });

    case 'workshop':
      return Object.assign({}, state, {
        workshops: state.workshops+1,
        money: state.money-2000,
      });

    case 'signs':
      return Object.assign({}, state, {
        signs: state.signs+1,
        money: state.money-10,
      });

    case 'outreach':
      return Object.assign({}, state, {
        outreach: state.outreach+10,
        money: state.money-100,
      });

    //recycling menu
    case 'bins':
      return Object.assign({}, state, {
        bins: state.bins+1,
        money: state.money-10,
      });

    case 'staff':
    console.log('hiring recycling staff')
      return Object.assign({}, state, {
        recyclingStaff: state.recyclingStaff+1,
        money: state.money-150,
      });

    case 'recycling van':
    console.log('recycing van')
      return Object.assign({}, state, {
        money: state.money-10000,
        vans: state.vans+1,
      });

    //speciality menu
    case 'compost':
      return Object.assign({}, state, {
        compost: true,
        money: state.money-1000,
      });

    case 'batteries':
      return Object.assign({}, state, {
        batteries: true,
        money: state.money-500,
      });

    case 'clothing':
      return Object.assign({}, state, {
        clothing: true,
        money: state.money-500,
      });

    case 'lab waste':
      return Object.assign({}, state, {
        labwaste: true,
        money: state.money-5000,
      });      

    //purchasing menu
    case 'memo':
      return Object.assign({}, state, {
        proportionRecyclables: state.proportionRecyclables*1.02,
        proportionCompostable: state.proportionCompostable*1.02,
        money: state.money-10,
      });

    case 'purchasing training':
      return Object.assign({}, state, {
        proportionRecyclables: state.proportionRecyclables*1.1,
        proportionCompostable: state.proportionCompostable*1.1,
        money: state.money-500,
      });

    case 'new policy':
      return Object.assign({}, state, {
        proportionRecyclables: state.proportionRecyclables*1.5,
        proportionCompostable: state.proportionCompostable*1.5,
        money: state.money-5000,
      });  

    //messages
    case 'addMessage':
      return Object.assign({}, state, {
        messages: [...state.messages, action.message],
    });

    case 'readMessage':
      let messageArray = Object.assign({}, state, {
        [action.index]: {
          ...state.messages[action.index],
          read: true,
        }
    });
      return messageArray;


  //events
    case 'policyChange':
      return Object.assign({}, state, {
        outreach: state.outreach/3,
        signs: state.signs/3,
    });

    case 'strike':
      return Object.assign({}, state, {
        strike: true,
        
      });

    //buildings
    case 'addBuilding':
      return Object.assign({}, state, {
          buildingsVisible: state.buildingsVisible + 1,
          faculty: state.faculty + action.faculty,
          students: state.students + action.students,
          money: state.money+action.budget,
    });

    case 'moreBins':
      return Object.assign({}, state, {
        bins: state.bins*(2/3),
      })

    case 'population':
      return Object.assign({}, state, {
        faculty: state.faculty + 2,
        students: state.students + 6,
      })

    //main (meta) functions
    case 'NEXTDAY':
    console.log('calling nextday, day is', state.day);
      return Object.assign({}, state, {
        day: state.day+1,
      })

    case 'DAY':
      return Object.assign({}, state, {
        collectionRate: action.collectionRate,
        wasteCost: action.wasteCost,
        money: state.money-action.wasteCost,
        collectionRateHistory: [...state.collectionRateHistory, action.collectionRate],
        leftoverWasteHistory: [...state.leftoverWasteHistory, action.leftoverWaste],
        landfillWasteHistory: [...state.landfillWasteHistory, 1-action.landfillWaste],
        landfillWaste: action.landfillWaste,
        rodents: action.rodents,
        staffHappiness: action.staffHappiness,
        strike: false,
        totalLandfill: action.totalLandfill,
        totalWaste: action.totalWaste,
      });

      case 'DAYL1':
      return Object.assign({}, state, {
        recyclingRateHistory: [...state.recyclingRateHistory, action.recyclingRate],
      }); 

      case 'DAYL2':
      console.log('dispatching, educationLevel is', action.educationLevel)
      return Object.assign({}, state, {
        recyclingQualityHistory: [...state.recyclingQualityHistory, action.recyclingQuality],
        educationLevel: action.educationLevel,
      }); 

      case 'DAYL3':
      return Object.assign({}, state, {
        // compostRateHistory: [...state.compostRateHistory, action.compostRate],
        compostRate: action.compostRate,
      }); 

    case 'WEEK':
      return Object.assign({}, state, {
        week: state.week + 1,
        money: state.money-action.costs,
      });

    case 'MONTH':
      return Object.assign({}, state, {
        money: state.money-action.wages+action.budget,
        month: state.month + 1,
      });

//initial setup of the state
    case 'PURGE':
      return {};

    case 'RESET': 
      return Object.assign({}, state, {
        labs: 0,
        day: 0,
        week: 0,
        month: 0,
        money: 10000,
        recyclingStaff: 0,
        custodialStaff: 0,
        rodents: 0,
        bins: 1,
        vans: 1,
        signs: 0,
        workshops: 0,
        outreach: 0,
        students: 3,
        faculty: 1,
        strike: false,
        collectionRate: 0,
        recyclingQuality: 0,
        recyclingCost: 50,
        recyclingRate: 0,
        messages:[],
        buildingsVisible: 1,
        onboarded: false,
        runScript: true,
        staffHappiness: 100,
        compost: false,
        proportionRecyclables: 0.4,
        proportionCompostable: 0.3,
        level: 0,
        educationLevel: 0,
        collectionRateHistory: [],
        recyclingRateHistory: [],
        compostRateHistory: [],
        recyclingQualityHistory: [],
        leftoverWasteHistory: [],
        landfillWasteHistory: [],
        isFired: false,
        runScript: true, 
        endgame: true,
      });

    case 'INITIALISE':
      return Object.assign({}, state, {
        labs: 0,
        day: 0,
        week: 0,
        month: 0,
        money: 10000,
        recyclingStaff: 0,
        custodialStaff: 0,
        rodents: 0,
        bins: 1,
        vans: 1,
        signs: 0,
        workshops: 0,
        outreach: 0,
        students: 3,
        faculty: 1,
        compost: false,
        strike: false,
        collectionRate: 0,
        recyclingQuality: 0,
        recyclingCost: 50,
        recyclingRate: 0,
        messages:[],
        proportionRecyclables: 0.4,
        proportionCompostable: 0.3,
        buildingsVisible: 1,
        onboarded: false,
        runScript: true,
        staffHappiness: 100,
        level: 0,
        educationLevel: 0,
        collectionRateHistory: [],
        recyclingRateHistory: [],
        recyclingQualityHistory: [],
        compostRateHistory: [],
        leftoverWasteHistory: [],
        landfillWasteHistory: [],
        isFired: false,
        endgame: false,
        runScript: true,
      });

    case 'NEXTLEVEL':
      return Object.assign({}, state, {
        level: state.level+1,
      });


    case 'RUNSCRIPT':
      return Object.assign({}, state, {
        runScript: true,
      });

    case 'ENDSCRIPT':
      return Object.assign({}, state, {
        runScript: false,
      });

    case 'ONBOARD':
      return Object.assign({}, state, {
        onboarded: true,
      });

    case 'MONEY':
      return Object.assign({}, state, {
        money: state.money+action.money,
      });  

    case 'ENDGAME':
      console.log('game ended');
       return Object.assign({}, state, {
        endgame: true,
      });  


    case 'fired':
      return Object.assign({}, state, {
        isFired: true,
      });  
     

    default:
      return state;
  }
}

export {appReducer};
