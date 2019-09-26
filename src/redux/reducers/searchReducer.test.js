import searchReducer from './searchReducer';

describe('testing searchReducer states', () => {
  test('should give its initial state (empty array)', () => {
    let action = {};
    let newState = searchReducer(undefined, action);
    expect(newState).toEqual([]);
  });
  test('should give state of []', () => {
    let action = {
      type: 'CLEAR_SEARCH'
    };
    let newState = searchReducer([1, 2], action);
    expect(newState).toEqual([]);
  });
  test('should give state of action.payload', () => {
    let action = {
      type: 'SET_SEARCH',
      payload: 'search-term'
    };
    let newState = searchReducer(undefined, action);
    expect(newState).toEqual('search-term');
  });
});
