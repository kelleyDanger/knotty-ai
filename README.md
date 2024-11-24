# Knotty AI Infrastructure Design
- Accepting user input through a webpage.
- Generating crochet pattern instructions using a fine-tuned LLM.

**User Story**
As a user, I go to a webpage and type into a textbox "punk rock blanket". The request is sent to an AI model that returns a crochet pattern for a "punk rock blanket". The model is a standard LLM that has been trained with granny-square crochet patterns. The user gets a "punk rock blanket" crochet pattern returned to the webpage that they can then print off/session store with checkboxes to keep track of the rows they've worked.

# Components

## Website
### Frontend
- Purpose: Provide an interface where users can input crochet pattern queries.
- Technology: React + MaterialUI
- Endpoints:
    - POST /generate-pattern: Sends user input to the backend for processing.
- Kubernetes Service: NodePort for external access to website
### Backend
- Purpose: Acts as an API gateway, receiving user input from the frontend and forwarding it to the LLM service.
- Technology: tbd
- Endpoints:
    - POST 
- Kubernetes Service: ClusterIP (accessible only within cluster)


## LLM
- Purpose: Hosts the fine-tuned LLM model for generating crochet patterns
- Technology: llama3.1 with fine-tuned crochet granny-square pattern data set
- Endpoints:
    - POST /generate-pattern: Accepts input query and returns generated pattern text.
- Kubernetes Service: ClusterIP (accessible only within cluster).

## Monitoring + Metrics
- Prometheus + Grafana

# Website
## Setup 
1. [Install Node Version Manager (nvm)](https://github.com/nvm-sh/nvm)
```bash
# Install  latest node
nvm install node

# Use node
nvm use <node_version>

# OpenSSL Legacy support
export NODE_OPTIONS=--openssl-legacy-provider
```
3. Install other packages
```bash

# Start website
cd frontend && npm start

# View on: http://localhost:3000/

```

# LLM
## Setup LLM
1. [Install Helm](https://helm.sh/docs/intro/install/)
2. [Install Minikube](https://minikube.sigs.k8s.io/docs/start/?arch=%2Flinux%2Fx86-64%2Fstable%2Fbinary+download)
3. [Set up Minikube with NVIDIA GPUs](https://minikube.sigs.k8s.io/docs/tutorials/nvidia/)
4. [Install Ollama helm workload](https://github.com/otwld/ollama-helm)

```bash
# Install Nvidia device plugin
kubectl apply -f https://raw.githubusercontent.com/NVIDIA/k8s-device-plugin/v0.13.0/nvidia-device-plugin.yml

# Start Kubernetes cluster with nvidia gpu
minikube start --driver docker --container-runtime docker --gpus all

# Verify minikube runnign with gpu
kubectl describe node minikube | grep -A 5 Allocatable

# Deploy ollama Kubernetes pod, service, deployment
helm install ollama ollama-helm/ollama --namespace ollama

# Upgrade
helm upgrade ollama ollama-helm/ollama --namespace knotty-ai --values values.yaml

# View deployed pod, service, deployment
kubectl get all -n knotty-ai

# Run query
curl http://localhost:11434/api/generate -d '{
  "model": "llama3.2:1b",
  "prompt": "Why is the sky blue?",
  "stream": false
}'
```
