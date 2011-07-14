Ext.Loader.setPath("IssArt", "/IssArt");

Ext.require("IssArt.locale.Locale");

Ext.onReady(function() {
	Ext.require([
		"IssArt.viewport.Viewport"
	]);
	
	Ext.onReady(function() {
		window.issArtViewport = Ext.create("IssArt.viewport.Viewport");
	});
});
