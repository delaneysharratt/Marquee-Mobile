const selectedUserReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SELECT_USER':
      return action.payload;
    default:
      return state;
  }
};

// selected user will be on the redux state at:
// state.selected
export default selectedUserReducer;
