//>>built
require({cache:{"url:esriviewer/ui/social/base/twitter/template/TwitterWidgetTemplate.html":"<div>\r\n    <div class=\"socialMediaDescriptionLabel\">Search Twitter for tweets</div>\r\n    <div class=\"socialMediaSearchEntry\">\r\n        <div class=\"socialMediaSearchEntryLabel\">Use this keyword:</div>\r\n        <input type=\"text\" data-bind=\"value:searchTerm, valueUpdate: 'afterkeydown',  event:{keyup:checkForSearchEnter}\"/>\r\n    </div>\r\n    <div class=\"socialMediaSearchEntry\">\r\n        <div class=\"socialMediaSearchEntryLabel\">At this location:</div>\r\n        <span class=\"socialMediaLocationDisplayContainer\">\r\n            <span>\r\n            <span>lon:</span>\r\n            <span data-bind=\"text:searchLocationLon\"></span>\r\n                </span>\r\n                <span>\r\n                    <span>lat:</span>\r\n                    <span data-bind=\"text:searchLocationLat\"></span>\r\n                </span>\r\n        </span>\r\n    </div>\r\n    <div class=\"socialMediaSearchEntry\">\r\n        <div class=\"socialMediaSearchEntry socialMediaSearchDistanceEntryContainer\">\r\n            <div class=\"socialMediaSearchEntryLabel\">Within this distance:</div>\r\n            <div data-dojo-attach-point=\"distanceSliderContainer\" class=\"socialMediaDistanceSliderContainer\">\r\n\r\n            </div>\r\n            <span data-bind=\"text:searchDistance\"></span>\r\n            <span>km</span>\r\n        </div>\r\n        <div class=\"socialMediaSearchEntry\">\r\n            <div class=\"socialMediaSearchEntryLabel\">From the past:</div>\r\n            <select data-bind=\"options: dateEntries ,value:selectedDateEntry, optionsText: 'label', optionsValue: 'value'\"></select>\r\n        </div>\r\n        <div class=\"socialMediaSearchButtonsContainer\">\r\n            <button class=\"dijitButtonNode\"  data-bind=\"click:handleClear\">Clear</button>\r\n            <button class=\"dijitButtonNode\" data-bind=\"click:handleSearch\">Search</button>\r\n        </div>\r\n    </div>\r\n</div>"}});define("esriviewer/ui/social/base/twitter/TwitterWidget",["dojo/_base/declare","dojo/_base/lang","dojo/dom-construct","dojo/topic","dojo/date/locale","dojo/text!./template/TwitterWidgetTemplate.html","../socialmediabase/BaseSocialMediaSearchWidget","../../../../base/DataLoaderSupport","./model/TwitterWidgetViewModel","esri/geometry/Point","esri/symbols/PictureMarkerSymbol","esri/graphic","esri/InfoTemplate","esri/SpatialReference"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e){return _1([_7,_8],{twitterAPIGeoTypePoint:"Point",templateString:_6,apiDateFormat:"yyyy-MM-dd",currentPage:1,constructor:function(){this.searchResultGraphics=[];},postCreate:function(){this.inherited(arguments);this.searchResponseCallback=_2.hitch(this,this.handleSearchResponse);this.searchResponsErrorback=_2.hitch(this,this.handleSearchError);this.viewModel=new _9();this.viewModel.on(this.viewModel.SEARCH,_2.hitch(this,this.handleSearch));this.viewModel.on(this.viewModel.CLEAR,_2.hitch(this,this.handleClearSearch));this.viewModel.searchTerm(this.defaultSearchKeyword);ko.applyBindings(this.viewModel,this.domNode);},handleClearSearch:function(){this.currentPage=1;this.clearResultGraphics();},clearResultGraphics:function(){for(var i=0;i<this.searchResultGraphics.length;i++){this.onRemoveGraphic(this.searchResultGraphics[i]);}this.searchResultGraphics=[];},handleSearch:function(){this.handleClearSearch();var _f=this.getSearchParameters();_2.mixin(_f,this.defaultAPIUrlValues||{});this.loadJsonP(this.apiUrl,_f,this.searchResponseCallback,this.searchResponsErrorback,this.callbackParameterName);},handleSearchResponse:function(_10){if(_10==null||_10.error!=null){this.handleSearchError();return;}if(_10.results&&_10.results.length>0){var _11;var _12=[];var i;for(i=0;i<_10.results.length;i++){_11=_10.results[i];if(_11.geo!=null&&_11.geo.type===this.twitterAPIGeoTypePoint&&_11.geo.coordinates!=null&&_11.geo.coordinates.length==2){_12.push(_11);}}if(_12.length>0){_4.publish(VIEWER_GLOBALS.EVENTS.MESSAGING.SHOW,"Search Result Count: "+_12.length);var _13;var _14;for(i=0;i<_12.length;i++){_13=_12[i];_14=_13.geo.coordinates;var _15=new _a(_14[1],_14[0],new _e({wkid:PROJECTION_UTILS.WGS_84_WKID}));var _16=_b(this.mapIcon.url,this.mapIcon.width,this.mapIcon.height);var _17=new _c(_15,_16);_17.setInfoTemplate(this.getInfoTemplate(_13));this.searchResultGraphics.push(_17);}PROJECTION_UTILS.graphicsToMapSpatialReference(this.searchResultGraphics);for(i=0;i<this.searchResultGraphics.length;i++){this.onAddGraphic(this.searchResultGraphics[i]);}}else{_4.publish(VIEWER_GLOBALS.EVENTS.MESSAGING.SHOW,"No geo-tagged results returned");}}else{_4.publish(VIEWER_GLOBALS.EVENTS.MESSAGING.SHOW,"No results were returned");}},handleSearchError:function(){_4.publish(VIEWER_GLOBALS.EVENTS.MESSAGING.SHOW,"There was an error searching Twitter");},getSearchParameters:function(){var _18=this.inherited(arguments);var _19=this.viewModel.searchTerm();if(_19){var _1a=this.viewModel.selectedDateEntry();var _1b=new Date();_1b.setDate(_1b.getDate()-parseInt(_1a,10));_18[this.apiParameterNames.keyword]=_19+" since:"+this._formatDateForAPIQuery(_1b);}var _1c=this.viewModel.getSearchPoint();if(_1c&&_1c.x!=null&&_1c.y!=null){var _1d=_1c.y+","+_1c.x;var _1e=this.viewModel.searchDistance();if(_1e!=null){_1d+=","+_1e+this._searchUnits;}_18[this.apiParameterNames.coordindatesAndRadius]=_1d;}_18[this.apiParameterNames.page]=this.currentPage++;_18[this.apiParameterNames.resultsPerPage]=this.resultsPerPage;return _18;},_formatDateForAPIQuery:function(_1f){return _5.format(_1f,{selector:"date",datePattern:this.apiDateFormat});},getInfoTemplate:function(_20){var _21=new _d();_21.setTitle(_20.from_user);var _22=_3.create("div");var _23=_3.create("img",{src:_20.profile_image_url});_3.place(_23,_22);var _24=_3.create("span",{innerHTML:_20.text});_3.place(_24,_22);_21.setContent(_22.innerHTML);return _21;},onRemoveGraphic:function(_25){},onAddGraphic:function(_26){}});});