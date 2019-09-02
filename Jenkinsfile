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
        sh 'docker-compose run back npm install'
      }
    }
    stage ('Test front') {
      steps {
        sh 'docker-compose run back npm run test'
      }
    }
    stage ('Deploy front') {
      steps {
        sh 'docker-compose up -d'            
      }
    }
  }
}