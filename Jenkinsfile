pipeline {
    agent any

    stages {

        stage('Clone Repo') {
            steps {
                git 'https://github.com/maira-tech1/devops-assign3'
            }
        }

        stage('Install Backend') {
            steps {
                sh 'cd backend && npm install'
            }
        }

        stage('Install Frontend') {
            steps {
                sh 'cd frontend && npm install'
            }
        }

        stage('Run Selenium Tests') {
            steps {
                sh 'cd tests && python3 test_login.py'
            }
        }
    }
}
