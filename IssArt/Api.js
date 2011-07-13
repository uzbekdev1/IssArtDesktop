Ext.ns('Art.Api');

Art.Api.BaseUrl = "art/action/";

Art.Api.Action = {
	getUser					: Art.Api.BaseUrl + "getuser",
	setUser					: Art.Api.BaseUrl + "setuser",
	getNotepad				: Art.Api.BaseUrl + "getnotepad",
	setNotepad				: Art.Api.BaseUrl + "setnotepad",
	getNotepads				: Art.Api.BaseUrl + "getnotepads"
}
