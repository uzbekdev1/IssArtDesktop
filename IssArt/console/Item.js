Ext.define("IssArt.console.Item", {
	extend: "Ext.panel.Panel",
	
	requires: [
		"Ext.XTemplate",
		
		"IssArt.console.model.Item"
	],
	
	config: {
		record: null // IssArt.console.model.Item
	},
	
	// override
	anchor       : "100%",
	style        : "margin-bottom:5px;",
	bodyStyle    : "padding:5px;",
	collapsible  : true,
	collapsed    : true,
	animCollapse : true,
	
	// readonly
	titleTpl   : null,
	contentTpl : null,
	
	initComponent: function()
	{
		this.title = this.  titleTpl.apply(this.record.data);
		this.html  = this.contentTpl.apply(this.record.data);
		
		this.callParent(arguments);
	}
},

function()
{
	this.prototype.titleTpl = new Ext.XTemplate("{method}: {url}");
	
	this.prototype.contentTpl = new Ext.XTemplate(
		'<div class="issart-console-item-content">',
			'<div class="issart-console-item-header">Params:</div>',
			'<textarea readonly="readonly" class="issart-console-item-textarea" rows=3>{params}</textarea>',
			'<div class="issart-console-item-header">Result:</div>',
			'<textarea readonly="readonly" class="issart-console-item-textarea" rows=6>{result}</textarea>',
		'</div>'
	);
}

);
