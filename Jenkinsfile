pipeline {
  agent any
  environment {
    CI = 'true'
    HOME = '.'
  }
  stages {
    stage ('Install front Dependecies') {
      steps {
        sh 'sudo docker-compose build'
      }
    }
    stage ('Test front') {
      steps {
        sh 'sudo docker-compose run back npm run test'
      }
    }
    stage ('Deploy front') {
      steps {
        sh 'sudo docker-compose up'            
      }
    }
  }
}