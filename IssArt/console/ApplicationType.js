// Описание приложения консоли Ajax-запросов
Ext.define("IssArt.console.ApplicationType", {
	extend: "IssArt.framework.ApplicationType",
	
	requires: [
		"IssArt.console.Application"
	],
	
	// override
	provider : null,
	tip      : IssArt.locale.Data.console.showAjaxConsole,
	iconCls  : "issart-console-icon"
},

function()
{
	this.prototype.provider = IssArt.console.Application;
}

);
