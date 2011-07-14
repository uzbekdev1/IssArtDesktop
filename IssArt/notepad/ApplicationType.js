Ext.define("IssArt.notepad.ApplicationType", {
	extend: "IssArt.framework.ApplicationType",
	
	requires: [
		"IssArt.notepad.Application"
	],
	
	provider : null,
	tip      : IssArt.locale.Data.notepad.runNotepadApplication,
	iconCls  : "issart-notepad-icon"
},

function()
{
	this.prototype.provider = IssArt.notepad.Application;
}

);
