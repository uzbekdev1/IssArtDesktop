// Модель списка файлов блокнота
Ext.define("IssArt.notepad.model.NotepadStore", {
	extend: "Ext.data.Store",
	
	requires: [
		"IssArt.notepad.model.Notepad"
	],
	
	model    : "IssArt.notepad.model.Notepad",
	autoLoad : true,
	
	proxy: {
		type : "ajax",
		url  : "issart/action/getnotepads",
		
		reader: {
			type : "json",
			root : "notepads"
		}
	}
});
