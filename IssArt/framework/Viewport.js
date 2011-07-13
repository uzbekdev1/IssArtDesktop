Ext.define("IssArt.framework.Viewport", {
	extend: "Ext.container.Viewport",
	
	requires: [
		"IssArt.framework.Desktop"
	],
	
	config: {
		applicationTypes: []
	},
	
	// readonly
	desktop: null,
	
	initComponent: function()
	{
		this.desktop = Ext.create("IssArt.framework.Desktop", {
			applicationTypes: this.applicationTypes
		});
		
		this.items = [
			this.desktop
		];
		
		this.layout = "fit";
		
		this.callParent(arguments);
	}
});
