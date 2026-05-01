pipeline {
    agent any

    stages {
        stage('Install Backend') {
            steps {
                sh 'docker run --rm -v ${WORKSPACE}:/app -w /app/backend node:18 npm install'
            }
        }

        stage('Install Frontend') {
            steps {
                sh 'docker run --rm -v ${WORKSPACE}:/app -w /app/frontend node:18 npm install'
            }
        }

        stage('Run Selenium Tests') {
            steps {
                sh 'docker run --rm -v ${WORKSPACE}:/app -w /app/selenium-tests python:3.10 bash -c "pip install selenium && python test_login.py"'
            }
        }
    }
}
