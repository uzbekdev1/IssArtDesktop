Ext.require("IssArt.locale.Locale");

Ext.onReady(function() {
	Ext.require([
		"Ext.tip.QuickTipManager",
		"IssArt.viewport.Viewport"
	]);
	
	Ext.onReady(function() {
		Ext.tip.QuickTipManager.init();
		window.issArtViewport = Ext.create("IssArt.viewport.Viewport");
	});
});
