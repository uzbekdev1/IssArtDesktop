Ext.ns('Art');

Art.Util = {
	onFailure: function(response, options) {
		Ext.Msg.alert(
			Art.Locale.Message.failure,
			response.responseText);
	}
}
