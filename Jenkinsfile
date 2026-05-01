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
                sh 'cd selenium-tests && npm install selenium-webdriver && node e2e.js'
            }
        }
    }

    post {
        always {
            emailext(
                to: 'qasimalik@gmail.com',
                subject: "Jenkins Pipeline - ${currentBuild.fullDisplayName} - ${currentBuild.currentResult}",
                body: """
                    <h2>Jenkins Pipeline Result</h2>
                    <p><b>Project:</b> ${env.JOB_NAME}</p>
                    <p><b>Build Number:</b> ${env.BUILD_NUMBER}</p>
                    <p><b>Status:</b> ${currentBuild.currentResult}</p>
                    <p><b>Triggered by:</b> ${env.GIT_COMMITTER_NAME ?: 'Unknown'}</p>
                    <p><b>Commit:</b> ${env.GIT_COMMIT}</p>
                    <p>Check full logs at: <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
                """,
                mimeType: 'text/html'
            )
        }
    }
}
