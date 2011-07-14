Ext.define("IssArt.console.ApplicationType", {
	extend: "IssArt.framework.ApplicationType",
	
	requires: [
		"IssArt.console.Application"
	],
	
	provider : null,
	tip      : IssArt.locale.Data.profile.showAjaxConsole,
	iconCls  : "issart-console-icon"
},

function()
{
	this.prototype.provider = IssArt.console.Application;
}

);
