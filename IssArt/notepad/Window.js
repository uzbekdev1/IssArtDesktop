// ���� ��������
Ext.define("IssArt.notepad.Window", {
	extend: "Ext.window.Window",
	
	requires: [
		"Ext.button.Button",
		"Ext.form.field.HtmlEditor",
		"Ext.layout.container.Fit",
		"Ext.toolbar.Toolbar",
		
		"IssArt.util.Util",
		"IssArt.notepad.Picker"
	],
	
	// override
	title     : IssArt.locale.Data.notepad.notepad,
	width     : 600,
	height    : 400,
	bodyStyle : "padding: 5px;",
	
	// readonly
	htmlEditor   : null, // Ext.form.field.HtmlEditor
	openButton   : null, // Ext.Button
	saveButton   : null, // Ext.Button
	saveAsButton : null, // Ext.Button
	toolbar      : null, // Ext.toolbar.Toolbar
	
	// readonly
	name: null, // String, ��� ��������� �����
	
	// override
	initComponent: function()
	{
		this.htmlEditor = Ext.create("Ext.form.field.HtmlEditor");
		
		this.items = [ this.htmlEditor ];
		this.layout = "fit";
		
		this.openButton = Ext.create("Ext.Button", {
			text    : IssArt.locale.Data.button.open,
			handler : this.onOpenClick,
			scope   : this
		});
		
		this.saveButton = Ext.create("Ext.Button", {
			text    : IssArt.locale.Data.button.save,
			handler : this.onSaveClick,
			scope   : this
		});
		
		this.saveAsButton = Ext.create("Ext.Button", {
			text    : IssArt.locale.Data.button.saveAs,
			handler : this.onSaveAsClick,
			scope   : this
		});
		
		this.toolbar = Ext.create("Ext.toolbar.Toolbar", {
			dock  : "top",
			items : [
				this.openButton, '-',
				this.saveButton, '-',
				this.saveAsButton
			]
		});
		
		this.dockedItems = [ this.toolbar ];
		
		this.callParent(arguments);
	},
	
	// private
	onOpenClick: function()
	{
		this.open();
	},
	
	// private
	onSaveClick: function()
	{
		this.save();
	},
	
	// private
	onSaveAsClick: function()
	{
		this.saveAs();
	},
	
	// private
	open: function()
	{
		Ext.create("IssArt.notepad.Picker", {
			action    : "open",
			listeners : {
				select    : this.onOpenSelect,
				scope     : this
			}
		}).show();
	},
	
	// private
	onOpenSelect: function(
		picker, // IssArt.notepad.Picker
		name)   // String
	{
		this.name = name;
		
		this.getEl().mask(IssArt.locale.Data.progress.loading);
		
		Ext.Ajax.request({
			url      : "issart/action/getnotepad",
			params   : {
				name     : name
			},
			method   : "GET",
			success  : this.onOpenSuccess,
			failure  : IssArt.util.Util.onFailure,
			callback : function() { this.getEl().unmask() },
			scope    : this
		});
	},
	
	// private
	onOpenSuccess: function(
		response, // XMLHttpRequest
		options)  // Object
	{
		var result = Ext.decode(response.responseText);
		this.htmlEditor.setValue(result.content);
	},
	
	// private
	save: function(
		afterSave, // Ext.Ajax.request success callback
		scope)     // Object
	{
		if (afterSave)
			this.afterSave = Ext.Function.pass(afterSave, [], scope);
		
		if (!this.name)
			this.saveAs();
		else
			this.runSave();
	},
	
	// private
	saveAs: function(
		afterSave, // Ext.Ajax.request success callback
		scope)     // Object
	{
		if (afterSave)
			this.afterSave = Ext.Function.pass(afterSave, [], scope);
		
		Ext.create("IssArt.notepad.Picker", {
			action    : "save",
			listeners : {
				select    : this.onSaveSelect,
				scope     : this
			}
		}).show();
	},
	
	// private
	onSaveSelect: function(
		picker, // IssArt.notepad.Picker
		name)   // String
	{
		this.name = name;
		this.runSave();
	},
	
	// private
	runSave: function()
	{
		this.getEl().mask(IssArt.locale.Data.progress.saving);
		
		Ext.Ajax.request({
			url      : "issart/action/setnotepad",
			params   : {
				name     : this.name,
				content  : this.htmlEditor.getValue()
			},
			method   : "GET",
			success  : this.afterSave,
			failure  : IssArt.util.Util.onFailure,
			callback : function() { this.getEl().unmask() },
			scope    : this
		});
	},
	
	// override
	close: function()
	{
		Ext.Msg.show({
			buttons  : Ext.Msg.YESNOCANCEL,
			closable : false,
			fn       : this.onCloseConfirm,
			scope    : this,
			title    : IssArt.locale.Data.message.confirm,
			msg      : IssArt.locale.Data.notepad.doYouWantToSaveContent
		});
	},
	
	// private
	onCloseConfirm: function(btn)
	{
		if (btn == "cancel")
			return;
		
		if (btn == "yes")
			this.save(this.runClose, this);
		else
			this.runClose();
	},
	
	// private
	runClose: function()
	{
		IssArt.notepad.Window.superclass.close.call(this);
	}
});
