Ext.define("IssArt.profile.Application", {
	extend: "IssArt.framework.Application",
	
	requires: [
		"IssArt.profile.Window"
	],
	
	// readonly
	window: null,
	
	// override
	run: function()
	{
		this.window = Ext.create("IssArt.profile.Window");
		this.window.show();
	}
});
