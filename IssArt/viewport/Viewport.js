Ext.define("IssArt.viewport.Viewport", {
	extend: "Ext.container.Viewport",
	
	requires: [
		"Ext.layout.container.Fit",
		
		"IssArt.framework.Desktop",
		"IssArt.notepad.ApplicationType",
		"IssArt.profile.ApplicationType"
	],
	
	// readonly
	desktop: null,
	
	// readonly
	notepadApplicationType : null,
	profileApplicationType : null,
	
	initComponent: function()
	{
		this.notepadApplicationType = Ext.create("IssArt.notepad.ApplicationType");
		this.profileApplicationType = Ext.create("IssArt.profile.ApplicationType");
		
		this.desktop = Ext.create("IssArt.framework.Desktop", {
			applicationTypes: [
				this.notepadApplicationType,
				this.profileApplicationType
			]
		});
		
		this.items = [ this.desktop ];
		this.layout = "fit";
		
		this.callParent(arguments);
	}
});
