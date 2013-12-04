//>>built
require({cache:{"url:esriviewer/ui/logging/template/LoggingWidgetTemplate.html":"<div class=\"loggingWidgetContainer\">\r\n    <div class=\"windowActions\">\r\n        <div class=\"loggingWidgetActionContainerToggleEntry\">\r\n            <div class=\"commonIcons16 information loggingWidgetActionDisplayToggleIcon\"></div>\r\n            <input type=\"checkbox\" data-bind=\"checked:infoDisplayed\"\r\n                   title=\"Toggle Info Messages\"\r\n                   class=\"loggingWidgetActionDisplayCheckbox\"/>\r\n        </div>\r\n        <div class=\"loggingWidgetActionContainerToggleEntry\">\r\n            <div class=\"commonIcons16 warning loggingWidgetActionDisplayToggleIcon\"></div>\r\n            <input type=\"checkbox\" data-bind=\"checked:warningDisplayed\"\r\n                   title=\"Toggle Warning Messages\"\r\n                   class=\"loggingWidgetActionDisplayCheckbox\"/>\r\n        </div>\r\n        <div class=\"loggingWidgetActionContainerToggleEntry\">\r\n            <div class=\"commonIcons16 error loggingWidgetActionDisplayToggleIcon\"></div>\r\n            <input type=\"checkbox\" data-bind=\"checked:errorDisplayed\"\r\n                   title=\"Toggle Error Messages\"\r\n                   class=\"loggingWidgetActionDisplayCheckbox\"/>\r\n\r\n        </div>\r\n        <div class=\"commonIcons16 deleteCross loggingWidgetActionClearIcon\" data-bind=\"visible: hasLogEntries\"\r\n             data-dojo-attach-point=\"clearLogIcon\"\r\n             data-dojo-attach-event=\"onclick: _showConfirmLogTooltip\"></div>\r\n    </div>\r\n    <ul class=\"loggingWidgetEntryList\"\r\n        data-bind=\"foreach: filteredEntries\">\r\n        <li class=\"loggingInfoMessage\" data-bind=\"css: $data.messageStyleClass\">\r\n            <span class=\"loggingMessageTimestamp\"><span>(</span><span\r\n                data-bind=\"text: $data.time\"></span><span>)</span></span>\r\n            <div class=\"loggingWidgetTypeIcon commonIcons16\" data-bind=\"css: $data.iconClass\" style=\"cursor: default\"></div>\r\n            <span class=\"loggingMessageText\" data-bind=\"text:$data.message\"></span>\r\n        </li>\r\n    </ul>\r\n</div>"}});define("esriviewer/ui/logging/LoggingWidget",["dojo/_base/declare","dojo/text!./template/LoggingWidgetTemplate.html","dojo/topic","../base/UITemplatedWidget","dojo/_base/lang","../tooltip/ConfirmTooltip","./model/LoggingViewModel"],function(_1,_2,_3,_4,_5,_6,_7){return _1([_4],{templateString:_2,initListeners:function(){this.inherited(arguments);this.subscribes.push(_3.subscribe(VIEWER_GLOBALS.EVENTS.LOGGING.ADD,_5.hitch(this,this._addLogging)));this.subscribes.push(_3.subscribe(VIEWER_GLOBALS.EVENTS.LOGGING.CLEAR,_5.hitch(this,this._clearLogging)));},postCreate:function(){this.inherited(arguments);this.viewModel=new _7();ko.applyBindings(this.viewModel,this.domNode);},_addLogging:function(_8,_9){if(_9!=null&&_9!=""){_9=_9.toLowerCase();}if(_9===VIEWER_GLOBALS.LOG_TYPE.WARNING){this._createWarningMessage(_8);}else{if(_9===VIEWER_GLOBALS.LOG_TYPE.ERROR){this._createErrorMessage(_8);}else{this._createInfoMessage(_8);}}},_createErrorMessage:function(_a){this._createMessage(_a,"commonIcons16 error","loggingErrorMessage",VIEWER_GLOBALS.LOG_TYPE.ERROR);},_createInfoMessage:function(_b){this._createMessage(_b,"commonIcons16 information","loggingInfoMessage",VIEWER_GLOBALS.LOG_TYPE.INFO);},_createWarningMessage:function(_c){this._createMessage(_c,"commonIcons16 warning","loggingWarningMessage",VIEWER_GLOBALS.LOG_TYPE.WARNING);},_createMessage:function(_d,_e,_f,_10){this.viewModel.logEntries.push({message:_d,messageStyleClass:_f,iconClass:_e,time:VIEWER_UTILS.getTimeStamp(),type:_10});},_clearLogging:function(){this.viewModel.logEntries.removeAll();},_createDeleteAllMessagesTooltip:function(){this.confirmClearLogTooltip=new _6({confirmCallback:_5.hitch(this,this._clearLogging),aroundNode:this.clearLogIcon,displayText:"Clear Log? "});},_showConfirmLogTooltip:function(){if(this.confirmClearLogTooltip==null){this._createDeleteAllMessagesTooltip();}if(this.confirmClearLogTooltip){this.confirmClearLogTooltip.show();}},hidePopups:function(){if(this.confirmClearLogTooltip){this.confirmClearLogTooltip.hide();}}});});