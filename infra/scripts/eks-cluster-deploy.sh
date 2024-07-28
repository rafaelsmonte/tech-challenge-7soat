#!/bin/bash

#==============================================================================
# File: run.sh
# Author: Thiago Thalison Firmino de Lima (Intelbras)
# Date: 19 jul 2024
# Brief: Commands to programatically manage EKS cluster
#==============================================================================

#==============================================================================
# Commands
#==============================================================================
case "$1" in

  #============================================================================
  # Method: setup-env
  # Description: This method installs the necessary dependencies to interact
  #              AWS CLI.
  #============================================================================
  setup-env)
    mkdir tmpawsinstall
    cd tmpawsinstall
    curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
    unzip awscliv2.zip
    sudo ./aws/install
    cd ..
    rm -rf tmpawsinstall/
  ;;

  #============================================================================
  # Method: setup-aws-auth
  # Description: This method configures the AWS Region and user credentials to interact with EKS
  #============================================================================
  setup-aws-auth)
    aws configure
  ;;

  #============================================================================
  # Method: update-kubeconfig
  # Description: This method configures Kubetl to refers to the EKS cluster on AWS
  #============================================================================
  update-kubeconfig)
    aws eks update-kubeconfig --name $EKS_CLUSTER_NAME --region $AWS_REGION
  ;;

  #============================================================================
  # Method: create-ecr-repo
  # Description: Creates a private repository for api docker images on ECR
  #============================================================================
  create-ecr-repo)
    aws ecr create-repository --repository-name $ECR_REPOSITORY_NAME --region $AWS_REGION
  ;;

  #============================================================================
  # Method: create-eks-cluster
  # Description: Creates the eks cluster on AWS
  #============================================================================
  create-eks-cluster)
    aws eks create-cluster \
    --name $EKS_CLUSTER_NAME \
    --role-arn $EKS_CLUSTER_ROLE \
    --resources-vpc-config subnetIds=$EKS_SUBNET_IDS,securityGroupIds=$EKS_SECURITY_GROUP_IDS
    while true; do
        STATUS=$(aws eks describe-cluster --name $EKS_CLUSTER_NAME --query "cluster.status" --output text)
        echo "Cluster status: $STATUS"
        if [ "$STATUS" == "ACTIVE" ]; then
            echo "Cluster is now active!"
            break
        elif [ "$STATUS" == "FAILED" ]; then
            echo "Cluster creation failed."
            break
        fi
        sleep 30
    done
  ;;

  #============================================================================
  # Method: create-node-group
  # Description: Creates a node group for EC2 infrastructure
  #============================================================================
  create-node-group)
    aws eks create-nodegroup \
    --cluster-name $EKS_CLUSTER_NAME \
    --nodegroup-name $EKS_NODE_GROUP_NAME \
    --node-role $EKS_NODE_GROUP_ROLE \
    --subnets $EKS_NODE_GROUP_SUBNETS \
    --scaling-config $EKS_NODE_GROUP_SCALING_CONFIG \
    --ami-type $EKS_NODE_GROUP_INSTANCE_AMI \
    --instance-types $EKS_NODE_GROUP_INSTANCE_TYPE \
    --capacity-type $EKS_NODE_GROUP_INSTANCE_CAPACITY_TYPE \
    --disk-size $EKS_NODE_GROUP_INSTANCE_DISK_SIZE \
    --remote-access ec2SshKey=$EKS_NODE_GROUP_ACCESS_KEY

    while true; do
        STATUS=$(aws eks describe-nodegroup --cluster-name $EKS_CLUSTER_NAME --nodegroup-name $EKS_NODE_GROUP_NAME --query "nodegroup.status" --output text)
        echo "Node group status: $STATUS"
        if [ "$STATUS" == "ACTIVE" ]; then
            echo "Node group is now active!"
            break
        elif [ "$STATUS" == "FAILED" ]; then
            echo "Node group creation failed."
            break
        fi
        sleep 30
    done
  ;;

  #============================================================================
  # Method: delete-node-group
  # Description: Deletes a node group for EC2 infrastructure
  #============================================================================
  delete-node-group)
    aws eks delete-nodegroup --cluster-name $EKS_CLUSTER_NAME --nodegroup-name $EKS_NODE_GROUP_NAME

    while true; do
        STATUS=$(aws eks describe-nodegroup --cluster-name $EKS_CLUSTER_NAME --nodegroup-name $EKS_NODE_GROUP_NAME --query "nodegroup.status" --output text)
        echo "Node group status: $STATUS"
        if [ "$STATUS" == "DELETING" ]; then
            echo "Node group is being deleted!"
        else
            echo "Node group deletion finished."
            break
        fi
        sleep 30
    done
  ;;

  #============================================================================
  # Method: install-metrics-server
  # Description: It installs metrics server on kubernetes to support HPA
  #              [Horizontal PODS Autoscaling]
  #============================================================================
  install-metrics-server)
    helm repo add metrics-server https://kubernetes-sigs.github.io/metrics-server/
    helm repo update
    helm install metrics-server metrics-server/metrics-server
    kubectl get pods -n kube-system
  ;;

  #============================================================================
  # Method: install-external-secrets-operator
  # Description: Responsible to allow integration between kubernetes secrets with
  #              an external secrets manager: AWS Secrets Manager, Hashcorp Vault, etc
  #============================================================================
  install-external-secrets-operator)
    helm repo add external-secrets https://charts.external-secrets.io
    helm repo update
    helm install external-secrets external-secrets/external-secrets
  ;;

  #============================================================================
  # Method: install-cluster-autoscale
  # Description: Deploys a pod with autoscaler service to allow kubernetes running on EKS
  #              to be able to adjust de node group auto scalling group in order to provision
  #              more EC2 instances when compute resources are limited
  #============================================================================
  install-cluster-autoscale)
    kubectl apply -f ../deployment/add-ons/cluster-autoscaler-autodiscover.yaml
    kubectl -n kube-system annotate deployment.apps/cluster-autoscaler cluster-autoscaler.kubernetes.io/safe-to-evict="false"
    export K8S_VERSION=$(kubectl version | grep 'Server Version:' | sed 's/[^0-9.]*\([0-9.]*\).*/\1/' | cut -d. -f1,2)
    kubectl -n kube-system set image deployment.apps/cluster-autoscaler cluster-autoscaler=us.gcr.io/k8s-artifacts-prod/autoscaling/cluster-autoscaler:v${EKS_SERVICE_ACCOUNT_AUTOSCALER_VERSION}
  ;;

  #============================================================================
  # Method: cretae-service-account-autoscaler
  # Description: Creates a service account on kubernetes to allow the autoscaller pod
  #              to be able to manage AWS Auto Scaling Group for the node group
  #============================================================================
  cretae-service-account-autoscaler)
    eksctl utils associate-iam-oidc-provider --region=$AWS_REGION --cluster=$EKS_CLUSTER_NAME --approve
    eksctl create iamserviceaccount \
    --name $EKS_SERVICE_ACCOUNT_AUTOSCALER_NAME \
    --namespace $EKS_SERVICE_ACCOUNT_AUTOSCALER_NAMESPACE \
    --cluster $EKS_CLUSTER_NAME \
    --attach-policy-arn "$EKS_SERVICE_ACCOUNT_AUTOSCALER_POLICY" \
    --approve \
    --override-existing-serviceaccounts
  ;;

  #============================================================================
  # Method: install-eks-ctl
  # Description: Install EKS CTL for eks cluster management
  #============================================================================
  install-eks-ctl)
    # for ARM systems, set ARCH to: `arm64`, `armv6` or `armv7`
    ARCH=amd64
    PLATFORM=$(uname -s)_$ARCH
    curl -sLO "https://github.com/eksctl-io/eksctl/releases/latest/download/eksctl_$PLATFORM.tar.gz"
    tar -xzf eksctl_$PLATFORM.tar.gz -C /tmp && rm eksctl_$PLATFORM.tar.gz
    sudo mv /tmp/eksctl /usr/local/bin
  ;;

  *)
    echo "Usage: ./eks-cluster-deploy.sh [setup-env|setup-aws-auth|update-kubeconfig|create-ecr-repo|create-eks-cluster|create-node-group|delete-node-group|install-metrics-server|install-external-secrets-operator|install-cluster-autoscale|cretae-service-account-autoscaler|install-eks-ctl]"
  ;;

esac
