// pipeline {
//     agent any

//     stages {
//         stage('Checkout Code') {
//             steps {
//                 git branch: 'main', url: 'https://github.com/Sobhit-31/playwright-cicd-demo.git'
//             }
//         }

//         stage('Build Docker Image') {
//             steps {
//                 bat 'docker build -t playwright-tests .'
//             }
//         }

//         stage('Run Playwright Tests') {
//             steps {
//                 bat 'docker run --rm playwright-tests'
//             }
//         }
//     }

//     post {
//         always {
//             echo 'Cleaning up...'
//         }
//         success {
//             echo 'Build SUCCESS!'
//         }
//         failure {
//             echo 'Build FAILED!'
//         }
//     }
// }

pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'playwright-tests'
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], userRemoteConfigs: [[url: 'https://github.com/Sobhit-31/playwright-cicd-demo.git']]])
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    bat "docker build -t ${DOCKER_IMAGE} ."
                }
            }
        }

        stage('Run Playwright Tests') {
            steps {
                script {
                    githubNotify context: 'Build', status: 'PENDING', description: 'Running Playwright Tests...'
                    try {
                        bat "docker run --rm ${DOCKER_IMAGE}"
                        githubNotify context: 'Build', status: 'SUCCESS', description: 'Tests Passed!'
                    } catch (e) {
                        githubNotify context: 'Build', status: 'FAILURE', description: 'Tests Failed!'
                        throw e
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
            script {
                bat "docker rmi ${DOCKER_IMAGE} || true"
            }
        }
        success {
            echo 'Build SUCCESS!'
        }
        failure {
            echo 'Build FAILED!'
        }
    }
}
