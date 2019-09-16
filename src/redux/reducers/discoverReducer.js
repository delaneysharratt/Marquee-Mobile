const discoverReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_DISCOVER':
      return action.payload;
    default:
      return state;
  }
};

// watches will be on the redux state at:
// state.discover
export default discoverReducer;
