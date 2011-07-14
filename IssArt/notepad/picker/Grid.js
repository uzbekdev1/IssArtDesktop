// Список файлов блокнота
Ext.define("IssArt.notepad.picker.Grid", {
	extend: "Ext.grid.Panel",
	
	requires: [
		"IssArt.notepad.model.NotepadStore"
	],
	
	// override
	border   : false,
	forceFit : true,
	
	// override
	initComponent: function()
	{
		this.store = Ext.create("IssArt.notepad.model.NotepadStore");
		
		this.columns = [
			{
				header    : IssArt.locale.Data.notepad.notepadName,
				dataIndex : "name",
				width     : 100
			}, {
				header    : IssArt.locale.Data.notepad.shortContent,
				dataIndex : "content",
				width     : 300
			}
		];
		
		this.callParent(arguments);
	}
});
