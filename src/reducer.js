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
        staff: state.bins+1,
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

    case 'offsite':
      return state;

    //messages
    case 'addMessage':
      return Object.assign({}, state, {
        messages: [...state.messages, action.message],
    });

    case 'readMessage':
      let messageArray =  Object.assign({}, state, {
        [action.index]: {
          ...state.messages[action.index],
          read: true,
        }
    });


    //main (meta) functions
    case 'DAY':
      return Object.assign({}, state, {
        day: action.day,   
      });

    case 'WEEK':
      return Object.assign({}, state, {
        money: state.money-action.recyclingCost,
      });

    case 'MONTH':
      return Object.assign({}, state, {
        money: state.money-action.wages+action.budget,
      });

    case 'RESET':
      return Object.assign({}, state, {
        onboarded: false,
        day: 0,
        money: 10000,
        staff: 0,
        bins: 0,
        messages:[],
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
