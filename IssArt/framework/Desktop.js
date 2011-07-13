Ext.define("IssArt.framework.Desktop", {
	extend: "Ext.panel.Panel",
	
	requires: [
		"Ext.button.Button",
		"Ext.toolbar.Toolbar",
		"IssArt.framework.Application",
		"IssArt.framework.ApplicationType"
	],
	
	config: {
		applicationTypes: null
	},
	
	// private
	bottomToolbar : null,
	applications  : null,
	
	cls    : "art-desktop",
	border : false,
	
	initComponent: function()
	{
		this.bottomToolbar = Ext.create("Ext.toolbar.Toolbar", {
			dock  : "bottom",
			items : []
		});
		
		this.dockedItems = [ this.bottomToolbar ];
		
		this.applications = [];
		
		this.callParent(arguments);
	},
	
	afterRender: function()
	{
		this.callParent(arguments);
		
		var applicationTypes = this.applicationTypes;
		delete this.applicationTypes;
		this.setApplicationTypes(applicationTypes);
	},
	
	addApplicationType: function(applicationType)
	{
		this.applicationTypes.push(application);
		if (!this.rendered)
			return;
		
		var button = Ext.create("Ext.Button", {
			iconCls : applicationType.iconCls,
			tooltip : applicationType.tip,
			handler : Ext.Function.pass(this.runApplication, [applicationType.provider], this)
		});
		
		this.bottomToolbar.add(button);
	},
	
	runApplication: function(provider)
	{
		var application = new provider();
		this.applications.push(application);
		application.run();
	},
	
	applyApplicationTypes: function(value)
	{
		if (!this.rendered)
			return value;
		
		this.applicationTypes = [];
		this.bottomToolbar.removeAll();
		
		if (!value)
			return;
		
		for (var i = 0; i < value.length; ++i)
			this.addApplicationType(value[i]);
	}
});
