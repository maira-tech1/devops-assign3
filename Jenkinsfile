pipeline {
    agent {
        docker {
            image 'markhobson/node-chrome:latest' // Pre-built Docker Image with Node & Headless Chrome installed
            args '-u root --shm-size=2gb --privileged' 
        }
    }

    environment {
        // Mail settings for Jenkins post-actions
        RECIPIENT = 'qasimalik@gmail.com'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source repository from GitHub...'
                checkout scm
            }
        }
        
        stage('Install Main App Dependencies') {
            steps {
                echo 'Installing Backend and Frontend Dependencies...'
                dir('backend') {
                    sh 'npm install'
                }
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Launch App Environment') {
            steps {
                echo 'Starting backend & frontend via background services...'
                dir('backend') {
                    sh 'nohup node server.js > backend.log 2>&1 &'
                }
                dir('frontend') {
                    sh 'nohup npm run dev -- --host > frontend.log 2>&1 &'
                }
                
                // Allow the app a few seconds to start up completely
                sleep time: 10, unit: 'SECONDS'
            }
        }

        stage('Install Selenium Dependencies') {
            steps {
                echo 'Installing Selenium Webdriver test suite dependencies...'
                dir('selenium-tests') {
                    sh 'npm install'
                }
            }
        }

        stage('Automated Selenium Testing') {
            steps {
                echo 'Executing 15+ End-to-End Test Cases required for Assignment...'
                dir('selenium-tests') {
                    // Running headless chrome via selenium JS script
                    sh 'npm test'
                }
            }
        }
    }

    post {
        always {
            echo 'Archiving log files...'
            archiveArtifacts artifacts: '**/*.log', allowEmptyArchive: true
        }
        success {
            echo 'Pipeline test stage executed successfully!'
            mail to: "${RECIPIENT}",
                 subject: "SUCCESS: Jenkins Selenium Testing pipeline successful for Nexus ERP",
                 body: "Hi Sir Qasim,\n\nThe pipeline for Final Year Project module (Nexus ERP) ran perfectly.\nAll automated Selenium tests executing via the GitHub commit have passed successfully!\n\nBest Regards,\nYour Student."
        }
        failure {
            echo 'Pipeline encountered failures in the Test stage.'
            mail to: "${RECIPIENT}",
                 subject: "FAILED: Automated Selenium tests failed",
                 body: "Hi Sir Qasim,\n\nThe automated Selenium test cases encountered some errors during execution.\nPlease check the Jenkins logs on AWS EC2.\n\nBest Regards,\nYour Student."
        }
    }
}
