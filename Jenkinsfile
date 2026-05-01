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

        stage('Start Apps') {
            steps {
                sh 'cd backend && nohup node server.js > /tmp/backend.log 2>&1 &'
                sh 'sleep 5'
                sh 'cd frontend && nohup npm run dev -- --host 0.0.0.0 > /tmp/frontend.log 2>&1 &'
                sh 'sleep 15'
            }
        }

        stage('Run Selenium Tests') {
            steps {
                sh 'rm -rf devops-assign3-tests'
                sh 'git clone https://github.com/maira-tech1/devops-assign3-tests'
                sh 'cd devops-assign3-tests && npm install selenium-webdriver && node e2e.js'
            }
        }
    }

    post {
        always {
            sh 'pkill -f "node server.js" || true'
            sh 'pkill -f "vite" || true'
            emailext(
                to: 'mairamalyk13@gmail.com',
                subject: "Jenkins Build - ${env.JOB_NAME} - ${currentBuild.currentResult}",
                body: """
                    <h2>Jenkins Pipeline Result</h2>
                    <p><b>Status:</b> ${currentBuild.currentResult}</p>
                    <p><b>Build Number:</b> ${env.BUILD_NUMBER}</p>
                    <p><b>Triggered by GitHub push</b></p>
                    <p><b>Logs:</b> <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
                """,
                mimeType: 'text/html'
            )
        }
    }
}
