import { PURGE } from 'redux-persist';

function appReducer (state, action) {
  if(state === undefined) {
    return {};
  }

  switch (action.type) {

    //menu options

    //staff menu
    case 'hire':
      return Object.assign({}, state, {
        staff: state.staff+1,
        money: state.money-100,
      });

    case 'fire':
      return Object.assign({}, state, {
        staff: state.staff-1,
        money: state.money+80,
      });

    case 'train':
      return Object.assign({}, state, {
        money: state.money-100,
      });


    //education menu
    case 'lecture':
      return Object.assign({}, state, {
        staff: state.staff+1,
        money: state.money-100,
      });

    case 'workshop':
      return Object.assign({}, state, {
        staff: state.staff-1,
        money: state.money+80,
      });

    case 'signs':
      return Object.assign({}, state, {
        money: state.money-100,
      });

    case 'adverts':
      return Object.assign({}, state, {
        money: state.money-100,
      });

    //recycling menu
    case 'bins':
      return Object.assign({}, state, {
        bins: state.bins+1,
        money: state.money-10,
      });

    case 'staff':
      return Object.assign({}, state, {
        staff: state.recyclingStaff+1,
        money: state.money-150,
      });

    case 'vans':
      return Object.assign({}, state, {
        money: state.money-10000,
        vans: state.vans+1,
      });

    //recycling menu
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


    //buildings
    case 'addBuilding':
      return Object.assign({}, state, {
          buildingsVisible: state.buildingsVisible + 1,
          faculty: state.faculty + action.faculty,
          students: state.students + action.students,
    });

    //main (meta) functions
    case 'DAY':
      return Object.assign({}, state, {
        day: action.day,   
      });

    case 'WEEK':
      return Object.assign({}, state, {
        recyclingQuality: action.recyclingQuality,
        recyclingCost: action.recyclingCost,
        collectionRate: action.collectionRate,
        wasteCost: action.wasteCost,
        money: state.money-action.recyclingCost,
        week: state.week + 1,
      });

    case 'MONTH':
      return Object.assign({}, state, {
        money: state.money-action.wages+action.budget,
        month: state.month + 1,
      });

//initial setup of the state
    case 'PURGE':
      return {};

    case 'INITIALISE':
      return Object.assign({}, state, {
        labs: 0,
        day: 0,
        week: 0,
        month: 0,
        money: 10000,
        staff: 0,
        bins: 0,
        students: 3,
        faculty: 1,
        collectionRate: 0,
        recyclingQuality: 0,
        messages:[],
        buildingsVisible: 1,
        onboarded: false,
        runScript: true,
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

    default:
      return state;
  }
}

export {appReducer};
