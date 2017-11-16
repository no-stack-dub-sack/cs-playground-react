export const SELECT_TOPIC = 'SELECT_TOPIC';

export const selectTopic = (id) => {
  return {
    type: SELECT_TOPIC,
    id: id.replace(/_/g, ' ')
  }
}
