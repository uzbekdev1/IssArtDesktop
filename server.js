// �������� ��������� ����� Web-����������, Mock-������

Ext.ns('Server', 'Server.Api');

// �������� ���� ������
Server.data = {
	profile: {
		name					: "Egor Nepomnyaschih",
		notification			: false,
		experience				: 34,
		birthDate				: "1988-10-09"
	},
	
	notepads: {
		"ISS Art Blog": {
			name					: "ISS Art Blog",
			content					: '<font size="4"><span lang="en-US">Requirements ' +
				'management is a very important part of development process. ' +
				'Requirements management includes a set of measures intended to collect ' +
				'requirements from the customer, development plan, ranging according to ' +
				'the importance degree, time and cost estimation. </span></font><div class="serendipity_entry_body"><p align="justify"><font size="4"><span lang="en-US"></span></font><font size="4"><span lang="en-US">Requirements management process is meant to solve the following tasks: </span></font></p><ol><li><p style="margin-top: 0.2cm; margin-bottom: 0cm; line-height: 150%;" align="justify"><font size="4"><span lang="en-US">Document</span></font><font size="4"><span lang="en-US"> customer�s requirements.</span></font><font size="4"><span lang="en-US"><br>There ' +
				'is no need to repeat that all the customer�s requirements should be ' +
				'documented. Depending on the project size specification degree may ' +
				'change. The only fact remains that everything should be documented, ' +
				'discussed in details with the customer and confirmed by him.</span></font></p></li><li><p style="margin-top: 0.2cm; margin-bottom: 0cm; line-height: 150%;" align="justify"><font size="4"><span lang="en-US"></span></font><font size="4"><span lang="en-US">Achieve requirements comprehension before the realization start.<br><br>This will allow reducing risks for the customer to receive something different from what he is expecting. </span></font></p></li><li><p style="margin-top: 0.2cm; margin-bottom: 0cm; line-height: 150%;" align="justify"><font size="4"><span lang="en-US"></span></font><font size="4"><span lang="en-US">Help to define </span></font><font size="4"><span lang="en-US">discrepancies between the requirements and results.<br><br>The ' +
				'better the requirements are documented the easier are the results to ' +
				'test. This also reduced the risk of the customer to be disappointed ' +
				'with the result.</span></font></p></li><li><p style="margin-top: 0.2cm; margin-bottom: 0cm; line-height: 150%;" align="justify"><font size="4"><span lang="en-US"></span></font><font size="4"><span lang="en-US">Define the developers� obligations</span></font><font size="4"><span lang="en-US">.</span></font><font size="4"><span lang="en-US">Requirements realization is connec</span></font><font size="4"><span lang="en-US">ted with time and money expenses. The process of the requirements management allows controlling these parameters.</span></font></p></li><li><p style="margin-top: 0.2cm; margin-bottom: 0cm; line-height: 150%;" align="justify"><font size="4"><span lang="en-US"></span></font><font size="4"><span lang="en-US">Set a two-way requirements tracking control.</span></font><font size="4"><span lang="en-US">Within the </span></font><font size="4"><span lang="en-US">development ' +
				'process these requirements may vary: some requirements will become more ' +
				'detailed, some requirements will be added, some will be excluded. These ' +
				'changes may influence the project deadline and the budget. That is why ' +
				'it is necessary for both sides to have a real image of the current ' +
				'requirements. Only in this case it is possible to accomplish the ' +
				'project successfully.</span></font></p></li><li><p style="margin-top: 0.2cm; margin-bottom: 0cm; line-height: 150%;" align="justify"><font size="4"><span lang="en-US"></span></font><font size="4"><span lang="en-US">M</span></font><font size="4"><span lang="en-US">anage the changes.</span></font><font size="4"><span lang="en-US">The ' +
				'requirements change within the development process. We cannot resist ' +
				'this fact; we just have to manage this process effectively.</span></font></p></li></ol><p style="margin-top: 0.2cm; margin-bottom: 0cm; line-height: 150%;" align="justify"><font size="4"><span lang="en-US"></span></font><font size="4"><span lang="en-US">In this article</span></font><font size="4"><span lang="en-US"> we are going to describe the way of requirements management with the help of xPlanner (</span></font><u><a href="http://www.xplanner.org/"><font color="#000080" size="4"><span lang="en-US">www.xplanner.org</span></font></a></u><font size="4"><span lang="en-US">), which is to solve all the tasks mentioned above. </span></font></p>' +
				'</div>'
		}
	}
}

// �������� API �������
Server.Api["issart/action/getuser"] = function(params) {
	return Server.data.profile;
}

Server.Api["issart/action/setuser"] = function(params) {
	Ext.apply(Server.data.profile, params);
}

Server.Api["issart/action/getnotepad"] = function(params) {
	return Server.data.notepads[params.name];
}

Server.Api["issart/action/setnotepad"] = function(params) {
	Server.data.notepads[params.name] = {};
	Ext.apply(Server.data.notepads[params.name], params);
}

Server.Api["issart/action/getnotepads"] = function(params) {
	result = { notepads: [] };
	for (var i in Server.data.notepads) {
		var notepad = {};
		notepad.name	= i;
		notepad.content	= "";
		
		var inTag = false;
		var wasSpace = true;
		var content = Server.data.notepads[i].content;
		
		for (var i = 0; i < content.length; ++i) {
			if (content.charAt(i) == '<') {
				inTag = true;
				wasSpace = true;
			}
			else if (content.charAt(i) == '>') {
				inTag = false;
			}
			else if (!inTag) {
				if ((content.charAt(i) == ' ')  ||
					(content.charAt(i) == '\n') ||
					(content.charAt(i) == '\t')) {
					wasSpace = true;
				}
				else {
					if (wasSpace) {
						wasSpace = false;
						notepad.content += ' ';
					}
					notepad.content += content.charAt(i);
				}
			}
			if (notepad.content.length >= 50) {
				notepad.content += '...';
				break;
			}
		}
		
		result.notepads.push(notepad);
	}
	
	return result;
}

// ������ Ext.Ajax.request ��� �������� ��������
Ext.require([
	"Ext.data.Connection",
	
	"IssArt.console.model.ItemStore"
],

function() {
	
	var request = Ext.data.Connection.prototype.request;
	
	Ext.data.Connection.prototype.request = function(config)
	{
		if (config.url.substr(0, 14) != "issart/action/")
			return request.call(this, config);
		
		config.url = config.url.split("?")[0];
		
		setTimeout(function() {
			if (!Server.Api[config.url]) {
				Ext.callback(config.failure, config.scope, [{
					responseText: "{success:false,message:'Wrong API action name'}"
				}, config]);
				return;
			}
			
			var result = Server.Api[config.url](config.params) || {};
			result.success = true;
			
			var response = {
				responseText: Ext.encode(result)
			};
			
			var consoleItem = Ext.create("IssArt.console.model.Item", {
				url    : config.url,
				method : config.method,
				params : Ext.encode(config.params),
				result : response.responseText
			});
			
			IssArt.console.model.ItemStore.add(consoleItem);
			
			Ext.callback(config.success, config.scope, [response, config]);
			Ext.callback(config.callback, config.scope, [config, true, response]);
		}, 1000);
	}
	
});
