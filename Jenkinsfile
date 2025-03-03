pipeline {
  agent any
  stages {
    stage('clone ') {
      steps {
        git(url: 'https://github.com/cuizs/user-persona-web.git', branch: 'master')
      }
    }

    stage('Install Dependencies') {
      steps {
        nvm(version: '14.17.0') {
          sh 'npm install'
        }

      }
    }

  }
}