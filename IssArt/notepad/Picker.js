Ext.ns('Art.Notepad');

Art.Notepad.Picker = Ext.extend(Ext.Window, {
	title		: Art.Locale.Notepad.pickerTitle,
	width		: 400,
	height		: 250,
	action		: 'save',
	
	initComponent: function() {
		this.grid = new Art.Notepad.Grid({
			region			: 'center',
			listeners		: {
				'rowclick'		: this.onRowClick,
				'rowdblclick'	: this.onRowDblClick,
				scope			: this
			}
		});
		
		this.nameField = new Ext.form.TextField({
			fieldLabel	: Art.Locale.Notepad.nameLabel,
			anchor		: '100%',
			allowBlank	: false,
			disabled	: this.action == 'open'
		});
		
		this.south = new Ext.form.FormPanel({
			region		: 'south',
			height		: 35,
			border		: false,
			items		: [ this.nameField ],
			bodyStyle	: "padding: 5px"
		});
		
		this.items = [
			this.grid,
			this.south
		];
		this.layout = 'border';
		
		this.selectButton = new Ext.Button({
			text	: Art.Locale.Button[this.action],
			handler	: this.onSelectClick,
			scope	: this
		});
		
		this.closeButton = new Ext.Button({
			text	: Art.Locale.Button.close,
			handler	: this.onEsc,
			scope	: this
		});
		
		this.bbar = [
			'->', this.selectButton,
			'-',  this.closeButton
		];
		
		this.addEvents('select');
		
		Art.Notepad.Picker.superclass.initComponent.call(this);
	},
	
	onRowClick: function(grid, number, e) {
		this.nameField.setValue(this.grid.store.getAt(number).get('name'));
	},
	
	onRowDblClick: function(grid, number, e) {
		this.fireEvent('select', this, this.grid.store.getAt(number).get('name'));
		this.onEsc();
	},
	
	onSelectClick: function() {
		if (!this.nameField.isValid()) {
			return;
		}
		
		this.fireEvent('select', this, this.nameField.getValue());
		this.onEsc();
	}
});

Ext.reg('Art.Notepad.Picker', Art.Notepad.Picker);
