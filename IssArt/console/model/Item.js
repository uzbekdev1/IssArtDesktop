Ext.define("IssArt.console.model.Item", {
	extend: "Ext.data.Model",
	
	fields: [
		{ name: "url",    type: "string" },
		{ name: "method", type: "string" },
		{ name: "params", type: "string" },
		{ name: "result", type: "string" }
	]
});
