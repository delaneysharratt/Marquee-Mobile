const watchReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_WATCHES':
      return action.payload;
    case 'SET_COLLECTION':
      return action.payload;
    default:
      return state;
  }
};

// watches will be on the redux state at:
// state.watch
export default watchReducer;
