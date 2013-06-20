define([
    "dojo/_base/declare",
    "dojo/text!./template/DownloadWidgetTemplate.html",
    "dojo/topic",
    "dojo/_base/lang",
    "dojo/_base/json",
    "esriviewer/ui/base/UITemplatedWidget",
    "../export/ImageryExportWidget",
    "../export/FootprintsExportWidget",
    "./model/DownloadViewModel",
    "../reporting/ReportingWidget",
    "../portal/PortalWebMapReportWidget"
],
    function (declare, template, topic, lang, json, UITemplatedWidget, ImageryExportWidget, FootprintsExportWidget, DownloadViewModel, ReportingWidget, PortalWebMapReportWidget) {
        return declare(
            [UITemplatedWidget],
            {
                showWebMapCreationTab: true,
                templateString: template,
                constructor: function (params) {
                    lang.mixin(this, params || {});
                },
                postCreate: function () {
                    this.inherited(arguments);
                    this.viewModel = new DownloadViewModel();
                    this.viewModel.downloadImageryData.subscribe(lang.hitch(this, this.handleDownloadImageryVisibilityChange));
                    this.viewModel.downloadFootprintData.subscribe(lang.hitch(this, this.handleDownloadFootprintsVisibilityChange));
                    this.viewModel.reportingData.subscribe(lang.hitch(this, this.handleReportingVisibilityChange));

                    //see if the active layer supports download
                    var queryLayerControllers;
                    topic.publish(IMAGERY_GLOBALS.EVENTS.QUERY.LAYER_CONTROLLERS.GET, function (qLyrCtrls) {
                        queryLayerControllers = qLyrCtrls;
                    });
                    var hasDownloadEnabled = false;
                    var currentQueryLayerController;
                    var currentQueryLayer;
                    if (queryLayerControllers) {
                        for (var i = 0; i < queryLayerControllers.length; i++) {
                            currentQueryLayerController = queryLayerControllers[i];
                            currentQueryLayer = currentQueryLayerController.layer;
                            if (IMAGERY_UTILS.layerSupportsDownload(currentQueryLayer)) {
                                hasDownloadEnabled = true;
                            }
                        }
                        if (!hasDownloadEnabled) {
                            this.viewModel.showDownloadImageryTab(false);
                            this.viewModel.showDownloadFootprintsContent();
                        }
                        else {
                            this.viewModel.showDownloadImageryTab(true);
                        }
                        this.viewModel.showWebMapCreationTab(this.showWebMapCreationTab);
                        ko.applyBindings(this.viewModel, this.domNode);
                        this.createExportWidget();
                        this.createFootprintDownloadWidget();
                        this.createReportingWidget();
                        this.createWebMapPublishingWidget();
                    }
                },
                loadViewerConfigurationData: function () {
                    this.inherited(arguments);
                    var portalConfig = null;
                    topic.publish(VIEWER_GLOBALS.EVENTS.CONFIGURATION.GET_ENTRY, "portal", function (portalConf) {
                        portalConfig = portalConf;
                    });
                    if (portalConfig == null || !lang.isObject(portalConfig) || portalConfig.url == null) {
                        this.showWebMapCreationTab = false;
                    }
                },
                clearActiveMapGraphics: function () {
                    if (this.imageryExportWidget) {
                        this.imageryExportWidget.clearDraw();
                        this.imageryExportWidget.viewModel.userDrawActive(false);
                    }
                    if (this.reportingWidget) {
                        this.reportingWidget.clearDraw();
                        this.reportingWidget.viewModel.userDrawActive(false);
                    }
                },
                handleReportingVisibilityChange: function (visible) {
                    if (!visible && this.reportingWidget) {
                        this.reportingWidget.clearDraw();
                        this.reportingWidget.viewModel.userDrawActive(false);
                    }
                },
                handleDownloadFootprintsVisibilityChange: function (visible) {
                    if (!visible && this.footprintExportWidget) {
                        this.footprintExportWidget.clearDraw();
                        this.footprintExportWidget.viewModel.userDrawActive(false);
                    }
                },
                handleDownloadImageryVisibilityChange: function (visible) {
                    if (!visible && this.imageryExportWidget) {
                        this.imageryExportWidget.clearDraw();
                        this.imageryExportWidget.viewModel.userDrawActive(false);
                    }
                },
                createReportingWidget: function () {
                    this.reportingWidget = new ReportingWidget().placeAt(this.reportingContainer);
                },
                createWebMapPublishingWidget: function () {
                    this.webMapWidget = new PortalWebMapReportWidget().placeAt(this.webMapCreationContainer);
                },
                createExportWidget: function () {
                    this.imageryExportWidget = new ImageryExportWidget().placeAt(this.imageExportContainer);
                },
                createFootprintDownloadWidget: function () {
                    this.footprintExportWidget = new FootprintsExportWidget().placeAt(this.downloadFootprintsContainer)
                }
            });
    });