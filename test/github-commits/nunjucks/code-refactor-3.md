bit2: x
url : https://github.com/govuk-one-login/authentication-frontend/commit/35b23cf3985f56209d08013dedfec0c2ad5de822#diff-260f22a8b4fc66766cf645bfb4d58a71d86f5eb23e2034f31bbf87c5813acbb9
file: src/components/prove-identity-callback/index-new-spinner.njk
diff: change expression 
- data-initial-heading="{{ 'pages.proveIdentityCheckNew.progressivelyEnhancedVersion.initial.heading' | translate + serviceName }}"
+ data-initial-heading="{{ 'pages.proveIdentityCheckNew.progressivelyEnhancedVersion.initial.heading' | translate }}{{ serviceName }}"