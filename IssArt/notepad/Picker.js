Ext.define("IssArt.notepad.Picker", {
	extend: "Ext.window.Window",
	
	requires: [
		"Ext.button.Button",
		"Ext.form.Panel",
		"Ext.form.field.Text",
		
		"IssArt.notepad.picker.Grid"
	],
	
	config: {
		action: "save"
	},
	
	// override
	title  : IssArt.locale.Data.notepad.selectNotepadFile,
	width  : 400,
	height : 250,
	modal  : true,
	
	// private
	grid      : null,
	form      : null,
	nameField : null,
	
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
		
		this.addEvents("select");
		
		this.callParent(arguments);
	},
	
	onRowClick: function(grid, record)
	{
		this.nameField.setValue(record.get("name"));
	},
	
	onRowDblClick: function(grid, record)
	{
		this.fireEvent("select", this, record.get("name"));
		this.onClose();
	},
	
	onSelectClick: function()
	{
		if (!this.nameField.isValid())
			return;
		
		this.fireEvent("select", this, this.nameField.getValue());
		this.onClose();
	},
	
	onClose: function()
	{
		this[this.closeAction]();
	}
});
