pipeline {
    agent any
    environment {
        registry = "eu.gcr.io/riptides/ui"
        registryUrl = "https://eu.gcr.io/riptides"
        dockerImage = ''
    }
    stages {
        stage('Cloning Git and prepping build') {
            steps {
                sh 'rm -r *'
                sh 'git clone git@github.com:skyerus/riptides.git'
                dir('riptides') {
                    sh 'mv .env.prod .env'
                    sh 'npm install'
                    sh 'npm run build'
                    sh 'find ! -name \'Dockerfile\' -maxdepth 1 -type f -delete'
                    sh 'rm -rf node_modules'
                    sh 'rm -rf public_html'
                    sh 'rm -rf src'
                }
            }
        }
        stage('Building image') {
          steps{
            script {
                dockerImage = docker.build("${env.registry}:build-${BUILD_NUMBER}", "--no-cache ./riptides")
            }
          }
        }
        stage('Deploy Image') {
          steps{
            script {
                docker.withRegistry( registryUrl, 'gcr:riptides-gcr' ) {
                    dockerImage.push()
                }
            }
          }
        }
        stage('Remove Unused docker image & git repo') {
          steps{
            sh "docker rmi $registry:build-$BUILD_NUMBER"
            sh "rm -Rf riptides"
          }
        }
    }
}