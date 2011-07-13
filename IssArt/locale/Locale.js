Ext.define("IssArt.locale.Locale", {
	requires: [
		"Ext.Ajax",
		"Ext.JSON"
	]
},

function()
{
	Ext.Loader.numPendingFiles++;
	
	function onSuccess(response)
	{
		IssArt.locale.Data = Ext.JSON.decode(response.responseText);
		Ext.Loader.onFileLoaded("IssArt.locale.Data", Ext.Loader.getPath("IssArt.locale.Data"));
		
		/*
		Ext.Loader.numPendingFiles--;
		
		if (Ext.Loader.numPendingFiles === 0)
			Ext.Loader.refreshQueue();
			
		if (Ext.Loader.numPendingFiles <= 1)
			window.status = "Finished loading all dependencies, onReady fired!";
		else
			window.status = "Loading dependencies, " + Ext.Loader.numPendingFiles + " files left...";*/
	}
	
	Ext.Ajax.request({
		url     : "/IssArt/locale/lang/en.json",
		success : onSuccess,
		scope   : this
	});
}

);
