pipeline {
    agent any

    stages {
        stage('Install Backend') {
            steps {
                sh 'docker run --rm -v /var/lib/docker/volumes/jenkins_home/_data/workspace/devops-assign3:/app -w /app/backend node:20 npm install'
            }
        }

        stage('Install Frontend') {
            steps {
                sh 'docker run --rm -v /var/lib/docker/volumes/jenkins_home/_data/workspace/devops-assign3:/app -w /app/frontend node:20 npm install'
            }
        }

        stage('Run Selenium Tests') {
            steps {
                sh 'docker run --rm -v /var/lib/docker/volumes/jenkins_home/_data/workspace/devops-assign3:/app -w /app/selenium-tests python:3.10 bash -c "pip install selenium && python test_login.py"'
            }
        }
    }
}
