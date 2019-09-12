const friendListReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_FRIEND_LIST':
      return action.payload;
    default:
      return state;
  }
};

// friendList will be on the redux state at:
// state.friendList
export default friendListReducer;
