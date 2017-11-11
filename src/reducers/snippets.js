import SnippetList from '../assets/codeRef';
import {
  NEXT_SNIPPET,
  PREVIOUS_SNIPPET,
  SELECT_SNIPPET,
  SELECT_SOLUTION,
  UPDATE_CODE
} from '../actions/editor';

const firstNode = SnippetList.fetchNode('Quicksort');

const initialState = {
  id:   firstNode.id,
  code: firstNode.seed,
  prev: firstNode.prev.id,
  next: firstNode.next.id,
  isSolution: false
}

const snippets = (state = initialState, action) => {
  switch(action.type) {
    case UPDATE_CODE:
      return {
        ...state,
        code: action.code
      };
    case SELECT_SOLUTION: {
      const id = action.id.slice(2);
      const node = SnippetList.fetchNode(id);
      return {
        ...state,
        code: node.solution,
        isSolution: true
      };
    }
    case SELECT_SNIPPET: {
      const node = SnippetList.fetchNode(action.id);
      return {
        id:   node.id,
        code: node.seed,
        prev: node.prev.id,
        next: node.next.id,
        isSolution: false
      };
    }
    case NEXT_SNIPPET: {
      const node = SnippetList.fetchNode(state.next);
      return {
        id:   node.id,
        code: node.seed,
        prev: node.prev.id,
        next: node.next.id,
        isSolution: false
      };
    }
    case PREVIOUS_SNIPPET: {
      const node = SnippetList.fetchNode(state.prev);
      return {
        id:   node.id,
        code: node.seed,
        prev: node.prev.id,
        next: node.next.id,
        isSolution: false
      };
    }
    default:
      return state;
  }
}

export default snippets;
