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
        stage('Test Back') {
            steps {
                sh 'cd back && npm test'
            }
        }
        stage('Deploy Back') {
            steps {
                sh 'cd back && npm run build'
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
