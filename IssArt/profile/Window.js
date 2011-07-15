// Окно редактора профиля
Ext.define("IssArt.profile.Window", {
	extend: "Ext.window.Window",
	
	requires: [
		"Ext.button.Button",
		"Ext.layout.container.Fit",
		
		"IssArt.profile.Form",
		"IssArt.util.Util"
	],
	
	// override
	title     : IssArt.locale.Data.profile.profileEditor,
	width     : 330,
	height    : 190,
	resizable : false,
	
	// readonly
	form        : null, // IssArt.profile.Form
	saveButton  : null, // Ext.Button
	closeButton : null, // Ext.Button
	
	// override
	initComponent: function()
	{
		this.form = Ext.create("IssArt.profile.Form");
		
		this.items = [ this.form ];
		this.layout = "fit";
		
		this.saveButton = Ext.create("Ext.Button", {
			text    : IssArt.locale.Data.button.save,
			handler : this.onSaveClick,
			scope   : this
		});
		
		this.closeButton = Ext.create("Ext.Button", {
			text    : IssArt.locale.Data.button.close,
			handler : this.onClose,
			scope   : this
		});
		
		this.bbar = [
			'->', this.saveButton,
			'-', this.closeButton
		];
		
		this.callParent(arguments);
	},
	
	// private
	onSaveClick: function()
	{
		this.getEl().mask(IssArt.locale.Data.progress.saving);
		
		Ext.Ajax.request({
			url      : "issart/action/setuser",
			params   : this.form.form.getValues(),
			method   : "GET",
			success  : this.onSaveSuccess,
			failure  : IssArt.util.Util.onFailure,
			callback : function() { this.getEl().unmask() },
			scope    : this
		});
	},
	
	// private
	onSaveSuccess: function()
	{
		this.onClose();
	},
	
	// private
	onClose: function()
	{
		this[this.closeAction]();
	}
});
