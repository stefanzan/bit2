bit2: x
url : https://github.com/wso2/product-apim/commit/37d6be96e99cd09341930ab61174acae49bab1c0
file: modules/distribution/resources/api_templates/velocity_template.xml
desc: change if condition
diff: 
-  #if( $endpoint_config.get("endpoint_type") == 'custom_backend' )
+  #if( $endpoint_config.get("endpoint_type") == 'sequence_backend' )