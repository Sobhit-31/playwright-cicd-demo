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


//working

// pipeline {
//     agent any

//     triggers {
//         cron('H/30 * * * *') // Runs every 30 minutes
//     }

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
//                     githubNotify context: 'Build', status: 'PENDING', description: 'Running Playwright Tests...'
//                     try {
//                         bat "docker run --rm ${DOCKER_IMAGE}"
//                         githubNotify context: 'Build', status: 'SUCCESS', description: 'Tests Passed!'
//                     } catch (e) {
//                         githubNotify context: 'Build', status: 'FAILURE', description: 'Tests Failed!'
//                         throw e
//                     }
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

    triggers {
        cron('H/30 * * * *') // Run every 30 minutes
    }

    environment {
        DOCKER_IMAGE = 'playwright-tests'
        EMAIL_RECIPIENTS = 'sobhit.mahalinga@knowledgeexcel.com'
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
                    // Instead of try-catch-throw, use catchError
                    catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
                        bat "docker run --name playwright_container ${DOCKER_IMAGE}"
                        bat "docker cp playwright_container:/app/playwright-report ./playwright-report"
                        bat "docker rm playwright_container"
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Build SUCCESS!'
            script {
                emailext (
                    to: env.EMAIL_RECIPIENTS,
                    subject: "✅ Jenkins SUCCESS: ${env.JOB_NAME} [#${env.BUILD_NUMBER}]",
                    body: """
<html>
<body>
<h2 style="color:green;">✅ Build SUCCESS</h2>
<p><strong>Project:</strong> ${env.JOB_NAME}</p>
<p><strong>Build Number:</strong> #${env.BUILD_NUMBER}</p>
<p><strong>Build URL:</strong> <a href="${env.BUILD_URL}">View Build</a></p>
<p><strong>Triggered By:</strong> ${env.BUILD_USER_ID ?: 'Timer/Cron/Auto'}</p>
<p><strong>Playwright report is generated in Jenkins Workspace ⬇️</strong></p>
</body>
</html>
""",
                    mimeType: 'text/html'
                )
            }
        }

        failure {
            echo 'Build FAILED!'
            script {
                emailext (
                    to: env.EMAIL_RECIPIENTS,
                    subject: "❌ Jenkins FAILURE: ${env.JOB_NAME} [#${env.BUILD_NUMBER}]",
                    body: """
<html>
<body>
<h2 style="color:red;">❌ Build FAILURE</h2>
<p><strong>Project:</strong> ${env.JOB_NAME}</p>
<p><strong>Build Number:</strong> #${env.BUILD_NUMBER}</p>
<p><strong>Build URL:</strong> <a href="${env.BUILD_URL}">View Build</a></p>
<p><strong>Triggered By:</strong> ${env.BUILD_USER_ID ?: 'Timer/Cron/Auto'}</p>
<p><strong>Playwright report is generated in Jenkins Workspace ⬇️</strong></p>
</body>
</html>
""",
                    mimeType: 'text/html'
                )
            }
        }

        always {
            echo 'Cleaning up Docker image...'
            script {
                bat "docker rmi ${DOCKER_IMAGE} || exit 0"
            }
        }
    }
}

