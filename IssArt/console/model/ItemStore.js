// Модель списка записей в консоли Ajax-запросов (класс-одиночка)
Ext.define("IssArt.console.model.ItemStore", {
	extend: "Ext.data.Store",
	
	requires: [
		"IssArt.console.model.Item"
	],
	
	singleton: true,
	
	model: "IssArt.console.model.Item"
});
