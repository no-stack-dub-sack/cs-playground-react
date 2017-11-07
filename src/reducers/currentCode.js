import Quicksort from '../assets/seed/algorithms/Quicksort';

const initialState = {
  code: Quicksort,
  original: true
};

const currentCode = (state = initialState, action) => {
  switch(action.type) {
    case 'UPDATE_CODE':
      return {
        code: action.code,
        original: action.mod
      };
    default:
      return state;
  }
}

export default currentCode;
