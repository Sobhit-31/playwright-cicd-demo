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

// pipeline {
//     agent any

//     environment {
//         DOCKER_IMAGE = 'playwright-tests'
//     }

//     stages {
//         stage('Checkout Code') {
//             steps {
//                 checkout([$class: 'GitSCM', branches: [[name: '*/main']], userRemoteConfigs: [[url: 'https://github.com/Sobhit-31/playwright-cicd-demo.git']]])
//             }
//         }

//         stage('Build Docker Image') {
//             steps {
//                 script {
//                     bat "docker build -t ${DOCKER_IMAGE} ."
//                 }
//             }
//         }

//         stage('Run Playwright Tests') {
//             steps {
//                 script {
//                     bat "docker run --rm ${DOCKER_IMAGE}"
//                 }
//             }
//         }
//     }

//     post {
//         always {
//             echo 'Cleaning up...'
//             script {
//                 bat "docker rmi ${DOCKER_IMAGE} || true"
//             }
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
        REPORT_DIR = 'playwright-reports'  // Directory to store Playwright reports
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Sobhit-31/playwright-cicd-demo.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image to run Playwright tests
                    bat 'docker build -t playwright-tests .'
                }
            }
        }

        stage('Run Playwright Tests') {
            steps {
                script {
                    // Run Playwright tests in Docker container
                    bat 'docker run --rm -v $(pwd)/$REPORT_DIR:/tests/results playwright-tests'

                    // Add some delay to ensure that the reports are generated
                    sleep(time: 5, unit: 'SECONDS')
                }
            }
        }

        stage('Archive Playwright Reports') {
            steps {
                script {
                    // Archive the Playwright test reports as Jenkins artifacts
                    archiveArtifacts artifacts: "${REPORT_DIR}/*.html", allowEmptyArchive: true
                }
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
