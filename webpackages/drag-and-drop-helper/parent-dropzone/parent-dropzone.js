/*globals elementFindByAttributeValue*/
(function () {
  'use strict';
  /**
   * Get help:
   * > Lifecycle callbacks:
   * https://www.polymer-project.org/1.0/docs/devguide/registering-elements.html#lifecycle-callbacks
   * > Cubbbles Lifecycle method: cubxReady
   */
  CubxPolymer({
    is: 'parent-dropzone',

    /**
     * Manipulate an element’s local DOM when the cubbles framework is initialized and ready to work.
     */
    cubxReady: function () {
      var parentElem = draggableMaker_findParentCompound(this.root)
      if (parentElem) {
        this.makeParentCompoundToDropzone(parentElem, this);
      }
    },
    /**
     * Make the parent compound element to Dropzone
     * @param parentElem
     * @param elem
     */
    makeParentCompoundToDropzone: function (parentElem, elem) {
      // console.log('makeToDropzone', parentElem);
      parentElem.handleDragEnter = function (e) {
        if (e.target === parentElem) {
          if (parentElem.classList.contains('layer_not_over')) {
            parentElem.classList.remove('layer_not_over');
          }
          parentElem.classList.add('layer_over');
        }
      };
      parentElem.handleDragOver = function (e) {
        // console.log('dynamic-connection-compound:dragover', e.target);
        if (e.preventDefault) {
          e.preventDefault(); // Necessary. Allows us to drop.
        }
        e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
        return false;
      };
      parentElem.handleDragLeave = function (e) {
        if (e.target === parentElem) {
          if (parentElem.classList.contains('layer_over')) {
            parentElem.classList.remove('layer_over');
          }
          parentElem.classList.add('layer_not_over');  // this / e.target is previous target element.
        }
      };
      parentElem.handleDragEnd = function (e) {
        if (parentElem.classList.contains('layer_over')) {
          parentElem.classList.remove('layer_over');
        }
        parentElem.classList.add('layer_not_over');  // this / e.target is previous target element.
      };
      parentElem.handleDrop = function (e) {
        if (e.stopPropagation) {
          e.stopPropagation(); // stops the browser from redirecting.
          var msie = window.navigator.userAgent.indexOf('MSIE ');       // Detect IE
          var trident = window.navigator.userAgent.indexOf('Trident/'); // Detect IE 11
          var edge = window.navigator.userAgent.indexOf('Edge'); // Detect Edge
          var runtimeId;
          if (msie > 0 || trident > 0 || edge > 0) {
            runtimeId = e.dataTransfer.getData('Text');
          } else {
            runtimeId = e.dataTransfer.getData('runtimeId');
          }
          if (!runtimeId) {
            console.log('Dragged element runtimeId not found');
            return;
          }
          var me = e.target;

          var draggedEl = elementFindByAttributeValue('runtime-id', runtimeId);
          // console.log('me.contains(draggedEl)', me.contains(draggedEl));
          // console.log('host',host);

          var childElem = me.lastElementChild;
          while (childElem !== me.firstElementChild && childElem.tagName !== draggedEl.tagName) {
            childElem = childElem.previousElementSibling;
          }
          parentElem.removeConnections();
          var defs = elem.getConnectionDef();
          if (typeof defs === 'object' && defs instanceof Array) {
            defs.forEach(function (item) {
              elem.createConnection(draggedEl, parentElem, item);
            });
          }
        }
        return false;
      };
      parentElem.removeConnections = function () {
        var defs = elem.getConnectionDef();
        if (typeof defs === 'object' && defs instanceof Array) {
          defs.forEach(function (item) {
            if (parentElem[ item.name ]) {
              parentElem.removeDynamicConnection(parentElem[ item.name ]);
              delete parentElem[ item.name ];
            }
          });
        }

        if (parentElem.stateSlotConnectedWithId) {
          parentElem.removeDynamicConnection(parentElem.stateSlotConnectedWithId);
          delete parentElem.stateSlotConnectedWithId;
        }
      };
      parentElem.addEventListener('dragenter', parentElem.handleDragEnter);
      parentElem.addEventListener('dragover', parentElem.handleDragOver);
      parentElem.addEventListener('dragleave', parentElem.handleDragLeave);
      parentElem.addEventListener('dragend', parentElem.handleDragEnd);
      parentElem.addEventListener('drop', parentElem.handleDrop);
    },
    createConnection: function (source, target, def) {
      var dynamicConnection = new window.cubx.cif.DynamicConnection();
      dynamicConnection.setSourceRuntimeId(source.getAttribute('runtime-id'));
      dynamicConnection.setSourceSlot(def.source);
      dynamicConnection.setDestinationRuntimeId(target.getAttribute('runtime-id'));
      dynamicConnection.setDestinationSlot(def.destination);
      dynamicConnection.setRepeatedValues(true);
      dynamicConnection.setDirectExecution(true);
      var connectionId = source.addDynamicConnection(dynamicConnection);
      target[ def.name ] = connectionId;
    }
  });
}());
