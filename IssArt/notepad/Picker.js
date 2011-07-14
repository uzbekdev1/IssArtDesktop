// Диалог выбора файла блокнота для сохранения или загрузки
Ext.define("IssArt.notepad.Picker", {
	extend: "Ext.window.Window",
	
	requires: [
		"Ext.button.Button",
		"Ext.form.Panel",
		"Ext.form.field.Text",
		"Ext.layout.container.Border",
		
		"IssArt.notepad.picker.Grid"
	],
	
	config: {
		action: "save" // "save" или "open", назначение диалога
	},
	
	// override
	title  : IssArt.locale.Data.notepad.selectNotepadFile,
	width  : 400,
	height : 250,
	modal  : true,
	
	// private
	grid         : null, // IssArt.notepad.picker.Grid, список файлов блокнота
	form         : null, // Ext.form.Panel, форма для ввода имени файла
	nameField    : null, // Ext.form.field.Text, поле для ввода имени файла
	selectButton : null, // Ext.button.Button, кнопка выбора файла
	closeButton  : null, // Ext.button.Button, кнопка закрытия диалога
	
	// override
	initComponent: function()
	{
		this.grid = Ext.create("IssArt.notepad.picker.Grid", {
			region    : "center",
			listeners : {
				itemclick    : this.onRowClick,
				itemdblclick : this.onRowDblClick,
				scope        : this
			}
		});
		
		this.nameField = Ext.create("Ext.form.field.Text", {
			fieldLabel : IssArt.locale.Data.notepad.notepadName,
			anchor     : "100%",
			allowBlank : false,
			disabled   : this.action == "open"
		});
		
		this.form = Ext.create("Ext.form.Panel", {
			region    : "south",
			height    : 35,
			border    : false,
			items     : [ this.nameField ],
			bodyStyle : "padding:5px;"
		});
		
		this.items = [
			this.grid,
			this.form
		];
		
		this.layout = "border";
		
		this.selectButton = Ext.create("Ext.Button", {
			text    : IssArt.locale.Data.button[this.action],
			handler : this.onSelectClick,
			scope   : this
		});
		
		this.closeButton = Ext.create("Ext.Button", {
			text    : IssArt.locale.Data.button.close,
			handler : this.onClose,
			scope   : this
		});
		
		this.bbar = [
			'->', this.selectButton,
			'-',  this.closeButton
		];
		
		this.addEvents(
			// Событие выбора файла
			//	handler(
			//		sender, // IssArt.notepad.Picker
			//		name)   // String, имя выбранного файла
			"select"
		);
		
		this.callParent(arguments);
	},
	
	// private
	onRowClick: function(
		grid,   // IssArt.notepad.picker.Grid
		record) // IssArt.notepad.model.Notepad
	{
		this.nameField.setValue(record.get("name"));
	},
	
	// private
	onRowDblClick: function(
		grid,   // IssArt.notepad.picker.Grid
		record) // IssArt.notepad.model.Notepad
	{
		this.fireEvent("select", this, record.get("name"));
		this.onClose();
	},
	
	// private
	onSelectClick: function()
	{
		if (!this.nameField.isValid())
			return;
		
		this.fireEvent("select", this, this.nameField.getValue());
		this.onClose();
	},
	
	// private
	onClose: function()
	{
		this[this.closeAction]();
	}
});
