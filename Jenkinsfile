pipeline {
    agent {
        docker { image 'node:16.13.0' }
    }
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
                sh 'cd back && npm start'
            }
        }
        stage('Test Back') {
            steps {
                sh 'cd back && npm test'
            }
        }
        stage('Build Front') {
            steps {
                sh 'cd front && npm install'
            }
        }
        stage('Deploy Front') {
            steps {
                sh 'cd front && ng serve'
            }
        }
    }
}
