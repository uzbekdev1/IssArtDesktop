Ext.Loader.setPath("IssArt", "/IssArt");

Ext.require([
	"IssArt.locale.Locale",
	"IssArt.framework.Viewport"/*,
	"IssArt.notepad.Application",
	"IssArt.profile.Application",
	"IssArt.console.Application"*/
]);

Ext.onReady(function() {
	IssArt.Viewport = Ext.create("IssArt.framework.Viewport", {/*
		applicationTypes: [
			{
				provider : IssArt.notepad.Application,
				tip      : IssArt.locale.Data.notepad.tip,
				iconCls  : "issart-notepad-icon"
			},
			{
				provider : IssArt.profile.Application,
				tip      : IssArt.locale.Data..profile.tip,
				iconCls  : "art-profile-icon"
			},
			{
				provider : IssArt.console.Application,
				tip      : IssArt.locale.Data..console.tip,
				iconCls  : "console-icon"
			}
		]*/
	});
});
