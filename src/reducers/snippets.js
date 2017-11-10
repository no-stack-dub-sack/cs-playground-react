import SnippetList from '../assets/codeRef';
import {
  NEXT_SNIPPET,
  PREVIOUS_SNIPPET,
  SELECT_SNIPPET,
  SELECT_SOLUTION,
} from '../actions/editor';

const firstNode = SnippetList.fetchNode('Quicksort');

const initialState = {
  id:   firstNode.id,
  code: firstNode.seed,
  prev: firstNode.prev.id,
  next: firstNode.next.id
}

const snippets = (state = initialState, action) => {
  switch(action.type) {
    case SELECT_SOLUTION: {
      const id = action.id.slice(2);
      const node = SnippetList.fetchNode(id);
      return {
        id:   node.id,
        code: node.solution,
        prev: node.prev.id,
        next: node.next.id
      };
    }
    case SELECT_SNIPPET: {
      const node = SnippetList.fetchNode(action.id);
      return {
        id:   node.id,
        code: node.seed,
        prev: node.prev.id,
        next: node.next.id
      };
    }
    case NEXT_SNIPPET: {
      const node = SnippetList.fetchNode(state.next);
      return {
        id:   node.id,
        code: node.seed,
        prev: node.prev.id,
        next: node.next.id
      };
    }
    case PREVIOUS_SNIPPET: {
      const node = SnippetList.fetchNode(state.prev);
      return {
        id:   node.id,
        code: node.seed,
        prev: node.prev.id,
        next: node.next.id
      };
    }
    default:
      return state;
  }
}

export default snippets;
