import SnippetList from '../assets/codeRef';
import { SELECT_TOPIC } from '../actions/resources';

export default (state = [], action) => {
  switch (action.type) {
    case SELECT_TOPIC:
      const node = SnippetList.fetchNode(action.id);
      return [
        ...node.resources
      ];
    default:
      return state;
  }
};
