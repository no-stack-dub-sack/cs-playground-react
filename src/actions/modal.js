export const OPEN_RESOURCES_MODAL = 'OPEN_RESOURCES_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const openResourcesModal = (id) => {
  return {
    type: OPEN_RESOURCES_MODAL,
    id: id.replace(/_/g, ' ')
  }
};

export const closeModal = () => {
  return {
    type: CLOSE_MODAL
  }
};
