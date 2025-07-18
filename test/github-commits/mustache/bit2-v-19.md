bit2: √
url : https://github.com/OfficeDev/microsoft-365-agents-toolkit/commit/06961b8d25745414503c108e0cfa77b56ef38f3d
file: templates/constraints/yml/templates/js/sso-tab-with-obo-flow/teamsapp.local.yml.tpl.mustache
desc: delete constant text
diff: 
- {{#devToolInstall}} devCert, func, dotnet, funcToolsVersion: ~4.0.5455 {{/devToolInstall}}
+ {{#devToolInstall}} devCert, func, funcToolsVersion: ~4.0.5455 {{/devToolInstall}}