# Setup
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