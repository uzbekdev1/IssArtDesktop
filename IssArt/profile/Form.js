Ext.ns('Art.Profile');

Art.Profile.Form = Ext.extend(Ext.form.FormPanel, {
	border		: false,
	bodyStyle	: "padding: 15px",
	labelWidth	: 150,
	
	initComponent: function() {
		this.items = [
			{
				xtype				: 'textfield',
				name				: 'name',
				fieldLabel			: Art.Locale.Profile.nameLabel
			},
			{
				xtype				: 'checkbox',
				name				: 'notification',
				fieldLabel			: Art.Locale.Profile.notificationLabel
			},
			{
				xtype				: 'numberfield',
				name				: 'experience',
				fieldLabel			: Art.Locale.Profile.experienceLabel
			},
			{
				xtype				: 'datefield',
				name				: 'birthDate',
				format				: 'Y-m-d',
				fieldLabel			: Art.Locale.Profile.birthDateLabel
			}
		];
		
		this.plugins = [ new Ext.ux.form.AutoFocus() ];
		
		Art.Profile.Form.superclass.initComponent.call(this);
	},
	
	afterRender: function() {
		Art.Profile.Form.superclass.afterRender.call(this);
		
		this.nameField			= this.getComponent(0);
		this.notificationField	= this.getComponent(1);
		this.experienceField	= this.getComponent(2);
		this.birthDateField		= this.getComponent(3);
		
		this.load();
	},
	
	load: function() {
		Ext.Ajax.request({
			url		: Art.Api.Action.getUser,
			method	: "GET",
			waitMsg	: Art.Locale.Progress.loading,
			success	: this.onLoadSuccess,
			failure	: Art.Util.onFailure,
			scope	: this
		});
	},
	
	onLoadSuccess: function(response, options) {
		this.form.setValues(Ext.decode(response.responseText));
	}
});

Ext.reg('Art.Profile.Form', Art.Profile.Form);
