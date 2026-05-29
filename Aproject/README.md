# 📧 Email Collector — Kubernetes Full-Stack App

A full-stack **Email Collector** application deployed on **Kubernetes (Minikube)**, built with React (frontend), Node.js (backend), and MongoDB (database with persistent storage).

---

## 🚀 What This Project Does

Users visit a simple web UI, enter an email address, and hit **Submit**. The email is sent to a Node.js backend API, stored in a **MongoDB database**, and can be listed or hidden on the page — all running inside a Kubernetes cluster with persistent storage via a **PersistentVolumeClaim (PVC)**.

---

## 🗂️ Project Structure

```
Aproject/
├── backend/          # Node.js Express API
├── frontend/         # React frontend (served via Nginx)
├── backend.yaml      # K8s Deployment + Service for backend
├── frontend.yaml     # K8s Deployment + Service for frontend
├── mongo.yaml        # K8s PVC + Deployment + Service for MongoDB
└── README.md
```

---

## 🏗️ Architecture & Flow Diagram

```
                        ┌─────────────────────────────────────────────────┐
                        │               Kubernetes Cluster                 │
                        │                                                  │
  User Browser          │  ┌─────────────────┐                            │
      │                 │  │  frontend Pod    │                            │
      │  HTTP Request   │  │  (React + Nginx) │                            │
      └────────────────►│  │  replicas: 2     │                            │
                        │  └────────┬────────┘                            │
                        │           │ NodePort :30007                      │
                        │           │ (exposed via minikube tunnel)        │
                        │           │                                      │
                        │           │  API calls to /api/emails            │
                        │           ▼                                      │
                        │  ┌─────────────────┐                            │
                        │  │  backend Pod     │                            │
                        │  │  (Node.js :5000) │                            │
                        │  │  replicas: 2     │                            │
                        │  └────────┬────────┘                            │
                        │           │ ClusterIP: mongo-service:27017       │
                        │           │                                      │
                        │           ▼                                      │
                        │  ┌─────────────────┐    ┌──────────────────┐   │
                        │  │  mongo Pod       │    │  PersistentVolume│   │
                        │  │  (MongoDB)       │◄───│  Claim (1Gi)     │   │
                        │  │  replicas: 1     │    │  /data/db        │   │
                        │  └─────────────────┘    └──────────────────┘   │
                        │                                                  │
                        └─────────────────────────────────────────────────┘
```

---

## 🔄 Request Flow (Step by Step)

```
1. User opens browser → http://127.0.0.1:<minikube-port>
         │
         ▼
2. frontend-service (NodePort 30007)
   → Routes to one of 2 frontend Pods (React app)
         │
         ▼
3. User types email → clicks Submit
   → React sends POST /api/emails to backend-service
         │
         ▼
4. backend-service (ClusterIP :5000)
   → Routes to one of 2 backend Pods (Node.js)
         │
         ▼
5. Backend connects to mongo-service (ClusterIP :27017)
   → Saves email to MongoDB (emailsdb)
         │
         ▼
6. MongoDB stores data on PVC (/data/db)
   → Data persists even if Pod restarts ✅
         │
         ▼
7. Backend returns success → React shows "saved successfully!"
```

---

## ⚙️ Kubernetes Resources

| Resource | Kind | Details |
|---|---|---|
| `frontend-service` | NodePort | Exposes React UI on port 30007 |
| `backend-service` | ClusterIP | Internal API on port 5000 |
| `mongo-service` | ClusterIP | Internal MongoDB on port 27017 |
| `frontend` | Deployment | 2 replicas — React + Nginx |
| `backend` | Deployment | 2 replicas — Node.js Express |
| `mongo` | Deployment | 1 replica — MongoDB |
| `mongo-pvc` | PersistentVolumeClaim | 1Gi storage for DB data |

---

## 🛠️ How to Run Locally

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Minikube](https://minikube.sigs.k8s.io/docs/start/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)

### Steps

```bash
# 1. Start Minikube
minikube start

# 2. Clone this repo
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>/Aproject

# 3. Apply Kubernetes manifests
kubectl apply -f mongo.yaml
kubectl apply -f backend.yaml
kubectl apply -f frontend.yaml

# 4. Wait for all pods to be Running
kubectl get pods

# 5. Open the app in browser
minikube service frontend-service
```

---

## 📦 Docker Images Used

| Service | Image |
|---|---|
| Frontend | `raaghav99/raaghav_frontend:latest` |
| Backend | `raaghav99/raaghav_backend:latest` |
| Database | `mongo` (official) |

---

## 🧹 Teardown

```bash
kubectl delete -f frontend.yaml
kubectl delete -f backend.yaml
kubectl delete -f mongo.yaml
```

---

## 📸 Screenshot

> The app running at `http://127.0.0.1:<port>` after `minikube service frontend-service`

![Email Collector UI](./screenshot.png)

---

## 👤 Author

**Raghav** — Kubernetes + Full-Stack Project  
Feel free to ⭐ this repo if you found it helpful!
