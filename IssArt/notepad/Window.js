Ext.ns('Art.Notepad');

Art.Notepad.Window = Ext.extend(Ext.Window, {
	title		: Art.Locale.Notepad.title,
	
	width		: 600,
	height		: 400,
	bodyStyle	: "padding: 5px;",
	
	initComponent: function() {
		this.htmlEditor = new Ext.form.HtmlEditor();
		
		this.items = [ this.htmlEditor ];
		this.layout = 'fit';
		
		this.openButton = new Ext.Button({
			text	: Art.Locale.Button.open,
			handler	: this.onOpenClick,
			scope	: this
		});
		
		this.saveButton = new Ext.Button({
			text	: Art.Locale.Button.save,
			handler	: this.onSaveClick,
			scope	: this
		});
		
		this.saveAsButton = new Ext.Button({
			text	: Art.Locale.Button.saveAs,
			handler	: this.onSaveAsClick,
			scope	: this
		});
		
		this.tbar = [
			this.openButton, '-',
			this.saveButton, '-',
			this.saveAsButton
		];
		
		Art.Notepad.Window.superclass.initComponent.call(this);
	},
	
	onOpenClick: function() {
		this.open();
	},
	
	onSaveClick: function() {
		this.save();
	},
	
	onSaveAsClick: function() {
		this.saveAs();
	},
	
	open: function() {
		new Art.Notepad.Picker({
			action		: 'open',
			listeners	: {
				'select'	: this.onOpenSelect,
				scope		: this
			}
		}).show();
	},
	
	onOpenSelect: function(picker, name) {
		this.name = name;
		
		Ext.Ajax.request({
			url		: Art.Api.Action.getNotepad,
			params	: {
				name	: name
			},
			method	: "GET",
			waitMsg	: Art.Locale.Progress.loading,
			success	: this.onOpenSuccess,
			failure	: Art.Util.onFailure,
			scope	: this
		});
	},
	
	onOpenSuccess: function(response, options) {
		var result = Ext.decode(response.responseText);
		this.htmlEditor.setValue(result.content);
	},
	
	save: function(afterSave, scope) {
		if (afterSave)
			this.afterSave = afterSave.createDelegate(scope);
		
		if (!this.name)
			this.saveAs();
		else
			this.runSave();
	},
	
	saveAs: function(afterSave, scope) {
		if (afterSave)
			this.afterSave = afterSave.createDelegate(scope);
		
		new Art.Notepad.Picker({
			action		: 'save',
			listeners	: {
				'select'	: this.onSaveSelect,
				scope		: this
			}
		}).show();
	},
	
	onSaveSelect: function(picker, name) {
		this.name = name;
		this.runSave();
	},
	
	runSave: function(onSuccess) {
		Ext.Ajax.request({
			url		: Art.Api.Action.setNotepad,
			params	: {
				name	: this.name,
				content	: this.htmlEditor.getValue()
			},
			method	: "GET",
			waitMsg	: Art.Locale.Progress.saving,
			success	: this.afterSave,
			failure	: Art.Util.onFailure,
			scope	: this
		});
	},
	
	close: function() {
		Ext.Msg.show({
			buttons		: Ext.Msg.YESNOCANCEL,
			closable	: false,
			fn			: this.onCloseConfirm,
			scope		: this,
			title		: Art.Locale.Message.confirm,
			msg			: Art.Locale.Notepad.closeConfirm
		});
	},
	
	onCloseConfirm: function(btn) {
		if (btn == 'cancel')
			return;
		
		if (btn == 'yes')
			this.save(this.runClose, this);
		else
			this.runClose();
	},
	
	runClose: function() {
		Art.Notepad.Window.superclass.close.call(this);
	}
});

Ext.reg('Art.Notepad.Window', Art.Notepad.Window);
