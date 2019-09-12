const findUserReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_USER_SEARCH':
      return action.payload;
    case 'CLEAR_USER_SEARCH':
      return (state = []);
    default:
      return state;
  }
};

// search will be on the redux state at:
// state.findUser
export default findUserReducer;
