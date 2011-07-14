Ext.define("IssArt.profile.Window", {
	extend: "Ext.window.Window",
	
	requires: [
		"Ext.button.Button",
		
		"IssArt.profile.Form",
		"IssArt.util.Util"
	],
	
	// override
	title     : IssArt.locale.Data.profile.profileEditor,
	width     : 330,
	height    : 190,
	resizable : false,
	
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
	
	onSaveClick: function()
	{
		// TODO: loading mask
		
		Ext.Ajax.request({
			url     : "issart/action/setuser",
			params  : this.form.form.getValues(),
			method  : "GET",
			success : this.onSaveSuccess,
			failure : IssArt.util.Util.onFailure,
			scope   : this
		});
	},
	
	onSaveSuccess: function()
	{
		this.onClose();
	},
	
	onClose: function()
	{
		this[this.closeAction]();
	}
});
