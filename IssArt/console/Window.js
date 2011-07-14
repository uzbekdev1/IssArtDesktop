Ext.define("IssArt.console.Window", {
	extend: "Ext.window.Window",
	
	requires: [
		"IssArt.console.Item",
		"IssArt.console.model.ItemStore"
	],
	
	// override
	title     : IssArt.locale.Data.console.ajaxConsole,
	x         : 0,
	y         : 0,
	width     : 600,
	height    : 200,
	bodyStyle : "padding: 5px 20px 5px 5px; overflow-y: auto;",
	
	// readonly
	panel: null,
	
	initComponent: function()
	{
		this.store = IssArt.console.model.ItemStore;
		this.store.on("add", this.onAdd, this);
		
		this.items = [];
		this.layout = "anchor";
		
		this.callParent(arguments);
	},
	
	afterRender: function()
	{
		this.callParent(arguments);
		
		for (var i = 0; i < this.store.getCount(); ++i)
			this.insertItem(i, this.store.getAt(i));
	},
	
	onAdd: function(store, records, index)
	{
		for (var i = 0; i < records.length; ++i)
			this.insertItem(index + i, records[i]);
	},
	
	insertItem: function(index, record)
	{
		var item = Ext.create("IssArt.console.Item", {
			record: record
		});
		
		this.insert(index, item);
	}
});
