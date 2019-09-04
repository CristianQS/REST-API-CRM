pipeline {
  agent any
  environment {
    CI = 'true'
    HOME = '.'
  }
stages {
    stage ('Install front Dependecies') {
      steps {
        sh 'docker-compose down'
        sh 'docker-compose build'
        sh 'docker-compose run back npm install'
        dir('./resources/docker/') {
          sh 'docker-compose build'
        }
      }
    }
    stage ('Test front') {
      steps {
        dir('./resources/docker/') {
          sh 'docker-compose up -d'
        }
        sh 'docker-compose run back npm run test'
        dir('./resources/docker/') {
          sh 'docker-compose down'
        }
      }
    }
    stage ('Deploy front') {
      steps {
        sh 'docker-compose up -d'            
      }
    }
  }
  post {
    failure {
      dir('./resources/docker/') {
        sh 'docker-compose down'
      }
    }
  }
}