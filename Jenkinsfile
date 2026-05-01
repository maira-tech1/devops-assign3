pipeline {
    agent any

    stages {

        stage('Install Backend') {
            steps {
                sh '''
                docker run --rm -v $(pwd):/app -w /app/backend node:18 npm install
                '''
            }
        }

        stage('Install Frontend') {
            steps {
                sh '''
                docker run --rm -v $(pwd):/app -w /app/frontend node:18 npm install
                '''
            }
        }

        stage('Run Selenium Tests') {
            steps {
                sh '''
                docker run --rm -v $(pwd):/app -w /app/tests python:3.10 bash -c "pip install selenium && python test_login.py"
                '''
            }
        }
    }
}
