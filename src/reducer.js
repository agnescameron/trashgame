function appReducer (state, action) {
  if(state === undefined) {
    return {};
  }

  switch (action.type) {

    case 'RESET':
      return Object.assign({}, state, {
        onboarded: false,
        day: 0,    
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
