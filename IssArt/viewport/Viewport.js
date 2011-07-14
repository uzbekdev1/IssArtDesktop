Ext.define("IssArt.viewport.Viewport", {
	extend: "Ext.container.Viewport",
	
	requires: [
		"IssArt.framework.Desktop",
		"IssArt.notepad.ApplicationType",
		"IssArt.profile.ApplicationType",
		"IssArt.console.ApplicationType"
	],
	
	// readonly
	desktop: null,
	
	// readonly
	notepadApplicationType : null,
	profileApplicationType : null,
	consoleApplicationType : null,
	
	initComponent: function()
	{
		this.notepadApplicationType = Ext.create("IssArt.notepad.ApplicationType");
		this.profileApplicationType = Ext.create("IssArt.profile.ApplicationType");
		this.consoleApplicationType = Ext.create("IssArt.console.ApplicationType");
		
		this.desktop = Ext.create("IssArt.framework.Desktop", {
			applicationTypes: [
				this.notepadApplicationType,
				this.profileApplicationType,
				this.consoleApplicationType
			]
		});
		
		this.items = [ this.desktop ];
		this.layout = "fit";
		
		this.callParent(arguments);
	}
});
