pipeline {
    agent any
    environment {
        CI = 'true'
    }
    stages {
        stage('Build Back') {
            steps {
                sh 'cd back && npm install'
                sh 'cd back && screen -d -m -S screen.npmStart npm start'
            }
        }
        
        // stage('Test Back') {
        //     steps {
        //         sh 'cd back && npm test'
        //     }
        // }
        
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
