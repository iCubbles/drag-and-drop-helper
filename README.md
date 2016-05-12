# drag-and-drop-helper

This components help to develop applications, which can create connections dynamically by drag and drop.

## parent-dropzone
This Cubble make the parent compound component to a drop zone. When an item is dropped on the parent compound, will new dynamic connections created. The created connections properties are  defined in the slot "connectionDef".</p>
The new connections will established between the following elements:

* source element - parent compound element
* destination element - the element, which runtimeId attribute was transported by the drag event

The destination and source elements should be sibling elements.

The connectionDef slot should be an array of definition objects. A definition object should define the following 3 properties:

* name - this property defined the connectionId
* source - this property defined the source slotId
* destination - this property defined the destination slotId


## draggable-maker

This Cubble make a child element of a sibling member content draggable and should be used in a compound component.

The ` draggableElementSelector` slot defines the CSS selector of the element , which is to be draggable.
The selector will on the context of the (parent) compound component performed.
By dragging the element will the runtimeId of the parent compound component as data transported.</li>
</ul>

Examples
[Car registration demo](https://www.cubbles.world/sandbox/com.incowia.examples.car-registration-statistics@0.4.0/car-registration-statistics/index.html) - [sources](https://github.com/iCubbles/car-registration-statistics.git)
[transportation means co2 example](https://www.cubbles.world/sandbox/transportation-co2@0.4.0/transportation-means-co2-scenario/demo/index.html) -[sources](https://github.com/iCubbles/transportation-means-co2-example.git)
