pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Sobhit-31/playwright-cicd-demo.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t playwright-tests .'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh 'docker run --rm playwright-tests'
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
        }
        success {
            echo 'Build SUCCESS!'
        }
        failure {
            echo 'Build FAILED!'
        }
    }
}
