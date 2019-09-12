const friendReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_FRIEND':
      return action.payload;
    default:
      return state;
  }
};

// friend will be on the redux state at:
// state.friend
export default friendReducer;
