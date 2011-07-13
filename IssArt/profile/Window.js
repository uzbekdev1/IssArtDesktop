Ext.ns('Art.Profile');

Art.Profile.Window = Ext.extend(Ext.Window, {
	title		: Art.Locale.Profile.title,
	width		: 330,
	height		: 190,
	resizable	: false,
	
	initComponent: function() {
		this.form = new Art.Profile.Form();
		
		this.items = [ this.form ];
		this.layout = 'fit';
		
		
		this.saveButton = new Ext.Button({
			text	: Art.Locale.Button.save,
			handler	: this.onSaveClick,
			scope	: this
		});
		
		this.closeButton = new Ext.Button({
			text	: Art.Locale.Button.close,
			handler	: this.onEsc,
			scope	: this
		});
		
		this.bbar = [
			'->', this.saveButton,
			'-',  this.closeButton
		];
		
		Art.Profile.Window.superclass.initComponent.call(this);
	},
	
	onSaveClick: function() {
		var params = {
			name			: this.form.nameField.getValue(),
			notification	: this.form.notificationField.getValue(),
			experience		: this.form.experienceField.getValue(),
			birthDate		: this.form.birthDateField.getValue()
		}
		Ext.Ajax.request({
			url		: Art.Api.Action.setUser,
			params	: this.form.form.getValues(),
			method	: "GET",
			waitMsg	: Art.Locale.Progress.saving,
			success	: this.onSaveSuccess,
			failure	: Art.Util.onFailure,
			scope	: this
		});
	},
	
	onSaveSuccess: function() {
		this.onEsc();
	}
});

Ext.reg('Art.Profile.Window', Art.Profile.Window);
