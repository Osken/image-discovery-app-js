//>>built
require({cache:{"url:esriviewer/ui/social/base/youtube/template/YoutubeWidgetTemplate.html":"<div>\r\n    <div class=\"socialMediaDescriptionLabel\">Search YouTube for videos</div>\r\n    <div class=\"socialMediaSearchEntry\">\r\n        <div class=\"socialMediaSearchEntryLabel\">Use this keyword:</div>\r\n        <input type=\"text\" data-bind=\"value:searchTerm, valueUpdate: 'afterkeydown',  event:{keyup:checkForSearchEnter}\"/>\r\n    </div>\r\n    <div class=\"socialMediaSearchEntry\">\r\n        <div class=\"socialMediaSearchEntryLabel\">At this location:</div>\r\n        <span class=\"socialMediaLocationDisplayContainer\">\r\n            <span>\r\n                <span>lon:</span>\r\n                <span data-bind=\"text:searchLocationLon\"></span>\r\n            </span>\r\n            <span>\r\n                <span>lat:</span>\r\n                <span data-bind=\"text:searchLocationLat\"></span>\r\n            </span>\r\n        </span>\r\n\r\n    </div>\r\n    <div class=\"socialMediaSearchEntry socialMediaSearchDistanceEntryContainer\">\r\n        <div class=\"socialMediaSearchEntryLabel\">Within this distance:</div>\r\n        <div data-dojo-attach-point=\"distanceSliderContainer\" class=\"socialMediaDistanceSliderContainer\">\r\n\r\n        </div>\r\n        <span data-bind=\"text:searchDistance\"></span>\r\n        <span>km</span>\r\n    </div>\r\n    <div class=\"socialMediaSearchEntry\">\r\n        <div class=\"socialMediaSearchEntryLabel\">From the past:</div>\r\n        <select data-bind=\"options: dateEntries ,value:selectedDateEntry, optionsText: 'label', optionsValue: 'value'\"></select>\r\n    </div>\r\n    <div class=\"socialMediaSearchButtonsContainer\">\r\n        <button class=\"dijitButtonNode\" data-bind=\"click:handleClear\">Clear</button>\r\n        <button class=\"dijitButtonNode\" data-bind=\"click:handleSearch\">Search</button>\r\n    </div>\r\n</div>"}});define("esriviewer/ui/social/base/youtube/YoutubeWidget",["dojo/_base/declare","dojo/_base/lang","dojo/on","dojo/topic","dojo/dom-construct","dojo/text!./template/YoutubeWidgetTemplate.html","../../../../base/DataLoaderSupport","../socialmediabase/BaseSocialMediaSearchWidget","./model/YoutubeWidgetViewModel","esri/geometry/Point","esri/symbols/PictureMarkerSymbol","esri/graphic","esri/InfoTemplate","esri/SpatialReference"],function(_1,_2,on,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d){return _1([_7,_6],{templateString:_5,currentSearchIndex:1,constructor:function(){this.searchResultGraphics=[];},postCreate:function(){this.inherited(arguments);this.searchResponseCallback=_2.hitch(this,this.handleSearchResponse);this.searchResponsErrorback=_2.hitch(this,this.handleSearchError);this.viewModel=new _8();this.viewModel.on(this.viewModel.SEARCH,_2.hitch(this,this.handleSearch));this.viewModel.on(this.viewModel.CLEAR,_2.hitch(this,this.handleClearSearch));this.viewModel.searchTerm(this.defaultSearchKeyword);ko.applyBindings(this.viewModel,this.domNode);},handleClearSearch:function(){this.currentSearchIndex=1;this.clearResultGraphics();},clearResultGraphics:function(){for(var i=0;i<this.searchResultGraphics.length;i++){this.onRemoveGraphic(this.searchResultGraphics[i]);}this.searchResultGraphics=[];},handleSearch:function(){this.handleClearSearch();var _e=this.getSearchParameters();_2.mixin(_e,this.defaultAPIUrlValues||{});this.loadJsonP(this.apiUrl,_e,this.searchResponseCallback,this.searchResponsErrorback,this.callbackParameterName);},handleSearchResponse:function(_f){if(_f==null||_f.error!=null){this.handleSearchError();return;}if(_f.feed&&_f.feed.entry&&_2.isArray(_f.feed.entry)&&_f.feed.entry.length>0){var _10;var _11=[];var i;for(i=0;i<_f.feed.entry.length;i++){_10=_f.feed.entry[i];if(_10.georss$where!=null&&_10.georss$where.gml$Point&&_10.georss$where.gml$Point.gml$pos&&_10.georss$where.gml$Point.gml$pos.$t){_11.push(_10);}}if(_11.length>0){_3.publish(VIEWER_GLOBALS.EVENTS.MESSAGING.SHOW,"Search Result Count: "+_11.length);var _12;var _13;var _14;for(i=0;i<_11.length;i++){_12=_11[i];_14=_12.georss$where;_13=_14.gml$Point.gml$pos.$t.split(" ");var _15=new _9(_13[1],_13[0],new _d({wkid:PROJECTION_UTILS.WGS_84_WKID}));var _16=_a(this.mapIcon.url,this.mapIcon.width,this.mapIcon.height);var _17=new _b(_15,_16);_17.setInfoTemplate(this.getInfoTemplate(_12));this.searchResultGraphics.push(_17);}PROJECTION_UTILS.graphicsToMapSpatialReference(this.searchResultGraphics);for(i=0;i<this.searchResultGraphics.length;i++){this.onAddGraphic(this.searchResultGraphics[i]);}}else{_3.publish(VIEWER_GLOBALS.EVENTS.MESSAGING.SHOW,"No geo-tagged results returned");}}else{_3.publish(VIEWER_GLOBALS.EVENTS.MESSAGING.SHOW,"No results were returned");}},handleSearchError:function(){_3.publish(VIEWER_GLOBALS.EVENTS.MESSAGING.SHOW,"There was an error searching YouTube");},getSearchParameters:function(){var _18=this.inherited(arguments);var _19=this.viewModel.searchTerm();if(_19){_18[this.apiParameterNames.keyword]=_19;}var _1a=this.viewModel.getSearchPoint();if(_1a&&_1a.x!=null&&_1a.y!=null){_18[this.apiParameterNames.coordindates]=_1a.y+","+_1a.x;}var _1b=this.viewModel.searchDistance();if(_1b!=null){_18[this.apiParameterNames.searchRadius]=_1b+this._searchUnits;}_18[this.apiParameterNames.fromDay]=this.viewModel.selectedDateEntry();_18[this.apiParameterNames.startIndex]=this.currentSearchIndex;_18[this.apiParameterNames.maxResults]=this.resultsPerPage;return _18;},getInfoTemplate:function(_1c){var _1d=new _c();_1d.setTitle(_1c.title.$t);var _1e=_4.create("div");var i;var _1f=[];for(i=0;i<_1c.author.length;i++){_1f.push(_1c.author[i].name.$t);}if(_1f.length>0){var _20=_4.create("div",{innerHTML:_1f.join(" , ")});_4.place(_20,_1e);}var _21=_1c.content&&_1c.content.src?_1c.content.src:null;if(_1c.media$group&&_1c.media$group.media$thumbnail&&_1c.media$group.media$thumbnail.length>0){var _22=_1c.media$group.media$thumbnail[0];var _23=_4.create("img",{title:"Click to play video",onclick:"window.open('"+_21+"')",src:_22.url,style:{cursor:"pointer"}});_4.place(_23,_1e);}_1d.setContent(_1e.innerHTML);return _1d;},onRemoveGraphic:function(_24){},onAddGraphic:function(_25){}});});