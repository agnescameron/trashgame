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


    //other
    case 'RESET':
      return Object.assign({}, state, {
        onboarded: false,
        day: 0,    
        money: 10000,
      });

    case 'ONBOARD':
      return Object.assign({}, state, {
        onboarded: true,   
      });

    case 'NEXTDAY':
      return Object.assign({}, state, {
        day: action.day,   
      });

    default:
      return state;
  }
}

export {appReducer};
