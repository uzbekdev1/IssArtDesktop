// Поскольку строки локализации всюду используются в конфигурациях классов,
// мы вынуждены загрузить локализацию до всего остального
Ext.require("IssArt.locale.Locale");

Ext.onReady(function() {
	// Как только локализация загружена, приступаем к загрузке классов
	// приложения
	Ext.require([
		"Ext.tip.QuickTipManager",
		"IssArt.viewport.Viewport"
	]);
	
	Ext.onReady(function() {
		// Инициализируем красивые подсказки
		Ext.tip.QuickTipManager.init();
		
		// Создаем Viewport и устанавливаем глобальную точку доступа к нему
		window.issArtViewport = Ext.create("IssArt.viewport.Viewport");
	});
});
