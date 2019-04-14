pipeline {
    agent any
    environment {
        registry = "eu.gcr.io/riptides/ui"
        registryUrl = "https://eu.gcr.io/riptides"
        dockerImage = ''
    }
    stages {
        stage('Cloning Git') {
            steps {
                sh 'git clone git@github.com:skyerus/riptides.git'
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