# Knotty AI Infrastructure Design
- Accepting user input through a webpage.
- Generating crochet pattern instructions using a fine-tuned LLM.

**User Story**
As a user, I go to a webpage and type into a textbox "punk rock blanket". The request is sent to an AI model that returns a crochet pattern for a "punk rock blanket". The model is a standard LLM that has been trained with granny-square crochet patterns. The user gets a "punk rock blanket" crochet pattern returned to the webpage that they can then print off/session store with checkboxes to keep track of the rows they've worked.

# Components

## Website
### Frontend
- Purpose: Provide an interface where users can input crochet pattern queries.
- Technology: tbd
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

## 

# LLM
## Setup LLM
1. [Install Helm](https://helm.sh/docs/intro/install/)
2. [Install Minikube](https://minikube.sigs.k8s.io/docs/start/?arch=%2Flinux%2Fx86-64%2Fstable%2Fbinary+download)
3. [Install Ollama helm workload](https://github.com/otwld/ollama-helm)

```bash
# Start Kubernetes cluster
minikube start

# Deploy ollama Kubernetes pod
```

- Create project, install dependencies
```bash
cd /code/llm
source bin/activate
python3 -m venv .
```
- Download llama
https://www.llama.com/llama-downloads/
```bash
pip install llama-stack

# See latest available models, determine model ID
llama model list

# Select a model
llama model download --source meta --model-id  Llama3.1-8B  
# llama-agents have safety enabled by default. For this, you will need
# safety models -- Llama-Guard and Prompt-Guard
llama download --source meta --model-id Prompt-Guard-86M 
llama download --source meta --model-id Llama-Guard-3-1B 
```
- Clone llama-stack repo
https://github.com/meta-llama/llama-stack
```
cd /code
git clone git@github.com:meta-llama/llama-stack.git
```

- Set up Docker repo
https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository


- Run llama in docker
https://llama-stack.readthedocs.io/en/latest/getting_started/distributions/self_hosted_distro/meta-reference-gpu.html
```

sudo apt install docker.io
sudo apt install docker-compose

cd distributions/meta-reference-gpu && sudo docker-compose up

```