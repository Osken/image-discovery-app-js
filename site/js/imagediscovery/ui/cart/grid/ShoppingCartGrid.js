define([
    "dojo/_base/declare",
    "dojo/topic",
    "dojo/_base/lang",
    "dojo/dom-construct",
    "dojo/dom-class",
    "dojo/store/Observable",
    "dojo/store/Memory",
    "dijit/form/Button",
    "../../base/grid/ImageryGrid"
],
    function (declare, topic, lang, domConstruct, domClass, Observable, Memory, Button, ImageryBaseGrid) {
        return declare(
            [ImageryBaseGrid],
            {
                constructor: function () {
                },
                initListeners: function () {
                    this.inherited(arguments);
                    //listen for adding result to the shopping cart
                    topic.subscribe(IMAGERY_GLOBALS.EVENTS.CART.ADD_TO, lang.hitch(this, this.handleAddResultToCart));
                    //listen for removing item from the cart
                    topic.subscribe(IMAGERY_GLOBALS.EVENTS.CART.REMOVE_FROM_CART, lang.hitch(this, this.removeItemFromCart));
                    //listen for request of object ids in the cart
                    topic.subscribe(IMAGERY_GLOBALS.EVENTS.CART.GET_ADDED_OBJECT_IDS, lang.hitch(this, this.getAddedCartItemIds));
                },
                /**
                 * adds an item to the shopping cart grid
                 * @param item
                 */
                handleAddResultToCart: function (item) {
                    //get to the attributes of the results
                    //add the item to the cart store
                    this.store.add(item);
                },
                /**
                 * removes an item from the shopping cart
                 * @param resultId id of the item to remove
                 */
                removeItemFromCart: function (resultId) {
                    this.store.remove(resultId);
                },
                /**
                 * generates the columns to add to the shopping cart grid
                 * @return {Array}
                 */
                generateManipulationColumns: function () {
                    var parentColumns = this.inherited(arguments);
                    var columns = [
                        {
                            field: "addedToCart",
                            label: " ",
                            sortable: false,
                            renderCell: lang.hitch(this, this.cartIconFormatter),
                            unhidable: true
                        }
                    ];
                    for (var i = 0; i < parentColumns.length; i++) {
                        columns.push(parentColumns[i]);
                    }
                    return columns;
                },
                /**
                 * formats the shopping cart column of the shopping cart grid
                 * @param object
                 * @param value
                 * @param node
                 * @param option
                 */

                cartIconFormatter: function (object, value, node, option) {
                    //returns a button for removing item from the cart
                    var cartButton = new Button({iconClass: "resultGridCartIcon commonIcons16 shoppingCartAdded", title: "Remove From Cart"});
                    cartButton.on("click", lang.hitch(this, this.handleRemoveCartItemClick, object));
                    domClass.add(cartButton.domNode, "queryResultShoppingCartButton");
                    domConstruct.place(cartButton.domNode, node);
                },
                /**
                 * fired when the shopping cart column button has been pressed. removes the row from the grid
                 * @param item
                 */
                handleRemoveCartItemClick: function (item) {
                    //handle removing item from the shopping cart
                    if (item.showFootprint) {
                        //hide the footprint since it is visible
                        topic.publish(IMAGERY_GLOBALS.EVENTS.LAYER.HIDE_FOOTPRINT, item);
                    }
                    var itemId = item[this.storeIdField];
                    this.removeItemFromCart(itemId);
                    //fire event alerting other classes that an item has been removed from the cart
                    topic.publish(IMAGERY_GLOBALS.EVENTS.CART.REMOVED_FROM_CART, itemId, item);
                    this.setSelectedThumbnails();
                },
                /**
                 * returns all item ids for items in the shopping cart
                 * @param callback
                 * @return {*}
                 */
                getAddedCartItemIds: function (callback) {
                    if (callback != null && lang.isFunction(callback)) {
                        callback(this.getVisibleContentObjectIdArray());
                        return null;
                    }
                    else {
                        return this.getVisibleContentObjectIdArray();
                    }
                }
            });
    });