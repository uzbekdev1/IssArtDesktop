// Вспомогательные утилиты
Ext.define("IssArt.util.Util", {
	singleton: true,
	
	requires: [
		"Ext.MessageBox"
	],
	
	// Универсальный обработчик проваленных Ajax-запросов
	onFailure: function(response, options)
	{
		Ext.Msg.alert(
			IssArt.locale.Data.message.failure,
			response.responseText
		);
	}
});
