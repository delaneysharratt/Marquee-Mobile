const profileReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_PROFILE':
      return action.payload;
    default:
      return state;
  }
};

// watches will be on the redux state at:
// state.watch
export default profileReducer;
