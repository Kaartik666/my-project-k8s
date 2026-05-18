<COMMANDS>
kubectl delete deployment frontend backend mongo
kubectl delete service frontend-service backend-service mongo-service
kubectl delete pvc mongo-pvc

kubectl get pods -n dev     --> pods as per namespaces
kubectl get pods -n prod    --> pods as per namespaces

kubectl apply -f ~/my-project-k8s/k8s/dev/        --> all files apply 
kubectl apply -f ~/my-project-k8s/k8s/prod/       --> all files apply

<GITHUB>

git clone github-repo-url.git

git add .
git commit -m "added dev and prod namespace yamls"
git push origin main


<NOTES>

MongoDB requires special configuration called a ReplicaSet to run multiple instances properly. Running 2+ mongo pods without that setup causes data corruption. So for now 1 replica is correct for both environments — even in production.
