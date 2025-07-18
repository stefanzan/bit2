bit2: x
url : https://github.com/aklivity/zilla-plus-aws-templates/commit/6c9da63bebe751eb98cf93c23fd68c1cc423b0ba#diff-8b190c02f61c61be9644ef618cb89dafc660c1f321191eb7e461b2386cd2bbeb
file: amazon-msk/cdk/secure-private-access/zilla.yaml.mustache
desc: a special feature related to mustache, using "{{{" instead of "{{" 
diff: 
-          namespace: {{cloudwatch.metrics.namespace}}
+          namespace: {{{cloudwatch.metrics.namespace}}}