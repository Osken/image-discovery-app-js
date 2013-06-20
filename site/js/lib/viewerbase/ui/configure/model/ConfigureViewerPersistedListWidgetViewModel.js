//>>built
define("esriviewer/ui/configure/model/ConfigureViewerPersistedListWidgetViewModel",["dojo/_base/declare","dojo/topic","dojo/Evented"],function(_1,_2,_3){return _1([_3],{ADD_BASEMAP:"addBasemap",ADD_LOCATOR:"addLocator",ADD_REFERENCE_LAYER:"addReferenceLayer",REMOVE_BASE_MAP:"removeBasemap",REMOVE_LOCATOR:"removeLocator",REMOVE_REFERENCE_LAYER:"removeReferenceLayer",constructor:function(){var _4=this;this.showSavedBookmarks=ko.observable(true);this.showSavedLocators=ko.observable(true);this.addedBaseMaps=ko.observableArray();this.addedLocators=ko.observableArray();this.addedReferenceLayers=ko.observableArray();this.removeBasemap=function(_5){if(_5==null){return;}_4.emit(_4.REMOVE_BASE_MAP,_5);_4.addedBaseMaps.remove(_5);};this.removeLocator=function(_6){if(_6==null){return;}_4.emit(_4.REMOVE_LOCATOR,_6);_4.addedLocators.remove(_6);};this.removeReferenceLayer=function(_7){if(_7==null){return;}_4.emit(_4.REMOVE_REFERENCE_LAYER,_7);_4.addedReferenceLayers.remove(_7);};this.addBasemap=function(_8){if(_8==null){return;}_4.emit(_4.ADD_BASEMAP,_8);};this.addLocator=function(_9){if(_9==null){return;}_4.emit(_4.ADD_LOCATOR,_9);};this.addReferenceLayer=function(_a){if(_a==null){return;}_4.emit(_4.ADD_REFERENCE_LAYER,_a);};}});});