pipeline {
    agent any
    environment {
        CI = 'true'
    }
    stages {
        stage('Build Back') {
            steps {
                sh 'cd back && npm install'
            }
        }
        
        stage('Deploy Back') {
            steps {
                sh 'cd back && setsid npm start >/dev/null 2>&1 < /dev/null &'
                
            }
        }
        stage('Test Back') {
            steps {
                sh 'cd back && npm test'
            }
        }
        stage('Build Front') {
            steps {
                sh 'cd front && npm install --legacy-peer-deps'
            }
        }
        stage('Deploy Front') {
            steps {
                sh 'cd front && setsid ng serve >/dev/null 2>&1 < /dev/null &'
            }
        }
    }
}
