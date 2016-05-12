/* exported draggableMaker_findParentCompound */
'use strict';
/* eslint-disable no-unused-vars*/
function draggableMaker_findParentCompound (element) {
  /* eslint-enable no-unused-vars*/
  if (element.parentNode.hasAttribute('cubx-core-crc')) {
    return null;
  }
  if (element.parentNode.isCompoundComponent) {
    return element.parentNode;
  } else {
    return draggableMaker_findParentCompound(element.parentNode);
  }
}
