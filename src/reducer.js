function appReducer (state, action) {
  if(state === undefined) {
    return {};
  }

  switch (action.type) {

    default:
      return state;
  }
}

export {appReducer};
