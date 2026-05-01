pipeline {
    agent any

    tools {
        nodejs 'Node20'
    }

    stages {
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
                sh 'cd selenium-tests && pip install selenium && python test_login.py'
            }
        }
    }
}
