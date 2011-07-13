Ext.ns('Art.Notepad');

Art.Notepad.Application = Ext.extend(Art.Framework.Application, {
	run: function() {
		this.window = new Art.Notepad.Window();
		
		Dom.viewport.desktop.regWindow(this.window);
		
		this.window.show();
	}
});

Ext.reg('Art.Notepad.Application', Art.Notepad.Application);
