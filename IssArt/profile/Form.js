Ext.define("IssArt.profile.Form", {
	extend: "Ext.form.Panel",
	
	requires: [
		"Ext.form.field.Checkbox",
		"Ext.form.field.Date",
		"Ext.form.field.Number",
		"Ext.form.field.Text"
	],
	
	// override
	border     : false,
	bodyStyle  : "padding:15px",
	
	// readonly
	nameField         : null,
	notificationField : null,
	experienceField   : null,
	birthDateField    : null,
	
	initComponent: function()
	{
		this.defaults = {
			labelWidth : 120,
			labelPad   : 10,
			labelAlign : "right"
		};
		
		this.items = [
			{
				xtype      : "textfield",
				name       : "name",
				fieldLabel : IssArt.locale.Data.common.name
			}, {
				xtype      : "checkbox",
				name       : "notification",
				fieldLabel : IssArt.locale.Data.profile.receiveNotifications
			}, {
				xtype      : "numberfield",
				name       : "experience",
				fieldLabel : IssArt.locale.Data.profile.experienceMonths
			}, {
				xtype      : "datefield",
				name       : "birthDate",
				format     : "Y-m-d",
				fieldLabel : IssArt.locale.Data.profile.birthDate
			}
		];
		
		//this.plugins = [ new Ext.ux.form.AutoFocus() ];
		
		this.callParent(arguments);
	},
	
	afterRender: function()
	{
		this.callParent(arguments);
		
		this.nameField         = this.getComponent(0);
		this.notificationField = this.getComponent(1);
		this.experienceField   = this.getComponent(2);
		this.birthDateField    = this.getComponent(3);
		
		this.load();
	},
	
	load: function()
	{
		Ext.Ajax.request({
			url     : "issart/action/getuser",
			method  : "GET",
			success : this.onLoadSuccess,
			failure : IssArt.util.Util.onFailure,
			scope   : this
		});
	},
	
	onLoadSuccess: function(response, options)
	{
		this.form.setValues(Ext.decode(response.responseText));
	}
});
