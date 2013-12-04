//>>built
require({cache:{"url:esriviewer/ui/portal/template/PortalSearchWidgetTemplate.html":"<div>\r\n    <div class=\"searchPortalTabContainer\">\r\n        <span data-bind=\"click:showSearch, css: {selectedTab: searchVisible}\">Search</span>\r\n        <span data-bind=\"click:showResults, css: {selectedTab: resultsVisible}\">Results</span>\r\n\r\n    </div>\r\n\r\n    <div class=\"searchPortalActionsContent\">\r\n        <div data-bind=\"text: portalSearchUrl\" class=\"searchPortalUrlLabel\"></div>\r\n        <div class=\"portalSearchLoginClickContent\" data-bind=\"click:logPortalUserIn, visible: noUserLoggedIn\">\r\n            <div class=\"commonIcons16 lockGo searchPortalAccountLockIcon\">\r\n            </div>\r\n            <span>Log In</span>\r\n        </div>\r\n        <div class=\"portalSearchLoginClickContent\" data-bind=\"click:logPortalUserOut, visible: userLoggedIn\">\r\n            <div class=\"commonIcons16 lockGo searchPortalAccountLockIcon\">\r\n            </div>\r\n            <span>Log Out</span>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"searchPortalContentContainer\">\r\n        <div data-bind=\"visible:searchVisible\" data-dojo-attach-point=\"portalSearchContainer\">\r\n            <div style=\"width: 45%;vertical-align: -3px\" data-dojo-type=\"dijit/form/TextBox\"\r\n                 data-dojo-attach-event=\"onKeyUp: onQueryStringKeyUp\" data-dojo-attach-point=\"portalQueryString\"></div>\r\n            <select data-bind=\"options: portalSearchTypes ,value:selectedPortalSearchType\"></select>\r\n\r\n            <div class=\"searchPortalActions\">\r\n                <div data-dojo-type=\"dijit/form/Button\" data-dojo-attach-event=\"onClick:handlePerformSearch\">Search\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div data-bind=\"visible:resultsVisible\" data-dojo-attach-point=\"portalResultsContainer\">\r\n            <div class=\"searchPortalResultCountContainer\">\r\n                <span>Results: </span>\r\n                <span data-bind=\"text: resultCount\"></span>\r\n            </div>\r\n            <div data-dojo-attach-point=\"portalResultsListContainer\" class=\"portalResultsListContainer\">\r\n\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"}});define("esriviewer/ui/portal/PortalSearchWidget",["dojo/_base/declare","dojo/text!./template/PortalSearchWidgetTemplate.html","dojo/_base/lang","dojo/topic","../base/UITemplatedWidget","./model/PortalSearchWidgetViewModel","./base/PortalResultsListWidget","dijit/form/TextBox","dijit/form/Button","esri/IdentityManager"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a){return _1([_5],{allowLocatorSearch:false,templateString:_2,postCreate:function(){this.inherited(arguments);this.viewModel=new _6();this.viewModel.searchVisible.subscribe(_3.hitch(this,this.handleSearchVisiblilityChanged));this.viewModel.resultsVisible.subscribe(_3.hitch(this,this.handleSearchResultsVisiblilityChanged));if(this.allowLocatorSearch){}ko.applyBindings(this.viewModel,this.domNode);this.handlePortalResponseCallback=_3.hitch(this,this.handlePortalResponse);this.handlePortalResponseErrback=_3.hitch(this,this.handlePortalResponseError);this.manualServiceLoadedSuccessCallback=_3.hitch(this,this.handleManualServiceLoadedCallback);this.manualServiceLoadedErrCallback=_3.hitch(this,this.handleManualServiceLoadErrorCallback);this.createPortalResultsWidget();if(_a!=null&&_a.credentials!=null&&_a.credentials.length>0){this.viewModel.logPortalUserIn();}},handleSearchVisibilityChanged:function(_b){this._handleContentAnimation(_b,this.portalSearchContainer);},handleSearchResultsVisibilityChanged:function(_c){this._handleContentAnimation(_c,this.portalResultsContainer);},initListeners:function(){this.inherited(arguments);_4.subscribe(VIEWER_GLOBALS.EVENTS.PORTAL.LOG_OUT,_3.hitch(this,this.setNoUserLoggedIn));_4.subscribe(VIEWER_GLOBALS.EVENTS.PORTAL.USER_LOGGED_IN,_3.hitch(this,this.setUserLoggedIn));},loadViewerConfigurationData:function(){var _d=null;_4.publish(VIEWER_GLOBALS.EVENTS.CONFIGURATION.GET_ENTRY,"toolsBar",function(_e){_d=_e;});if(_d!=null&&_3.isObject(_d)&&_d.showConfigureLocatorsIcon==true){this.allowLocatorSearch=true;}},setUserLoggedIn:function(_f){if(_f!=null){this.currentPortalUser=_f;var _10=this.currentPortalUser.portal;if(_10!=null&&_3.isObject(_10)){this.viewModel.portalSearchUrl(_10.portalHostname);}this.viewModel.setUserLoggedIn();}else{this.setNoUserLoggedIn();}},setNoUserLoggedIn:function(){this.viewModel.setNoUserLoggedIn();this.currentPortalUser=null;this.viewModel.portalSearchUrl("");},handlePerformSearch:function(){var _11=this.portalQueryString.get("value");if(_11==null||_11==""){return;}this.itemType=this.viewModel.selectedPortalSearchType();if(this.itemType==VIEWER_GLOBALS.AGS_PORTAL_TYPES.MAP_SERVICE){_4.publish(VIEWER_GLOBALS.EVENTS.PORTAL.SEARCH_MAP_SERVICES,_11,null,null,null,this.handlePortalResponseCallback,this.handlePortalResponseErrback);}else{if(this.itemType==VIEWER_GLOBALS.AGS_PORTAL_TYPES.FEATURE_SERVICE){_4.publish(VIEWER_GLOBALS.EVENTS.PORTAL.SEARCH_FEATURE_SERVICES,_11,null,null,null,this.handlePortalResponseCallback,this.handlePortalResponseErrback);}else{if(this.itemType==VIEWER_GLOBALS.AGS_PORTAL_TYPES.IMAGE_SERVICE){_4.publish(VIEWER_GLOBALS.EVENTS.PORTAL.SEARCH_IMAGE_SERVICES,_11,null,null,null,this.handlePortalResponseCallback,this.handlePortalResponseErrback);}else{if(this.itemType==VIEWER_GLOBALS.AGS_PORTAL_TYPES.FEATURE_SERVICE_LAYER){_4.publish(VIEWER_GLOBALS.EVENTS.PORTAL.SEARCH_FEATURE_SERVICE_LAYERS,_11,null,null,null,this.handlePortalResponseCallback,this.handlePortalResponseErrback);}else{if(this.itemType==VIEWER_GLOBALS.AGS_PORTAL_TYPES.GEOCODE_SERVICE){_4.publish(VIEWER_GLOBALS.EVENTS.PORTAL.SEARCH_GEOCODE_SERVICES,_11,null,null,null,this.handlePortalResponseCallback,this.handlePortalResponseErrback);}}}}}},handlePortalResponse:function(_12){this.portalResultsWidget.clearResults();if(_12!=null&&_3.isObject(_12)){this.viewModel.showResults();this.viewModel.resultCount(_12.results.length);if(_12.results!=null&&_3.isArray(_12.results)&&_12.results.length>0){var _13;for(var i=0;i<_12.results.length;i++){_13=_12.results[i];this.portalResultsWidget.addResult({label:_13.title,resultItem:_13});}}}else{VIEWER_UTILS.log("Error Searching Portal",VIEWER_GLOBALS.LOG_TYPE.ERROR);_4.publish(VIEWER_GLOBALS.EVENTS.MESSAGING.SHOW,"Error Searching Portal");}},focusQueryString:function(){this.portalQueryString.focus();},onQueryStringKeyUp:function(e){if(VIEWER_UTILS.isEnterKey(e)){this.handlePerformSearch();}},createPortalResultsWidget:function(){this.portalResultsWidget=new _7();this.portalResultsWidget.placeAt(this.portalResultsListContainer);this.portalResultsWidget.on("addResultToMap",_3.hitch(this,this.handleAddResult));},handleAddResult:function(_14){var _15=VIEWER_UTILS.getServiceTypeFromUrl(_14);if(_15!=null){VIEWER_UTILS.validateUrl(_14).then(_3.hitch(this,function(){if(_15===VIEWER_GLOBALS.SERVICE_TYPES.GEOCODE_SERVER){_4.publish(VIEWER_GLOBALS.EVENTS.LOCATOR.ADD_LOCATOR,_14,this.manualServiceLoadedSuccessCallback,this.manualServiceLoadedErrCallback);}else{_4.publish(VIEWER_GLOBALS.EVENTS.MAP.LAYERS.ADD_FROM_URL,_14,{isOperationalLayer:true,canRemove:true},this.manualServiceLoadedSuccessCallback,this.manualServiceLoadedErrCallback);}}));}},handlePortalResponseError:function(err){if(err!=null&&_3.isString(err)){VIEWER_UTILS.log("Portal Search Error: "+err,VIEWER_GLOBALS.LOG_TYPE.ERROR);_4.publish(VIEWER_GLOBALS.EVENTS.MESSAGING.SHOW,err);}else{VIEWER_UTILS.log("Error Searching Portal",VIEWER_GLOBALS.LOG_TYPE.ERROR);_4.publish(VIEWER_GLOBALS.EVENTS.MESSAGING.SHOW,"Error Searching Portal");}},handleManualServiceLoadedCallback:function(){_4.publish(VIEWER_GLOBALS.EVENTS.MESSAGING.SHOW,"Service Added");VIEWER_UTILS.log("Layer Added",VIEWER_GLOBALS.LOG_TYPE.INFO);},handleManualServiceLoadErrorCallback:function(err){if(err!=null){if(_3.isObject(err)){if(err.message){var msg="Could not add service: "+err.message;_4.publish(VIEWER_GLOBALS.EVENTS.MESSAGING.SHOW,msg);VIEWER_UTILS.log(msg,VIEWER_GLOBALS.LOG_TYPE.ERROR);}}}var x="";},reset:function(){this.viewModel.showSearch();}});});