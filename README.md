# dockerise using following commands
1. docker build -t blog/{service_name} .

# kubernetes pods using config file (not much useful)
cd infra
kubectl apply -f posts.yaml

# kubectl pods using deployments
kubectl apply -f posts-deployment.yaml
kubectl get deployments
kubectl describe deployment {deploymentName}
kubectl delete deployment {deploymentName}
###### when you delete the deployment all the relevant pods are also deleted