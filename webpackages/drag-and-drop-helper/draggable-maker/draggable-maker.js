/* globals draggableMaker_findParentCompound*/
(function () {
  'use strict';
  /**
   * Get help:
   * > polymer Lifecycle callbacks:
   * https://www.polymer-project.org/1.0/docs/devguide/registering-elements.html#lifecycle-callbacks
   * > cubbles lifecycle callback : cubxReady
   *
   */
  CubxPolymer({
    is: 'draggable-maker',

    cubxReady: function () {
      this.initDraggebleElement();
    },

    modelDraggableElementChanged: function (value) {
      this.initDraggebleElement();
    },
    /**
     * init the dragable element :
     *  * find the element to make it draggable
     *  * add the draggable attribute
     *  * add dragstart listener
     *  * add dragend listener
     */
    initDraggebleElement: function () {
      if (typeof this.getDraggableElementSelector() === 'string' && this.getDraggableElementSelector().length > 0) {
        var draggableElement = draggableMaker_findParentCompound(this.root).querySelector(this.getDraggableElementSelector());
        draggableElement.setAttribute('draggable', 'true');
        draggableElement.addEventListener('dragstart', this.handleDragStart);
        draggableElement.addEventListener('dragend', this.handleDragEnd);
      }
    },

    /**
     * drag start handler
     * @param {Event} e drag start event
     * set the runtimeId of the parent compound as dataTransfer data
     * set opacity to 0.4
     */
    handleDragStart: function (e) {
      this.style.opacity = '0.4';
      var parentCompound = draggableMaker_findParentCompound(e.target);
      if (parentCompound) {
        var runtimeId = parentCompound.getAttribute('runtime-id');
        var msie = window.navigator.userAgent.indexOf('MSIE ');       // Detect IE
        var trident = window.navigator.userAgent.indexOf('Trident/'); // Detect IE 11
        var edge = window.navigator.userAgent.indexOf('Edge'); // Detect Edge

        if (msie > 0 || trident > 0 || edge > 0) {
          e.dataTransfer.setData('Text', runtimeId);
        } else {
          e.dataTransfer.setData('runtimeId', runtimeId);
        }
      }
      // var host = e.target.parentNode;
      // console.log('transportable-element:dragstart:host', host);
      e.dataTransfer.effectAllowed = 'move';
    },
    /**
     * Drag end handler
     * set opacity to 1
     * @param {Event} e drag end event
     */
    handleDragEnd: function (e) {
      e.target.style.opacity = '1';
    }

  });
}());
