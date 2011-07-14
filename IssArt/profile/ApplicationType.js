// Описание приложения редактора профиля
Ext.define("IssArt.profile.ApplicationType", {
	extend: "IssArt.framework.ApplicationType",
	
	requires: [
		"IssArt.profile.Application"
	],
	
	// override
	provider : null,
	tip      : IssArt.locale.Data.profile.runProfileEditorApplication,
	iconCls  : "issart-profile-icon"
},

function()
{
	this.prototype.provider = IssArt.profile.Application;
}

);
