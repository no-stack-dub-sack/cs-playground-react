import SnippetList from '../assets/codeRef';
import {
  NEXT_SNIPPET,
  PREVIOUS_SNIPPET,
  SELECT_SNIPPET,
  SELECT_SOLUTION,
  UPDATE_CODE
} from '../actions/code';

const getSimpleState = (node) => ({
  id: node.id,
  code: node.seed,
  isSolution: false,
  prev: node.prev.id,
  next: node.next.id
});

const firstNode = SnippetList.fetchNode('Quicksort');
const defaultState = getSimpleState(firstNode);

export default (state = defaultState, action) => {
  switch(action.type) {
    case UPDATE_CODE:
      return {
        ...state,
        code: action.code
      };
    case SELECT_SOLUTION: {
      const node = SnippetList.fetchNode(action.id);
      return {
        ...state,
        code: node.solution,
        isSolution: true
      };
    }
    case SELECT_SNIPPET: {
      const node = SnippetList.fetchNode(action.id);
      return getSimpleState(node);
    }
    case NEXT_SNIPPET: {
      const node = SnippetList.fetchNode(state.next);
      return getSimpleState(node);
    }
    case PREVIOUS_SNIPPET: {
      const node = SnippetList.fetchNode(state.prev);
      return getSimpleState(node);
    }
    default:
      return state;
  }
}
