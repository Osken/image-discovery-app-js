//>>built
define("esriviewer/ui/time/TimeSliderWindow",["dojo/_base/declare","dojo/_base/lang","dojo/topic","dojo/window","dojo/dom-style","../window/WindowWidget"],function(_1,_2,_3,_4,_5,_6){return _1([_6],{defaultPositioning:{x:10,y:50},windowWidth:"450px",windowHeaderText:"Time Slider",windowIconAltText:"Time Slider",windowIconClass:"commonIcons16 clock",positioningParamName:"time",constructor:function(){this.firstShowListener=this.on("firstWindowShow",_2.hitch(this,this.handleFirstWindowShow));},handleFirstWindowShow:function(){this.firstShowListener.remove();require(["esriviewer/ui/time/TimeSliderWidget"],_2.hitch(this,function(_7){this.timeSliderWidget=new _7();this.setContent(this.timeSliderWidget.domNode);}));},initListeners:function(){this.inherited(arguments);this.subscribes.push(_3.subscribe(VIEWER_GLOBALS.EVENTS.MAP.TIME.SHOW_TIME_SLIDER,_2.hitch(this,this.show)));this.subscribes.push(_3.subscribe(VIEWER_GLOBALS.EVENTS.MAP.TIME.TOGGLE_TIME_SLIDER,_2.hitch(this,this.toggle)));},postCreate:function(){var _8=_4.getBox();if(_8.w>1600){_5.set(this.domNode,"width","25%");}else{_5.set(this.domNode,"width","35%");}this.inherited(arguments);},hide:function(){this.inherited(arguments);if(this.timeSliderWidget){this.timeSliderWidget.clearTimeSlider();}}});});