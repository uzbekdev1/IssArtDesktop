// ��������������� �������
Ext.define("IssArt.util.Util", {
	singleton: true,
	
	requires: [
		"Ext.MessageBox"
	],
	
	// ������������� ���������� ����������� Ajax-��������
	onFailure: function(response, options)
	{
		Ext.Msg.alert(
			IssArt.locale.Data.message.failure,
			response.responseText
		);
	}
});
