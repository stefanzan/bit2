bit2: √
url : https://github.com/zakaria68K/ecore/commit/d05c358e9b8c768de73b4dc5f4680ba2e3b35426
desc: add newlines
diff:

[comment encoding = UTF-8 /]
 [module main('http://ezdevops2.0com')]
 
 
 [template public generateElement(aconfig : config)]
 [comment @main/]
     [file('src/jenkinsFile', false, 'UTF-8')]
 
 		node {
 	agent 
 	  docker { image config.agent.type }
  }
 
 def dockerImageTag = "${[name/]:${env.BUILD_NUMBER}"
 
   try {
     notifyBuild('STARTED')
 
     stage('Clone repository') {
       git url:"[stages.cloning.url/]",
           credentialsId: "[stages.cloning.credentialID/]",
           branch:"[stages.cloning.branch/]"
     }
 
 
 stage('Run integration & unit tests') {
        withCredentials([ '[' /] 
         string(credentialsId: 'test-database-url', variable: 'TEST_DATABASE_URL'),
         string(credentialsId: 'test-database-username', variable: 'TEST_DATABASE_USERNAME'),
         string(credentialsId: 'test-database-password', variable: 'TEST_DATABASE_PASSWORD')
       [ ']' /] ) 
 
+ 
+ 
     [for (named : String | stages.tests.classestotest.tokenize(', '))]
           sh "./mvnw test -Dspring.profiles.active=prod -Dspring.datasource.url=$TEST_DATABASE_URL -Dspring.datasource.username=$TEST_DATABASE_USERNAME -Dspring.datasource.password=$TEST_DATABASE_PASSWORD -Dtest=\"[named/]""
         [/for]
 
 
       }
     }
 
 
  stage('Build Docker image') {
       sh "docker build -t ${dockerImageTag} ."
     }
 
  stage('Deploy Docker image') {
       echo "Docker Image Tag Name: ${dockerImageTag}"
       echo "Logging in to Docker Hub..."
 
       withCredentials([ '[' /] 
         usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')
       [ ']' /] ) {
         sh 'docker login -u $DOCKERHUB_USERNAME -p $DOCKERHUB_PASSWORD'
       }
 
       echo "Pushing image..."
       sh "docker push ${dockerImageTag}"
     }
   } finally {
     notifyBuild('FINISHED')
   }
     [/file]
 
 [/template]