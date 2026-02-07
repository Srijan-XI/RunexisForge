# OpenAI GPT API - Comprehensive Guide

## Table of Contents
- [Introduction](#introduction)
- [Why OpenAI API?](#why-openai-api)
- [Getting Started](#getting-started)
- [Chat Completions](#chat-completions)
- [GPT Models Overview](#gpt-models-overview)
- [Prompt Engineering](#prompt-engineering)
- [Function Calling](#function-calling)
- [Embeddings](#embeddings)
- [Vision Capabilities](#vision-capabilities)
- [Streaming Responses](#streaming-responses)
- [Token Management](#token-management)
- [Fine-tuning](#fine-tuning)
- [Error Handling](#error-handling)
- [Rate Limits & Optimization](#rate-limits--optimization)
- [Advanced Features](#advanced-features)
- [Best Practices](#best-practices)
- [Real-World Examples](#real-world-examples)
- [Resources](#resources)

---

## Introduction

OpenAI's GPT (Generative Pre-trained Transformer) API provides access to state-of-the-art large language models for a wide range of natural language processing tasks. From GPT-4 with advanced reasoning to GPT-3.5 for cost-effective solutions, the API enables developers to build intelligent applications with minimal setup.

### Key Capabilities

- **Text Generation**: Creative writing, code generation, conversation
- **Analysis**: Sentiment analysis, text classification, extraction
- **Transformation**: Translation, summarization, rewriting
- **Reasoning**: Problem-solving, logical deduction, planning
- **Vision**: Image analysis and understanding (GPT-4 Vision)
- **Code**: Code generation, debugging, explanation

### API Features

- **Multiple Models**: GPT-4, GPT-4 Turbo, GPT-3.5 Turbo
- **Function Calling**: Structured data extraction and tool integration
- **Embeddings**: Semantic search, clustering, recommendations
- **Fine-tuning**: Custom model training on your data
- **Streaming**: Real-time response generation
- **Vision**: Multi-modal image and text processing

---

## Why OpenAI API?

### Benefits

✅ **State-of-the-Art Performance**
- GPT-4: Best-in-class reasoning and understanding
- Consistent quality across diverse tasks
- Continuously improving models

✅ **Easy Integration**
- Simple REST API
- Official SDKs (Python, Node.js)
- Comprehensive documentation
- Quick setup (< 5 minutes)

✅ **Flexible & Scalable**
- Pay-per-use pricing
- Handle any volume
- Global availability
- 99.9% uptime SLA

✅ **Rich Ecosystem**
- LangChain integration
- Vector database support
- Enterprise features
- Active community

### Use Cases

- **Customer Support**: AI chatbots, ticket classification, response generation
- **Content Creation**: Blog posts, marketing copy, social media
- **Code Assistance**: Code generation, debugging, documentation
- **Data Analysis**: Extraction, classification, sentiment analysis
- **Education**: Tutoring, quiz generation, personalized learning
- **Research**: Literature review, summarization, hypothesis generation

---

## Getting Started

### Installation

```bash
# Install OpenAI Python library
pip install openai

# Optional: Install with async support
pip install openai[async]

# For older versions (pre-1.0)
pip install "openai<1.0"
```

### API Key Setup

```python
import os
from openai import OpenAI

# Method 1: Environment variable (recommended)
os.environ["OPENAI_API_KEY"] = "sk-your-api-key-here"
client = OpenAI()

# Method 2: Direct initialization
client = OpenAI(api_key="sk-your-api-key-here")

# Method 3: Using .env file
from dotenv import load_dotenv
load_dotenv()
client = OpenAI()  # Reads from OPENAI_API_KEY env var
```

### First API Call

```python
from openai import OpenAI

client = OpenAI()

response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "user", "content": "Hello! How are you?"}
    ]
)

print(response.choices[0].message.content)
```

### Check API Status

```python
# List available models
models = client.models.list()
for model in models.data:
    print(model.id)

# Get specific model info
model_info = client.models.retrieve("gpt-4")
print(model_info)
```

---

## Chat Completions

### Basic Chat Completion

```python
response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "What is the capital of France?"}
    ]
)

print(response.choices[0].message.content)
```

### Message Roles

```python
messages = [
    # System: Sets behavior/context
    {"role": "system", "content": "You are a Python expert."},
    
    # User: User input
    {"role": "user", "content": "How do I read a CSV file?"},
    
    # Assistant: Previous assistant responses (for context)
    {"role": "assistant", "content": "You can use pandas: pd.read_csv('file.csv')"},
    
    # User: Follow-up question
    {"role": "user", "content": "What if the file has no header?"}
]

response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=messages
)
```

### Conversation Management

```python
class ChatSession:
    def __init__(self, system_prompt="You are a helpful assistant."):
        self.messages = [{"role": "system", "content": system_prompt}]
        self.client = OpenAI()
    
    def send_message(self, user_message):
        # Add user message
        self.messages.append({"role": "user", "content": user_message})
        
        # Get response
        response = self.client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=self.messages
        )
        
        # Add assistant response to history
        assistant_message = response.choices[0].message.content
        self.messages.append({"role": "assistant", "content": assistant_message})
        
        return assistant_message
    
    def reset(self):
        self.messages = [self.messages[0]]  # Keep system prompt

# Usage
chat = ChatSession("You are a friendly AI assistant.")
print(chat.send_message("Hello!"))
print(chat.send_message("What's 2+2?"))
print(chat.send_message("What was my previous question?"))
```

### Response Parameters

```python
response = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "Write a haiku about programming."}],
    
    # Temperature: 0.0 (deterministic) to 2.0 (very creative)
    temperature=0.7,
    
    # Max tokens in response
    max_tokens=150,
    
    # Top-p sampling (alternative to temperature)
    top_p=1.0,
    
    # Number of completions to generate
    n=1,
    
    # Penalize repeated tokens
    frequency_penalty=0.0,  # -2.0 to 2.0
    presence_penalty=0.0,   # -2.0 to 2.0
    
    # Stop sequences
    stop=["\n\n", "END"],
    
    # User identifier (for abuse monitoring)
    user="user-123"
)
```

---

## GPT Models Overview

### GPT-4 Models

```python
# GPT-4 Turbo (latest, most capable)
response = client.chat.completions.create(
    model="gpt-4-turbo-preview",  # or "gpt-4-0125-preview"
    messages=[{"role": "user", "content": "Explain quantum computing."}]
)

# GPT-4 (original)
response = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "Explain quantum computing."}]
)

# GPT-4 Vision (image understanding)
response = client.chat.completions.create(
    model="gpt-4-vision-preview",
    messages=[
        {
            "role": "user",
            "content": [
                {"type": "text", "text": "What's in this image?"},
                {"type": "image_url", "image_url": {"url": "https://..."}}
            ]
        }
    ]
)
```

### GPT-3.5 Models

```python
# GPT-3.5 Turbo (cost-effective)
response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[{"role": "user", "content": "Hello!"}]
)

# GPT-3.5 Turbo 16k (longer context)
response = client.chat.completions.create(
    model="gpt-3.5-turbo-16k",
    messages=[{"role": "user", "content": "Long text..."}]
)
```

### Model Comparison

| Model | Context Window | Cost (per 1M tokens) | Best For |
|-------|----------------|---------------------|----------|
| GPT-4 Turbo | 128K | $10 / $30 | Complex reasoning, coding |
| GPT-4 | 8K | $30 / $60 | High accuracy tasks |
| GPT-3.5 Turbo | 16K | $0.50 / $1.50 | General use, high volume |
| GPT-3.5 Turbo 16K | 16K | $3 / $4 | Longer conversations |

*Prices as of January 2026 (input / output)

### Choosing the Right Model

```python
def get_model(task_complexity, context_length, budget):
    """Select appropriate model based on requirements."""
    if context_length > 16000:
        return "gpt-4-turbo-preview"
    elif task_complexity == "high":
        return "gpt-4"
    elif budget == "low":
        return "gpt-3.5-turbo"
    else:
        return "gpt-4-turbo-preview"

# Usage
model = get_model(task_complexity="medium", context_length=5000, budget="medium")
```

---

## Prompt Engineering

### Basic Principles

```python
# ❌ Bad: Vague prompt
response = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "Write about dogs"}]
)

# ✅ Good: Specific prompt
response = client.chat.completions.create(
    model="gpt-4",
    messages=[{
        "role": "user",
        "content": "Write a 200-word informative paragraph about Golden Retrievers, "
                   "focusing on their temperament and why they make good family pets."
    }]
)
```

### System Prompts

```python
# Define behavior and context
system_prompt = """You are a senior Python developer with expertise in web development.
You provide concise, practical code examples with brief explanations.
You follow PEP 8 style guidelines and use type hints.
You prioritize security and performance in your recommendations."""

response = client.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": "How do I create a REST API endpoint?"}
    ]
)
```

### Few-Shot Learning

```python
messages = [
    {"role": "system", "content": "You classify customer feedback sentiment."},
    
    # Examples
    {"role": "user", "content": "The product is amazing! I love it."},
    {"role": "assistant", "content": "Positive"},
    
    {"role": "user", "content": "This is the worst purchase I've made."},
    {"role": "assistant", "content": "Negative"},
    
    {"role": "user", "content": "It's okay, nothing special."},
    {"role": "assistant", "content": "Neutral"},
    
    # Actual query
    {"role": "user", "content": "Great value for money, highly recommend!"}
]

response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=messages
)
```

### Chain of Thought

```python
prompt = """Solve this step by step:

Problem: A store sells apples for $2 each and oranges for $3 each. 
If someone buys 5 apples and 3 oranges, what's the total cost?

Think through this step by step:
1. Calculate the cost of apples
2. Calculate the cost of oranges
3. Add them together
"""

response = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": prompt}]
)
```

### Structured Output

```python
prompt = """Extract the following information from the text and return as JSON:
- name: Person's full name
- email: Email address
- phone: Phone number
- company: Company name

Text: "John Smith from Acme Corp can be reached at john@acme.com or 555-1234."

Return only valid JSON, no additional text."""

response = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": prompt}],
    temperature=0  # Low temperature for consistent formatting
)

import json
data = json.loads(response.choices[0].message.content)
print(data)
```

---

## Function Calling

### Basic Function Calling

```python
# Define functions
functions = [
    {
        "name": "get_weather",
        "description": "Get the current weather in a location",
        "parameters": {
            "type": "object",
            "properties": {
                "location": {
                    "type": "string",
                    "description": "City and state, e.g., San Francisco, CA"
                },
                "unit": {
                    "type": "string",
                    "enum": ["celsius", "fahrenheit"],
                    "description": "Temperature unit"
                }
            },
            "required": ["location"]
        }
    }
]

# Make request
response = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "What's the weather in Paris?"}],
    functions=functions,
    function_call="auto"
)

# Check if function was called
message = response.choices[0].message
if message.function_call:
    import json
    function_name = message.function_call.name
    arguments = json.loads(message.function_call.arguments)
    print(f"Function: {function_name}")
    print(f"Arguments: {arguments}")
```

### Complete Function Calling Flow

```python
import json

def get_weather(location, unit="celsius"):
    """Simulated weather API call."""
    # In reality, call actual weather API
    return {
        "location": location,
        "temperature": 22,
        "unit": unit,
        "condition": "sunny"
    }

def run_conversation(user_message):
    # Define available functions
    functions = [
        {
            "name": "get_weather",
            "description": "Get weather for a location",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {"type": "string"},
                    "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]}
                },
                "required": ["location"]
            }
        }
    ]
    
    # Map function names to actual functions
    available_functions = {
        "get_weather": get_weather
    }
    
    # Initial request
    messages = [{"role": "user", "content": user_message}]
    response = client.chat.completions.create(
        model="gpt-4",
        messages=messages,
        functions=functions,
        function_call="auto"
    )
    
    message = response.choices[0].message
    
    # Check if function was called
    if message.function_call:
        # Execute function
        function_name = message.function_call.name
        function_args = json.loads(message.function_call.arguments)
        function_response = available_functions[function_name](**function_args)
        
        # Add function response to conversation
        messages.append({
            "role": "function",
            "name": function_name,
            "content": json.dumps(function_response)
        })
        
        # Get final response
        second_response = client.chat.completions.create(
            model="gpt-4",
            messages=messages
        )
        
        return second_response.choices[0].message.content
    
    return message.content

# Usage
result = run_conversation("What's the weather like in Tokyo?")
print(result)
```

### Multiple Functions

```python
functions = [
    {
        "name": "search_products",
        "description": "Search for products in database",
        "parameters": {
            "type": "object",
            "properties": {
                "query": {"type": "string"},
                "category": {"type": "string"},
                "max_price": {"type": "number"}
            },
            "required": ["query"]
        }
    },
    {
        "name": "get_product_details",
        "description": "Get detailed information about a product",
        "parameters": {
            "type": "object",
            "properties": {
                "product_id": {"type": "string"}
            },
            "required": ["product_id"]
        }
    },
    {
        "name": "add_to_cart",
        "description": "Add product to shopping cart",
        "parameters": {
            "type": "object",
            "properties": {
                "product_id": {"type": "string"},
                "quantity": {"type": "integer"}
            },
            "required": ["product_id", "quantity"]
        }
    }
]
```

---

## Embeddings

### Generate Embeddings

```python
# Single text
response = client.embeddings.create(
    model="text-embedding-3-small",
    input="The quick brown fox jumps over the lazy dog"
)

embedding = response.data[0].embedding
print(f"Embedding dimensions: {len(embedding)}")  # 1536 dimensions

# Multiple texts
texts = ["Text one", "Text two", "Text three"]
response = client.embeddings.create(
    model="text-embedding-3-small",
    input=texts
)

embeddings = [item.embedding for item in response.data]
```

### Embedding Models

```python
# text-embedding-3-small (most cost-effective)
response = client.embeddings.create(
    model="text-embedding-3-small",
    input="Sample text"
)

# text-embedding-3-large (highest quality)
response = client.embeddings.create(
    model="text-embedding-3-large",
    input="Sample text"
)

# text-embedding-ada-002 (legacy)
response = client.embeddings.create(
    model="text-embedding-ada-002",
    input="Sample text"
)
```

### Semantic Search

```python
import numpy as np
from numpy.linalg import norm

def cosine_similarity(a, b):
    return np.dot(a, b) / (norm(a) * norm(b))

# Document embeddings
documents = [
    "Python is a programming language",
    "Paris is the capital of France",
    "Machine learning uses algorithms",
    "The Eiffel Tower is in Paris"
]

# Get embeddings
doc_response = client.embeddings.create(
    model="text-embedding-3-small",
    input=documents
)
doc_embeddings = [item.embedding for item in doc_response.data]

# Query
query = "What is the capital of France?"
query_response = client.embeddings.create(
    model="text-embedding-3-small",
    input=query
)
query_embedding = query_response.data[0].embedding

# Find most similar
similarities = [
    cosine_similarity(query_embedding, doc_emb) 
    for doc_emb in doc_embeddings
]

# Get top result
best_idx = np.argmax(similarities)
print(f"Most similar document: {documents[best_idx]}")
print(f"Similarity score: {similarities[best_idx]:.4f}")
```

### Clustering

```python
from sklearn.cluster import KMeans
import numpy as np

# Get embeddings for texts
texts = ["text1", "text2", "text3", ...]  # Your texts
response = client.embeddings.create(
    model="text-embedding-3-small",
    input=texts
)
embeddings = np.array([item.embedding for item in response.data])

# Cluster
n_clusters = 5
kmeans = KMeans(n_clusters=n_clusters, random_state=42)
labels = kmeans.fit_predict(embeddings)

# Group by cluster
clusters = {i: [] for i in range(n_clusters)}
for text, label in zip(texts, labels):
    clusters[label].append(text)

for cluster_id, cluster_texts in clusters.items():
    print(f"Cluster {cluster_id}: {cluster_texts[:3]}")  # First 3 items
```

---

## Vision Capabilities

### Image Analysis

```python
response = client.chat.completions.create(
    model="gpt-4-vision-preview",
    messages=[
        {
            "role": "user",
            "content": [
                {"type": "text", "text": "What's in this image?"},
                {
                    "type": "image_url",
                    "image_url": {
                        "url": "https://example.com/image.jpg"
                    }
                }
            ]
        }
    ],
    max_tokens=300
)

print(response.choices[0].message.content)
```

### Base64 Images

```python
import base64

def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

# Load and encode image
base64_image = encode_image("path/to/image.jpg")

response = client.chat.completions.create(
    model="gpt-4-vision-preview",
    messages=[
        {
            "role": "user",
            "content": [
                {"type": "text", "text": "Describe this image in detail."},
                {
                    "type": "image_url",
                    "image_url": {
                        "url": f"data:image/jpeg;base64,{base64_image}"
                    }
                }
            ]
        }
    ]
)
```

### Multiple Images

```python
response = client.chat.completions.create(
    model="gpt-4-vision-preview",
    messages=[
        {
            "role": "user",
            "content": [
                {"type": "text", "text": "What are the differences between these images?"},
                {"type": "image_url", "image_url": {"url": "https://example.com/image1.jpg"}},
                {"type": "image_url", "image_url": {"url": "https://example.com/image2.jpg"}}
            ]
        }
    ]
)
```

### Image Detail Control

```python
response = client.chat.completions.create(
    model="gpt-4-vision-preview",
    messages=[
        {
            "role": "user",
            "content": [
                {"type": "text", "text": "Analyze this image"},
                {
                    "type": "image_url",
                    "image_url": {
                        "url": "https://example.com/image.jpg",
                        "detail": "high"  # "low", "high", or "auto"
                    }
                }
            ]
        }
    ]
)
```

---

## Streaming Responses

### Basic Streaming

```python
response = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "Write a short story about a robot."}],
    stream=True
)

for chunk in response:
    if chunk.choices[0].delta.content is not None:
        print(chunk.choices[0].delta.content, end="", flush=True)
```

### Streaming with Full Control

```python
def stream_response(messages):
    response = client.chat.completions.create(
        model="gpt-4",
        messages=messages,
        stream=True
    )
    
    full_response = ""
    
    for chunk in response:
        delta = chunk.choices[0].delta
        
        # Check for content
        if delta.content:
            content = delta.content
            full_response += content
            print(content, end="", flush=True)
        
        # Check for function call
        if delta.function_call:
            print(f"\nFunction call: {delta.function_call}")
        
        # Check if finished
        if chunk.choices[0].finish_reason:
            print(f"\n\nFinish reason: {chunk.choices[0].finish_reason}")
    
    return full_response

# Usage
messages = [{"role": "user", "content": "Explain quantum computing"}]
result = stream_response(messages)
```

### Async Streaming

```python
import asyncio

async def async_stream():
    response = await client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": "Tell me a joke"}],
        stream=True
    )
    
    async for chunk in response:
        if chunk.choices[0].delta.content:
            print(chunk.choices[0].delta.content, end="", flush=True)

# Run
asyncio.run(async_stream())
```

---

## Token Management

### Count Tokens

```python
import tiktoken

def count_tokens(text, model="gpt-4"):
    """Count tokens in text for specific model."""
    encoding = tiktoken.encoding_for_model(model)
    tokens = encoding.encode(text)
    return len(tokens)

text = "Hello, how are you doing today?"
token_count = count_tokens(text)
print(f"Token count: {token_count}")

# Count message tokens
def count_message_tokens(messages, model="gpt-4"):
    """Count tokens for chat completion messages."""
    encoding = tiktoken.encoding_for_model(model)
    
    tokens_per_message = 3  # Every message follows <|start|>{role/name}\n{content}<|end|>\n
    tokens_per_name = 1
    
    num_tokens = 0
    for message in messages:
        num_tokens += tokens_per_message
        for key, value in message.items():
            num_tokens += len(encoding.encode(value))
            if key == "name":
                num_tokens += tokens_per_name
    
    num_tokens += 3  # Every reply is primed with <|start|>assistant<|message|>
    
    return num_tokens

messages = [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "What is AI?"}
]
print(f"Message tokens: {count_message_tokens(messages)}")
```

### Estimate Cost

```python
def estimate_cost(prompt_tokens, completion_tokens, model="gpt-4"):
    """Estimate API call cost in USD."""
    pricing = {
        "gpt-4": {"input": 0.03 / 1000, "output": 0.06 / 1000},
        "gpt-4-turbo-preview": {"input": 0.01 / 1000, "output": 0.03 / 1000},
        "gpt-3.5-turbo": {"input": 0.0005 / 1000, "output": 0.0015 / 1000}
    }
    
    if model not in pricing:
        return None
    
    input_cost = prompt_tokens * pricing[model]["input"]
    output_cost = completion_tokens * pricing[model]["output"]
    
    return input_cost + output_cost

# Usage
cost = estimate_cost(prompt_tokens=1000, completion_tokens=500, model="gpt-4")
print(f"Estimated cost: ${cost:.4f}")
```

### Manage Context Window

```python
def truncate_messages(messages, max_tokens=4000, model="gpt-4"):
    """Keep conversation within token limit by removing old messages."""
    while count_message_tokens(messages, model) > max_tokens:
        # Remove oldest user-assistant pair (keep system message)
        if len(messages) > 1:
            messages.pop(1)  # Remove after system message
        else:
            break
    
    return messages

# Usage
messages = [
    {"role": "system", "content": "You are helpful."},
    # ... many messages
]
messages = truncate_messages(messages, max_tokens=4000)
```

---

## Fine-tuning

### Prepare Training Data

```python
import json

# Format: JSONL with chat messages
training_data = [
    {
        "messages": [
            {"role": "system", "content": "You are a customer support assistant."},
            {"role": "user", "content": "How do I reset my password?"},
            {"role": "assistant", "content": "To reset your password: 1. Click 'Forgot Password' 2. Enter your email 3. Check your inbox for reset link"}
        ]
    },
    {
        "messages": [
            {"role": "system", "content": "You are a customer support assistant."},
            {"role": "user", "content": "What are your shipping options?"},
            {"role": "assistant", "content": "We offer: Standard (5-7 days, free), Express (2-3 days, $10), Next Day ($25)"}
        ]
    }
]

# Save to file
with open("training_data.jsonl", "w") as f:
    for item in training_data:
        f.write(json.dumps(item) + "\n")
```

### Upload Training File

```python
# Upload file
with open("training_data.jsonl", "rb") as f:
    response = client.files.create(
        file=f,
        purpose="fine-tune"
    )

file_id = response.id
print(f"File uploaded: {file_id}")
```

### Create Fine-tuning Job

```python
# Start fine-tuning
job = client.fine_tuning.jobs.create(
    training_file=file_id,
    model="gpt-3.5-turbo",
    hyperparameters={
        "n_epochs": 3
    }
)

job_id = job.id
print(f"Fine-tuning job created: {job_id}")
```

### Monitor Fine-tuning

```python
# Check status
job_status = client.fine_tuning.jobs.retrieve(job_id)
print(f"Status: {job_status.status}")

# List events
events = client.fine_tuning.jobs.list_events(job_id, limit=10)
for event in events.data:
    print(event.message)

# Wait for completion
import time

while True:
    job_status = client.fine_tuning.jobs.retrieve(job_id)
    if job_status.status in ["succeeded", "failed", "cancelled"]:
        break
    print(f"Status: {job_status.status}")
    time.sleep(60)

print(f"Final status: {job_status.status}")
if job_status.status == "succeeded":
    print(f"Fine-tuned model: {job_status.fine_tuned_model}")
```

### Use Fine-tuned Model

```python
# Use your fine-tuned model
response = client.chat.completions.create(
    model="ft:gpt-3.5-turbo:your-org:custom-model:id",
    messages=[
        {"role": "user", "content": "How do I track my order?"}
    ]
)

print(response.choices[0].message.content)
```

---

## Error Handling

### Basic Error Handling

```python
from openai import OpenAI, OpenAIError, RateLimitError, APIError

client = OpenAI()

try:
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": "Hello"}]
    )
    print(response.choices[0].message.content)
    
except RateLimitError as e:
    print(f"Rate limit exceeded: {e}")
    # Implement backoff strategy
    
except APIError as e:
    print(f"API error: {e}")
    # Retry request
    
except OpenAIError as e:
    print(f"OpenAI error: {e}")
    # Handle general errors

except Exception as e:
    print(f"Unexpected error: {e}")
```

### Retry with Exponential Backoff

```python
import time
import random

def api_call_with_retry(messages, max_retries=5):
    """Make API call with exponential backoff."""
    for attempt in range(max_retries):
        try:
            response = client.chat.completions.create(
                model="gpt-4",
                messages=messages
            )
            return response
        
        except RateLimitError as e:
            if attempt == max_retries - 1:
                raise
            
            # Exponential backoff with jitter
            wait_time = (2 ** attempt) + random.uniform(0, 1)
            print(f"Rate limit hit. Waiting {wait_time:.2f} seconds...")
            time.sleep(wait_time)
        
        except APIError as e:
            if attempt == max_retries - 1:
                raise
            
            print(f"API error on attempt {attempt + 1}. Retrying...")
            time.sleep(1)
    
    raise Exception("Max retries exceeded")

# Usage
messages = [{"role": "user", "content": "Hello"}]
response = api_call_with_retry(messages)
```

### Timeout Handling

```python
from openai import OpenAI

# Set timeout
client = OpenAI(timeout=30.0)  # 30 seconds

try:
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": "Hello"}]
    )
except TimeoutError:
    print("Request timed out")
```

---

## Rate Limits & Optimization

### Check Rate Limits

```python
# Rate limits are returned in response headers
response = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "Hello"}]
)

# Access via response object (when available)
# Check OpenAI dashboard for current limits
```

### Batch Processing

```python
import asyncio
from openai import AsyncOpenAI

async_client = AsyncOpenAI()

async def process_batch(prompts):
    """Process multiple prompts concurrently."""
    tasks = []
    
    for prompt in prompts:
        task = async_client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}]
        )
        tasks.append(task)
    
    responses = await asyncio.gather(*tasks)
    return [r.choices[0].message.content for r in responses]

# Usage
prompts = ["Question 1", "Question 2", "Question 3"]
results = asyncio.run(process_batch(prompts))
```

### Token Optimization

```python
# Use shorter prompts
def optimize_prompt(long_prompt):
    """Shorten prompt while preserving meaning."""
    # Remove unnecessary words
    # Use abbreviations where appropriate
    # Focus on essential information
    return optimized_prompt

# Use lower max_tokens for short responses
response = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "Yes or no: Is Paris in France?"}],
    max_tokens=10  # Only need brief answer
)

# Choose cost-effective models
# Use GPT-3.5 for simple tasks, GPT-4 for complex ones
```

---

## Advanced Features

### JSON Mode

```python
response = client.chat.completions.create(
    model="gpt-4-turbo-preview",
    response_format={"type": "json_object"},
    messages=[
        {
            "role": "user",
            "content": "Extract person info from: 'John Doe, 30 years old, engineer at Tech Corp' as JSON"
        }
    ]
)

import json
data = json.loads(response.choices[0].message.content)
print(data)
```

### Reproducible Outputs

```python
# Use seed for deterministic results
response1 = client.chat.completions.create(
    model="gpt-4-turbo-preview",
    messages=[{"role": "user", "content": "Random number"}],
    seed=42,
    temperature=0
)

response2 = client.chat.completions.create(
    model="gpt-4-turbo-preview",
    messages=[{"role": "user", "content": "Random number"}],
    seed=42,
    temperature=0
)

# Should be identical
assert response1.choices[0].message.content == response2.choices[0].message.content
```

### Logprobs

```python
response = client.chat.completions.create(
    model="gpt-4-turbo-preview",
    messages=[{"role": "user", "content": "Say hello"}],
    logprobs=True,
    top_logprobs=3
)

# Access token probabilities
for choice in response.choices:
    if choice.logprobs:
        print(choice.logprobs)
```

---

## Best Practices

### 1. Security

```python
# ✅ Use environment variables
import os
api_key = os.getenv("OPENAI_API_KEY")

# ❌ Never hardcode API keys
api_key = "sk-..."  # DON'T DO THIS

# ✅ Validate user input
def sanitize_input(user_input):
    # Remove potentially harmful content
    # Limit length
    # Escape special characters
    return cleaned_input

# ✅ Use user IDs for tracking
response = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "Hello"}],
    user="user-12345"  # For abuse monitoring
)
```

### 2. Cost Management

```python
# Monitor usage
def track_usage(response):
    """Log token usage and costs."""
    usage = response.usage
    cost = estimate_cost(
        usage.prompt_tokens,
        usage.completion_tokens,
        model="gpt-4"
    )
    
    print(f"Tokens: {usage.total_tokens}, Cost: ${cost:.4f}")
    # Log to database/monitoring system

# Set budget limits
def check_budget(user_id):
    """Check if user within budget."""
    current_usage = get_user_usage(user_id)
    if current_usage > USER_BUDGET_LIMIT:
        raise Exception("Budget exceeded")
```

### 3. Prompt Design

```python
# ✅ Clear and specific
prompt = """Summarize the following article in 3 bullet points, 
focusing on key findings:

Article: [text here]"""

# ❌ Vague
prompt = "Summarize this"

# ✅ Include examples (few-shot)
# ✅ Use system prompts for context
# ✅ Break complex tasks into steps
```

### 4. Error Recovery

```python
def robust_api_call(messages, fallback_model="gpt-3.5-turbo"):
    """Try GPT-4, fallback to GPT-3.5 on error."""
    try:
        return client.chat.completions.create(
            model="gpt-4",
            messages=messages
        )
    except Exception as e:
        print(f"GPT-4 failed: {e}. Using fallback model.")
        return client.chat.completions.create(
            model=fallback_model,
            messages=messages
        )
```

---

## Real-World Examples

### Chatbot with Memory

```python
class ChatBot:
    def __init__(self, system_prompt, max_history=10):
        self.client = OpenAI()
        self.messages = [{"role": "system", "content": system_prompt}]
        self.max_history = max_history
    
    def chat(self, user_message):
        # Add user message
        self.messages.append({"role": "user", "content": user_message})
        
        # Keep history manageable
        if len(self.messages) > self.max_history:
            # Keep system prompt and recent messages
            self.messages = [self.messages[0]] + self.messages[-(self.max_history-1):]
        
        # Get response
        try:
            response = self.client.chat.completions.create(
                model="gpt-4",
                messages=self.messages,
                temperature=0.7
            )
            
            assistant_message = response.choices[0].message.content
            self.messages.append({"role": "assistant", "content": assistant_message})
            
            return assistant_message
        
        except Exception as e:
            return f"Error: {e}"
    
    def reset(self):
        self.messages = [self.messages[0]]

# Usage
bot = ChatBot("You are a friendly coding assistant.")
print(bot.chat("How do I read a file in Python?"))
print(bot.chat("What about writing to a file?"))
print(bot.chat("Can you show me an example?"))
```

### Document Q&A with Embeddings

```python
from openai import OpenAI
import numpy as np

class DocumentQA:
    def __init__(self, documents):
        self.client = OpenAI()
        self.documents = documents
        self.embeddings = self._embed_documents()
    
    def _embed_documents(self):
        """Generate embeddings for all documents."""
        response = self.client.embeddings.create(
            model="text-embedding-3-small",
            input=self.documents
        )
        return [item.embedding for item in response.data]
    
    def _cosine_similarity(self, a, b):
        return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))
    
    def ask(self, question, top_k=3):
        """Answer question using relevant documents."""
        # Embed question
        q_response = self.client.embeddings.create(
            model="text-embedding-3-small",
            input=question
        )
        q_embedding = q_response.data[0].embedding
        
        # Find most similar documents
        similarities = [
            self._cosine_similarity(q_embedding, doc_emb)
            for doc_emb in self.embeddings
        ]
        
        top_indices = np.argsort(similarities)[-top_k:][::-1]
        context = "\n\n".join([self.documents[i] for i in top_indices])
        
        # Generate answer
        response = self.client.chat.completions.create(
            model="gpt-4",
            messages=[
                {
                    "role": "system",
                    "content": "Answer questions based on the provided context."
                },
                {
                    "role": "user",
                    "content": f"Context:\n{context}\n\nQuestion: {question}"
                }
            ]
        )
        
        return response.choices[0].message.content

# Usage
documents = [
    "Python is a high-level programming language.",
    "Machine learning is a subset of AI.",
    "Neural networks are inspired by the brain."
]

qa = DocumentQA(documents)
answer = qa.ask("What is Python?")
print(answer)
```

### Content Moderator

```python
def moderate_content(text):
    """Check if content is safe using GPT-4."""
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {
                "role": "system",
                "content": """You are a content moderator. Classify text as:
                - SAFE: Appropriate content
                - UNSAFE: Contains hate speech, violence, explicit content
                - REVIEW: Borderline, needs human review
                
                Respond with only one word: SAFE, UNSAFE, or REVIEW."""
            },
            {
                "role": "user",
                "content": f"Classify this text:\n\n{text}"
            }
        ],
        temperature=0
    )
    
    classification = response.choices[0].message.content.strip()
    return classification

# Usage
result = moderate_content("This is a friendly message!")
print(f"Moderation: {result}")
```

---

## Resources

### Official Documentation
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)
- [OpenAI Cookbook](https://cookbook.openai.com/)
- [Best Practices Guide](https://platform.openai.com/docs/guides/best-practices)
- [Rate Limits](https://platform.openai.com/docs/guides/rate-limits)

### Libraries & Tools
- [OpenAI Python SDK](https://github.com/openai/openai-python)
- [OpenAI Node.js SDK](https://github.com/openai/openai-node)
- [LangChain](https://python.langchain.com/) - LLM application framework
- [LlamaIndex](https://www.llamaindex.ai/) - Data framework for LLMs

### Tutorials
- [Quickstart Guide](https://platform.openai.com/docs/quickstart)
- [Function Calling Guide](https://platform.openai.com/docs/guides/function-calling)
- [Embeddings Guide](https://platform.openai.com/docs/guides/embeddings)
- [Fine-tuning Guide](https://platform.openai.com/docs/guides/fine-tuning)

### Community
- [OpenAI Community Forum](https://community.openai.com/)
- [OpenAI Discord](https://discord.com/invite/openai)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/openai-api)
- [GitHub Discussions](https://github.com/openai/openai-python/discussions)

### Pricing & Usage
- [Pricing Page](https://openai.com/pricing)
- [Usage Dashboard](https://platform.openai.com/usage)
- [API Keys Management](https://platform.openai.com/api-keys)

### Learning Resources
- [OpenAI Blog](https://openai.com/blog)
- [Prompt Engineering Guide](https://platform.openai.com/docs/guides/prompt-engineering)
- [Safety Best Practices](https://platform.openai.com/docs/guides/safety-best-practices)
- [Production Best Practices](https://platform.openai.com/docs/guides/production-best-practices)

### Papers
- [GPT-4 Technical Report](https://arxiv.org/abs/2303.08774)
- [Language Models are Few-Shot Learners](https://arxiv.org/abs/2005.14165) (GPT-3)
- [DALL·E 2 Paper](https://arxiv.org/abs/2204.06125)

---

**Last Updated**: January 2026  
**OpenAI API Version**: v1
