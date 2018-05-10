export const getMultipleSelectedInputValues = node => {
  try {
    return []
      .slice
      .call(node.getElementsByTagName('option'))
      .map(option => option.selected ? option.getAttribute('value') : null)
      .filter((option) => option !== null);
  } catch (err) {
    console.log('error', err);
    return [];
  }
};