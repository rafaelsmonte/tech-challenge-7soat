#!/bin/bash

#==============================================================================
# File: run.sh
# Author: Thiago Thalison Firmino de Lima (Intelbras)
# Date: 19 jul 2024
# Brief: Commands to programatically manage EKS cluster Activities
#==============================================================================

#==============================================================================
# Commands
#==============================================================================
case "$1" in

  #============================================================================
  # Method: update-aws-auth
  # Description: This method allows associating AWS User to EKS cluster so that
  #              the user can operate the cluster. We use this to operate the
  #              cluster through AWS Console.
  #============================================================================
  update-aws-auth)
    kubectl edit configmap/aws-auth -n kube-system
  ;;

  #============================================================================
  # Method: db-connect
  # Description: Creates a proxy for the database to be accessed through
  #              localhost
  #============================================================================
  db-connect)
    kubectl port-forward pod/tech-challenge-7soat-statefulset-db-0 5432:5432 -n default
  ;;

  #============================================================================
  # Method: grafana-psw
  # Description: Retrieves Grafana console password
  #============================================================================
  grafana-psw)
    $kubectl get secret --namespace default grafana -o jsonpath="{.data.admin-password}" | base64 --decode ; echo
  ;;

  #============================================================================
  # Method: grafana-connect
  # Description: Creates a proxy for grafana console to be accessed through
  #              localhost
  #============================================================================
  grafana-connect)
    kubectl port-forward service/tech-challenge-7soat-grafana-service 3000:3000
  ;;

  #============================================================================
  # Method: prometheus-connect
  # Description: Creates a proxy for prometheus to be accessed through
  #              localhost
  #============================================================================
  prometheus-connect)
    kubectl port-forward service/tech-challenge-7soat-prometheus-service 9090:9090
  ;;

  #============================================================================
  # Method: ecr-login
  # Description: Login on ECR and update docker with the credentials
  #============================================================================
  ecr-login)
    aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 839260668425.dkr.ecr.us-east-1.amazonaws.com
  ;;

  #============================================================================
  # Method: ecr-logout
  # Description: Logout ECR
  #============================================================================
  ecr-logout)
    aws ecr get-login-password --region us-east-1 | docker logout 839260668425.dkr.ecr.us-east-1.amazonaws.com
  ;;

  #============================================================================
  # Method: deploy-api
  # Description: Build API docker image and pushes to ECR
  #============================================================================
  update-api-image)
    export BUILD_VERSION=$(date +%y%m%d%I%M%S)
    export ECR_URI=$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY_NAME
    docker build -t $API_IMAGE_NAME -f docker/Dockerfile .
    docker tag $API_IMAGE_NAME:latest $ECR_URI:$API_IMAGE_NAME-$BUILD_VERSION
    docker push $ECR_URI:$API_IMAGE_NAME-$BUILD_VERSION
    docker rmi $API_IMAGE_NAME:latest $ECR_URI:$API_IMAGE_NAME-$BUILD_VERSION
  ;;

  *)
    echo "Usage: ./eks-cluster-mng.sh [update-aws-auth|db-connect]"
  ;;

esac
