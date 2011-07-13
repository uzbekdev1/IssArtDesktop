Ext.ns('Art.Profile');

Art.Profile.Application = Ext.extend(Art.Framework.Application, {
	run: function() {
		this.window = new Art.Profile.Window();
		
		this.window.show();
	}
});

Ext.reg('Art.Profile.Application', Art.Profile.Application);
