import SnippetList from '../assets/codeRef';

const firstNode = SnippetList.fetchNode('Quicksort');

const initialState = {
  id:   firstNode.id,
  code: firstNode.code,
  prev: firstNode.prev.id,
  next: firstNode.next.id
}

const snippets = (state = initialState, action) => {
  switch(action.type) {
    case 'SELECT_SNIPPET': {
      const node = SnippetList.fetchNode(action.id);
      return {
        id:   node.id,
        code: node.code,
        prev: node.prev.id,
        next: node.next.id
      };
    }
    case 'NEXT_SNIPPET': {
      const node = SnippetList.fetchNode(state.next);
      return {
        id:   node.id,
        code: node.code,
        prev: node.prev.id,
        next: node.next.id
      };
    }
    case 'PREVIOUS_SNIPPET': {
      const node = SnippetList.fetchNode(state.prev);
      return {
        id:   node.id,
        code: node.code,
        prev: node.prev.id,
        next: node.next.id
      };
    }
    default:
      return state;
  }
}

export default snippets;
