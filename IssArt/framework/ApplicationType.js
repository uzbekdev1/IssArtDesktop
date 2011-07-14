// Абстрактное описание приложения
Ext.define("IssArt.framework.ApplicationType", {
	config: {
		provider : null, // класс-потомок IssArt.framework.Application
		tip      : null, // String, подсказка
		iconCls  : null  // String, CSS-класс иконки приложения
	}
});
