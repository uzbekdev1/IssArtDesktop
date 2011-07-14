Ext.define("IssArt.viewport.Viewport", {
	extend: "Ext.container.Viewport",
	
	requires: [
		"IssArt.framework.Desktop"
	],
	
	// readonly
	desktop: null,
	
	initComponent: function()
	{
		this.desktop = Ext.create("IssArt.framework.Desktop");
		
		this.items = [ this.desktop ];
		this.layout = "fit";
		
		this.callParent(arguments);
	}
});
