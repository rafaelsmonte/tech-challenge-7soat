#!/bin/bash

#==============================================================================
# File: run.sh
# Author: Thiago Thalison Firmino de Lima (Intelbras)
# Date: 19 jul 2024
# Brief: Commands to programatically manage EKS cluster
#==============================================================================

#==============================================================================
# Environment Variables
#==============================================================================
# API: Docker Build
export SERVICE_PORT=3000
export API_IMAGE_NAME=tech-challenge-7soat-api

# AWS: Config
export AWS_ACCOUNT_ID=839260668425
export AWS_REGION=us-east-1

# AWS: ECR Config
export ECR_REPOSITORY_NAME=tech-challenge-7soat-ecr-api

# AWS: EKS Cluster
export EKS_CLUSTER_NAME=tech-challenge-7soat
export EKS_CLUSTER_ROLE=arn:aws:iam::839260668425:role/AWS_EKS_ROLE
export EKS_SUBNET_IDS=subnet-0d501603dbb6981a0,subnet-0628055b427ab2fe6
export EKS_SECURITY_GROUP_IDS=sg-0b60838921e123654
export EKS_NODE_GROUP_NAME=tech-challenge-7soat-node-group
export EKS_NODE_GROUP_ROLE=arn:aws:iam::839260668425:role/AWS_EKS_NODE_GROUP_ROLE
export EKS_NODE_GROUP_SUBNETS=subnet-0d501603dbb6981a0 subnet-0628055b427ab2fe6
export EKS_NODE_GROUP_SCALING_CONFIG=minSize=1,maxSize=4,desiredSize=1
export EKS_NODE_GROUP_INSTANCE_AMI=AL2_x86_64
export EKS_NODE_GROUP_INSTANCE_TYPE=t3.medium
export EKS_NODE_GROUP_INSTANCE_CAPACITY_TYPE=SPOT
export EKS_NODE_GROUP_INSTANCE_DISK_SIZE=50
export EKS_NODE_GROUP_ACCESS_KEY=tech-challenge-7soat-key

# AWS: EKS Cluster Node Group Auto Scaler
export EKS_SERVICE_ACCOUNT_AUTOSCALER_VERSION=1.21.2
export EKS_SERVICE_ACCOUNT_AUTOSCALER_NAME=cluster-autoscaler
export EKS_SERVICE_ACCOUNT_AUTOSCALER_NAMESPACE=kube-system
export EKS_SERVICE_ACCOUNT_AUTOSCALER_POLICY=arn:aws:iam::839260668425:policy/K8SASGPolicy

#==============================================================================
# Shell
#==============================================================================
bash