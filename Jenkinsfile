pipeline {
    agent any

    stages {
        stage('Install Backend') {
            steps {
                nodejs(nodeJSInstallationName: 'Node20') {
                    sh 'cd backend && npm install'
                }
            }
        }

        stage('Install Frontend') {
            steps {
                nodejs(nodeJSInstallationName: 'Node20') {
                    sh 'cd frontend && npm install'
                }
            }
        }

        stage('Run Selenium Tests') {
            steps {
                sh 'cd selenium-tests && pip install selenium && python test_login.py'
            }
        }
    }
}
