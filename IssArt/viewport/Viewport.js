// Viewport - корень всего веб-приложения
Ext.define("IssArt.viewport.Viewport", {
	extend: "Ext.container.Viewport",
	
	requires: [
		"Ext.layout.container.Fit",
		
		"IssArt.framework.Desktop",
		"IssArt.notepad.ApplicationType",
		"IssArt.profile.ApplicationType",
		"IssArt.console.ApplicationType"
	],
	
	// readonly
	desktop: null, // IssArt.framework.Desktop
	
	// readonly
	notepadApplicationType : null, // IssArt.notepad.ApplicationType
	profileApplicationType : null, // IssArt.profile.ApplicationType
	consoleApplicationType : null, // IssArt.console.ApplicationType
	
	// override
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
