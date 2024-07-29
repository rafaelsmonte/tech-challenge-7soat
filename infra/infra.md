# Infrastructure

## Overview

## Deployment

```
Requirements:
  - Kubectl must be installed in your operating system
  - The deployment scripts are designed for Unix environemts and were testes on Ubuntu 22.04 only.
  - Prior to using the scripts, you must get a shell with all environment variables set: ./infra/scripts/infra-shell.sh
```

1. Create IAM user for AWS CLI and Kubectl Usage with the following permissions:
```
1. AmazonEKSClusterPolicy
2. AmazonEKSServicePolicy
3. Custon Inline Policy. Suggested name: EKSCLIAccessPolicy

{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "eks:CreateCluster",
                "eks:DeleteCluster",
                "eks:DescribeCluster",
                "eks:ListClusters",
                "eks:UpdateClusterConfig",
                "eks:UpdateClusterVersion",
                "eks:CreateNodegroup",
                "eks:UpdateNodegroupConfig",
                "eks:DeleteNodegroup",
                "eks:DescribeNodegroup",
                "eks:ListNodegroups",
                "iam:PassRole",
                "iam:GetRole",
                "ec2:DescribeKeyPairs"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "ecr:CreateRepository",
                "ecr:DescribeRepositories",
                "ecr:ListImages",
                "ecr:DescribeImages",
                "ecr:BatchCheckLayerAvailability",
                "ecr:GetDownloadUrlForLayer",
                "ecr:BatchGetImage",
                "ecr:PutImage",
                "ecr:InitiateLayerUpload",
                "ecr:UploadLayerPart",
                "ecr:CompleteLayerUpload",
                "ecr:GetAuthorizationToken"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "iam:GetOpenIDConnectProvider",
                "iam:CreateOpenIDConnectProvider",
                "iam:TagOpenIDConnectProvider",
                "iam:CreateRole",
                "eks:TagResource",
                "cloudformation:ListStacks",
                "cloudformation:CreateStack",
                "iam:*"
            ],
            "Resource": "*"
        }
    ]
}
```


2. Create ROLE for AWS EKS and AWS EKS Node Group:
```
1. AWS_EKS_ROLE

  1.1. AmazonEKSClusterPolicy
  1.2. Custom Inline Permission. Suggested name: AWSEKSExtraPermissions

{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "eks:DescribeCluster",
                "eks:ListClusters",
                "eks:CreateNodegroup",
                "eks:UpdateNodegroupConfig",
                "eks:DeleteNodegroup",
                "eks:DescribeNodegroup",
                "eks:ListNodegroups",
                "eks:UpdateClusterConfig",
                "eks:UpdateClusterVersion"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "iam:PassRole"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents",
                "logs:DescribeLogGroups",
                "logs:DescribeLogStreams"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "servicequotas:ListServiceQuotas",
                "servicequotas:GetServiceQuota",
                "servicequotas:RequestServiceQuotaIncrease"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "secretsmanager:GetSecretValue",
                "secretsmanager:ListSecrets"
            ],
            "Resource": "*"
        }
    ]
}

2. AWS_EKS_NODE_GROUP_ROLE

  2.1. AmazonEC2ContainerRegistryReadOnly
  2.2. AmazonEKS_CNI_Policy
  2.3. AmazonEKSWorkerNodePolicy
  2.4. Custom Inline Permission. Suggested name: EKSExtraPermissions

{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ec2:CreateVolume",
                "ec2:AttachVolume",
                "ec2:DeleteVolume",
                "ec2:DescribeVolumes",
                "ec2:DescribeVolumeStatus",
                "ec2:DescribeInstances",
                "ec2:DetachVolume",
                "ec2:CreateSnapshot",
                "ec2:DeleteSnapshot",
                "ec2:DescribeSnapshots",
                "ec2:ModifyVolume",
                "ec2:CreateTags"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "secretsmanager:GetSecretValue",
                "secretsmanager:ListSecrets"
            ],
            "Resource": "*"
        },
        {
            "Action": [
                "autoscaling:DescribeAutoScalingGroups",
                "autoscaling:DescribeAutoScalingInstances",
                "autoscaling:DescribeLaunchConfigurations",
                "autoscaling:DescribeTags",
                "autoscaling:SetDesiredCapacity",
                "autoscaling:TerminateInstanceInAutoScalingGroup",
                "ec2:DescribeLaunchTemplateVersions"
            ],
            "Resource": "*",
            "Effect": "Allow"
        }
    ]
}
```

3. Install necessary dependencies for AWS CLI
```
./infra/scripts/eks-cluster-deploy.sh setup-env
```

4. Configure AWS credentials for user created on step 1
```
./infra/scripts/eks-cluster-deploy.sh setup-aws-auth
```

5. Update kubectl config to reference EKS cluster
```
./infra/scripts/eks-cluster-deploy.sh update-kubeconfig
```

6. Create ECR repository
```
./infra/scripts/eks-cluster-deploy.sh create-ecr-repo
```

7. Create EKS kubernetes cluster
```
./infra/scripts/eks-cluster-deploy.sh create-eks-cluster
```

8. Create EKS Node Group
```
./infra/scripts/eks-cluster-deploy.sh create-node-group
```

9. Install metrics server on kube-system namespace to allow HPA
```
./infra/scripts/eks-cluster-deploy.sh install-metrics-server
```

10. Install external secrets operator
```
./infra/scripts/eks-cluster-deploy.sh install-external-secrets-operator
```

11. Install cluster autoscale
```
// Install cluster autoscaling
./infra/scripts/eks-cluster-deploy.sh install-cluster-autoscale

// Creates AWS IAM Policy for Auto Scaling Group Management
Suggested name: K8SASGPolicy
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": [
                "autoscaling:DescribeAutoScalingGroups",
                "autoscaling:DescribeAutoScalingInstances",
                "autoscaling:DescribeLaunchConfigurations",
                "autoscaling:DescribeTags",
                "autoscaling:SetDesiredCapacity",
                "autoscaling:TerminateInstanceInAutoScalingGroup",
                "ec2:DescribeLaunchTemplateVersions"
            ],
            "Resource": "*",
            "Effect": "Allow"
        }
    ]
}

// Creates a kubernetes service account with that policy
./infra/scripts/eks-cluster-deploy.sh cretae-service-account-autoscaler
```

## Grafana Dashboards

 - Node Exporter Metrics: 1860
 - Node Express Metrics: 14565