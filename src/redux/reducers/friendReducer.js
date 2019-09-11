const friendReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_FRIEND_LIST':
      return action.payload;
    case 'SET_FRIEND':
      return action.payload;
    default:
      return state;
  }
};

// friends will be on the redux state at:
// state.friends
export default friendReducer;
