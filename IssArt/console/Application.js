Ext.define("IssArt.console.Application", {
	extend: "IssArt.framework.Application",
	
	requires: [
		"Ext.MessageBox",
		
		"IssArt.console.Window"
	],
	
	// readonly
	window: null,
	
	// override
	run: function()
	{
		var store = IssArt.console.model.ItemStore;
		if (store.getCount())
		{
			this.window = Ext.create("IssArt.console.Window");
			this.window.show();
		}
		else
		{
			Ext.Msg.alert(
				IssArt.locale.Data.message.failure,
				IssArt.locale.Data.console.noRequestsSentYet
			);
		}
	}
});
