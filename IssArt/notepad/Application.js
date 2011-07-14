// Приложение блокнота
Ext.define("IssArt.notepad.Application", {
	extend: "IssArt.framework.Application",
	
	requires: [
		"IssArt.notepad.Window"
	],
	
	// readonly
	window: null, // IssArt.notepad.Window
	
	// override
	run: function()
	{
		this.window = Ext.create("IssArt.notepad.Window");
		this.window.show();
	}
});
