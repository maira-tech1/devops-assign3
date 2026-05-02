pipeline {
    agent any

    tools {
        nodejs 'Node20'
    }

    environment {
        PUSHER_EMAIL = sh(script: "git log -1 --pretty=format:'%ae'", returnStdout: true).trim()
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
                sh 'pkill -f "node server.js" || true'
                sh 'pkill -f "vite" || true'
                sh 'sleep 2'
                sh 'docker exec -d jenkins bash -c "export PATH=\\$PATH:/var/jenkins_home/tools/jenkins.plugins.nodejs.tools.NodeJSInstallation/Node20/bin && cd /var/jenkins_home/workspace/devops-assign3/backend && node server.js > /var/jenkins_home/backend.log 2>&1"'
                sh 'sleep 5'
                sh 'docker exec -d jenkins bash -c "export PATH=\\$PATH:/var/jenkins_home/tools/jenkins.plugins.nodejs.tools.NodeJSInstallation/Node20/bin && cd /var/jenkins_home/workspace/devops-assign3/frontend && npm run dev -- --host 0.0.0.0 > /var/jenkins_home/frontend.log 2>&1"'
                sh 'sleep 20'
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
            emailext(
                to: "${env.PUSHER_EMAIL}",
                subject: "Jenkins Build - ${env.JOB_NAME} - ${currentBuild.currentResult}",
                body: """
                    <h2>Jenkins Pipeline Result</h2>
                    <p><b>Status:</b> ${currentBuild.currentResult}</p>
                    <p><b>Triggered by:</b> ${env.PUSHER_EMAIL}</p>
                    <p><b>Live URL:</b> <a href="http://43.205.238.40:5173">http://43.205.238.40:5173</a></p>
                    <p><b>Logs:</b> <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
                """,
                mimeType: 'text/html'
            )
        }
    }
}
