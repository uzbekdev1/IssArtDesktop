Ext.define("IssArt.ui.form.AutoFocus", {
	extend: "Ext.util.Observable",
	
	// config
	field  : 0,    // String/Number/Ext.Component, элемент, которому дать фокус
	window : null, // Ext.window.Window, элемент получит фокус при открытии этого окна
	
	// readonly
	form: null, // Ext.form.Panel
	
	// override
	init: function(form)
	{
		this.form = form;
		this.window.on("show", this.onFormRender, this);
	},
	
	// private
	onFormRender: function()
	{
		switch (typeof this.field) {
			case "string":
				this.focusField(this.findFieldById(this.field));
				break;
			case "number":
				this.focusField(this.findFieldByIndex(this.field));
				break;
			case "object":
				this.focusField(this.field);
				break;
		}
	},
	
	// private
	getVisitor: function(
		leafFunctor) // callback(Ext.Component)
	{
		function visitor(item)
		{
			if (!item.isXType("container"))
				return leafFunctor(item);
			
			var index = 0;
			while (true)
			{
				var subItem = item.getComponent(index);
				if (Ext.isEmpty(subItem))
					return null;
				
				result = visitor(subItem);
				if (!Ext.isEmpty(result))
					return result;
				
				++index;
			}
		}
		
		return visitor;
	},
	
	// private
	findFieldById: function(id)
	{
		var functor = function(item)
		{
			if (item.getId() == id)
				return item;
			
			return null;
		}
		
		return this.getVisitor(functor)(this.form);
	},
	
	// private
	findFieldByIndex: function(index)
	{
		var cur = 0;
		var functor = function(item)
		{
			if (cur == index)
				return item;
			
			++cur;
			return null;
		}
		
		return this.getVisitor(functor)(this.form);
	},
	
	// private
	focusField: function(field)
	{
		if (!Ext.isObject(field))
			return;
		
		field.focus();
	}
});
