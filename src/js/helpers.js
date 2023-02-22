/**
 * @param {Node} parentItem
 * @description Delete all content of parent item which entered as parameter.
 */
export const clear = function (parentItem) {
  while (parentItem.hasChildNodes()) parentItem.removeChild(parentItem.firstChild);
};

/**
 * @param {Node} element The parent element whose content will be filled
 * @param {string} action String to be added to parent element
 */
export const insert = function (element, action) {
  element.insertAdjacentHTML('beforeend', action);
};
