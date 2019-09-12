const findUserReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_USER_SEARCH':
      return action.payload;
    default:
      return state;
  }
};

// search will be on the redux state at:
// state.findUser
export default findUserReducer;
