// Приложение консоли Ajax-запросов
Ext.define("IssArt.console.Application", {
	extend: "IssArt.framework.Application",
	
	requires: [
		"IssArt.console.Window"
	],
	
	// readonly
	window: null, // IssArt.console.Window
	
	// override
	run: function()
	{
		this.window = Ext.create("IssArt.console.Window");
		this.window.show();
	}
});
