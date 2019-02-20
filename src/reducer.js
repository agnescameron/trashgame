function appReducer (state, action) {
  if(state === undefined) {
    return {};
  }

  switch (action.type) {

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

    case 'MONEY':
      return Object.assign({}, state, {
        money: action.money,   
      });

     case 'STAFFMENU':
      return Object.assign({}, state, {
        money: action.money,
        staff: action.staff,
        bins: action.bins,
        vans: action.vans
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
