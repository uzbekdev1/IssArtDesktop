Ext.define("IssArt.util.Util", {
	singleton: true,
	
	requires: [
		"Ext.window.MessageBox"
	],
	
	onFailure: function(response, options)
	{
		Ext.Msg.alert(
			IssArt.locale.Data.message.failure,
			response.responseText
		);
	}
});
