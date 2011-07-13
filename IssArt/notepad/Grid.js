Ext.ns('Art.Notepad');

Art.Notepad.Grid = Ext.extend(Ext.grid.GridPanel, {
	border: false,
	
	initComponent: function() {
		this.store = new Ext.data.JsonStore({
			url			: Art.Api.Action.getNotepads,
			method		: "GET",
			root		: 'notepads',
			fields		: [
				{ name		: 'name'	},
				{ name		: 'content'	}
			],
			autoLoad	: true
		});
		
		this.cm = new Ext.grid.ColumnModel([
			{
				header		: Art.Locale.Notepad.nameColumn,
				dataIndex	: 'name',
				width		: 100,
				sortable	: true
			},
			{
				header		: Art.Locale.Notepad.contentColumn,
				dataIndex	: 'content',
				width		: 300,
				sortable	: true
			}
		]);
		
		this.viewConfig = { forceFit: true };
		
		Art.Notepad.Grid.superclass.initComponent.call(this);
	}
});

Ext.reg('Art.Notepad.Grid', Art.Notepad.Grid);
