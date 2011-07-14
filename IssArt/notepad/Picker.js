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
		action: "save"
	},
	
	// override
	title  : IssArt.locale.Data.notepad.selectNotepadFile,
	width  : 400,
	height : 250,
	
	// private
	grid      : null,
	form      : null,
	nameField : null,
	
	initComponent: function()
	{
		this.grid = Ext.create("IssArt.notepad.picker.Grid", {
			region    : "center",
			listeners : {
				rowclick    : this.onRowClick,
				rowdblclick : this.onRowDblClick,
				scope       : this
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
			handler : this.onEsc,
			scope   : this
		});
		
		this.bbar = [
			'->', this.selectButton,
			'-',  this.closeButton
		];
		
		this.addEvents("select");
		
		this.callParent(arguments);
	},
	
	onRowClick: function(grid, number, e)
	{
		this.nameField.setValue(this.grid.store.getAt(number).get("name"));
	},
	
	onRowDblClick: function(grid, number, e)
	{
		this.fireEvent("select", this, this.grid.store.getAt(number).get("name"));
		this.onEsc();
	},
	
	onSelectClick: function()
	{
		if (!this.nameField.isValid())
			return;
		
		this.fireEvent("select", this, this.nameField.getValue());
		this.onEsc();
	}
});
