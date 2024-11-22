import ollama

response = ollama.chat(
    model="llama3.2:1b",
    messages=[
        {
            "role": "user",
            "content": "Tell me an interesting fact about elephants",
        },
    ],
)
print(response["message"]["content"])