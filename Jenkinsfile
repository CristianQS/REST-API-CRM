pipeline {
  agent any
  environment {
    CI = 'true'
    HOME = '.'
  }
  stages {
    stage ('Install front Dependecies') {
      steps {
          sh 'docker-compose build'
        
      }
    }
    stage ('Test front') {
      steps {
          sh 'docker-compose run front npm run test:unit'
        
      }
    }
    stage ('Deploy front') {
      steps {
            sh 'docker-compose up -d'            
        
      }
    }
  }
}