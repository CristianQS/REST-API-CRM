pipeline {
  agent any
  environment {
    CI = 'true'
    HOME = '.'
  }
stages {
    stage ('Stop docker containers') {
      steps {
        sh 'docker stop crm-rest-apimaster_back_1'
      }
    }
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