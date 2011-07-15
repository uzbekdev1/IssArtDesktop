// Форма редактора профиля
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
	nameField         : null, // Ext.form.field.Text
	notificationField : null, // Ext.form.field.Checkbox
	experienceField   : null, // Ext.form.field.Number
	birthDateField    : null, // Ext.form.field.Date
	
	// override
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
		
		this.callParent(arguments);
	},
	
	// override
	afterRender: function()
	{
		this.callParent(arguments);
		
		this.nameField         = this.getComponent(0);
		this.notificationField = this.getComponent(1);
		this.experienceField   = this.getComponent(2);
		this.birthDateField    = this.getComponent(3);
		
		this.load();
	},
	
	// private
	load: function()
	{
		this.getEl().mask(IssArt.locale.Data.progress.loading);
		
		Ext.Ajax.request({
			url      : "issart/action/getuser",
			method   : "GET",
			success  : this.onLoadSuccess,
			failure  : IssArt.util.Util.onFailure,
			callback : function() { this.getEl().unmask() },
			scope    : this
		});
	},
	
	// private
	onLoadSuccess: function(
		response, // XMLHttpRequest
		options)  // Object
	{
		this.form.setValues(Ext.decode(response.responseText));
	}
});
