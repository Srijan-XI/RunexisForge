# Anthropic Claude API - Comprehensive Guide

## Table of Contents
- [Introduction](#introduction)
- [Why Claude?](#why-claude)
- [Getting Started](#getting-started)
- [Claude Models Overview](#claude-models-overview)
- [Messages API](#messages-api)
- [Prompt Engineering](#prompt-engineering)
- [System Prompts](#system-prompts)
- [Tool Use (Function Calling)](#tool-use-function-calling)
- [Vision Capabilities](#vision-capabilities)
- [Streaming Responses](#streaming-responses)
- [Extended Context](#extended-context)
- [Safety & Moderation](#safety--moderation)
- [Error Handling](#error-handling)
- [Rate Limits & Optimization](#rate-limits--optimization)
- [Claude vs OpenAI](#claude-vs-openai)
- [Best Practices](#best-practices)
- [Real-World Examples](#real-world-examples)
- [Resources](#resources)

---

## Introduction

Claude is Anthropic's family of large language models designed with a focus on safety, helpfulness, and harmlessness. The Claude API provides access to state-of-the-art AI models with exceptional reasoning capabilities, long context windows, and strong safety guardrails.

### Key Characteristics

- **Safety-First Design**: Built with Constitutional AI for reduced harmful outputs
- **Long Context**: Up to 200K tokens (Claude 3 models)
- **High Accuracy**: Industry-leading performance on coding and reasoning tasks
- **Transparent**: Clear about limitations and uncertainties
- **Versatile**: Excels at analysis, coding, creative writing, and conversation

### Claude 3 Family

- **Claude 3 Opus**: Most capable model for complex tasks
- **Claude 3 Sonnet**: Balanced performance and speed
- **Claude 3 Haiku**: Fastest model for simple tasks

---

## Why Claude?

### Benefits

✅ **Superior Context Window**
- 200K tokens (vs GPT-4's 128K)
- Process entire codebases
- Analyze long documents
- Maintain extended conversations

✅ **Exceptional Reasoning**
- Strong logical deduction
- Excellent at complex analysis
- High accuracy on coding tasks
- Nuanced understanding

✅ **Safety & Reliability**
- Constitutional AI training
- Reduced hallucinations
- Explicit about uncertainty
- Strong content moderation

✅ **Vision Capabilities**
- Multi-modal understanding
- Document analysis (PDFs, charts)
- Image interpretation
- Screenshot analysis

✅ **Developer-Friendly**
- Clean, simple API
- Comprehensive documentation
- Excellent Python SDK
- Transparent pricing

### Use Cases

- **Software Development**: Code generation, debugging, architecture design
- **Research**: Literature review, data analysis, hypothesis generation
- **Legal & Compliance**: Contract analysis, regulatory review
- **Education**: Tutoring, curriculum development, assessment
- **Content Creation**: Writing, editing, brainstorming
- **Customer Support**: Complex query handling, technical support

---

## Getting Started

### Installation

```bash
# Install Anthropic Python SDK
pip install anthropic

# Verify installation
pip show anthropic
```

### API Key Setup

```python
import os
from anthropic import Anthropic

# Method 1: Environment variable (recommended)
os.environ["ANTHROPIC_API_KEY"] = "sk-ant-api03-your-key-here"
client = Anthropic()

# Method 2: Direct initialization
client = Anthropic(api_key="sk-ant-api03-your-key-here")

# Method 3: Using .env file
from dotenv import load_dotenv
load_dotenv()
client = Anthropic()  # Reads from ANTHROPIC_API_KEY env var
```

### First API Call

```python
from anthropic import Anthropic

client = Anthropic()

message = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "Hello, Claude! How are you?"}
    ]
)

print(message.content[0].text)
```

### Check Account Info

```python
# The SDK doesn't have a built-in method to list models
# Check available models at: https://docs.anthropic.com/claude/docs/models-overview

# Common models:
models = [
    "claude-3-opus-20240229",
    "claude-3-5-sonnet-20241022",
    "claude-3-haiku-20240307"
]

for model in models:
    print(model)
```

---

## Claude Models Overview

### Claude 3.5 Sonnet (Latest)

```python
# Most balanced and capable general-purpose model
message = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=4096,
    messages=[
        {"role": "user", "content": "Explain quantum computing in simple terms."}
    ]
)
```

**Characteristics:**
- **Context**: 200K tokens
- **Performance**: Surpasses Claude 3 Opus on many benchmarks
- **Speed**: 2x faster than Claude 3 Opus
- **Best For**: Code generation, complex reasoning, analysis

### Claude 3 Opus

```python
# Most powerful for highly complex tasks
message = client.messages.create(
    model="claude-3-opus-20240229",
    max_tokens=4096,
    messages=[
        {"role": "user", "content": "Analyze this complex legal document..."}
    ]
)
```

**Characteristics:**
- **Context**: 200K tokens
- **Performance**: Highest accuracy and capability
- **Speed**: Slower, more thorough
- **Best For**: Research, complex analysis, critical tasks

### Claude 3 Sonnet

```python
# Balanced performance and cost
message = client.messages.create(
    model="claude-3-sonnet-20240229",
    max_tokens=4096,
    messages=[
        {"role": "user", "content": "Summarize this article..."}
    ]
)
```

**Characteristics:**
- **Context**: 200K tokens
- **Performance**: Excellent for most tasks
- **Speed**: Fast
- **Best For**: General use, high-volume applications

### Claude 3 Haiku

```python
# Fastest and most cost-effective
message = client.messages.create(
    model="claude-3-haiku-20240307",
    max_tokens=4096,
    messages=[
        {"role": "user", "content": "What's 2+2?"}
    ]
)
```

**Characteristics:**
- **Context**: 200K tokens
- **Performance**: Good for simple tasks
- **Speed**: Fastest (near-instant responses)
- **Best For**: Simple queries, high-throughput, chatbots

### Model Comparison

| Model | Context | Speed | Cost (MTok) | Best Use Case |
|-------|---------|-------|-------------|---------------|
| Claude 3.5 Sonnet | 200K | Fast | $3 / $15 | Code, analysis, general |
| Claude 3 Opus | 200K | Slower | $15 / $75 | Complex research, critical |
| Claude 3 Sonnet | 200K | Fast | $3 / $15 | Balanced general use |
| Claude 3 Haiku | 200K | Fastest | $0.25 / $1.25 | Simple tasks, high volume |

*Prices: Input / Output per million tokens (as of January 2026)

---

## Messages API

### Basic Message

```python
message = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "What is the capital of France?"}
    ]
)

print(message.content[0].text)
```

### Multi-Turn Conversation

```python
messages = [
    {"role": "user", "content": "Hi! I'm learning Python."},
    {"role": "assistant", "content": "Great! I'd be happy to help you learn Python. What would you like to know?"},
    {"role": "user", "content": "How do I read a CSV file?"}
]

message = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    messages=messages
)

print(message.content[0].text)
```

### Conversation Management

```python
class ClaudeChat:
    def __init__(self, system_prompt=None):
        self.client = Anthropic()
        self.messages = []
        self.system_prompt = system_prompt
    
    def send_message(self, user_message):
        # Add user message
        self.messages.append({"role": "user", "content": user_message})
        
        # Create API call
        kwargs = {
            "model": "claude-3-5-sonnet-20241022",
            "max_tokens": 4096,
            "messages": self.messages
        }
        
        if self.system_prompt:
            kwargs["system"] = self.system_prompt
        
        response = self.client.messages.create(**kwargs)
        
        # Extract assistant response
        assistant_message = response.content[0].text
        
        # Add to conversation history
        self.messages.append({"role": "assistant", "content": assistant_message})
        
        return assistant_message
    
    def reset(self):
        self.messages = []

# Usage
chat = ClaudeChat(system_prompt="You are a helpful Python tutor.")
print(chat.send_message("What's a list comprehension?"))
print(chat.send_message("Can you show me an example?"))
```

### Response Parameters

```python
message = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    
    # Maximum tokens in response (required)
    max_tokens=2048,
    
    # Temperature: 0.0 (focused) to 1.0 (creative)
    temperature=0.7,
    
    # Top-p sampling
    top_p=0.9,
    
    # Top-k sampling
    top_k=40,
    
    # System prompt
    system="You are a helpful assistant.",
    
    # Messages
    messages=[
        {"role": "user", "content": "Write a haiku about coding."}
    ],
    
    # Stop sequences
    stop_sequences=["\n\nHuman:", "END"],
    
    # Metadata for tracking
    metadata={
        "user_id": "user-123"
    }
)
```

### Accessing Response Data

```python
response = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Hello!"}]
)

# Response text
text = response.content[0].text

# Model used
model = response.model

# Token usage
input_tokens = response.usage.input_tokens
output_tokens = response.usage.output_tokens

# Stop reason
stop_reason = response.stop_reason  # "end_turn", "max_tokens", "stop_sequence"

print(f"Tokens: {input_tokens} in, {output_tokens} out")
print(f"Stop reason: {stop_reason}")
```

---

## Prompt Engineering

### Clear Instructions

```python
# ❌ Vague
message = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Tell me about dogs"}]
)

# ✅ Specific
message = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    messages=[{
        "role": "user",
        "content": """Write a 200-word informative article about Golden Retrievers.
        Focus on:
        1. Temperament and personality
        2. Exercise requirements
        3. Why they make good family pets
        
        Use a friendly, accessible tone."""
    }]
)
```

### XML Tags for Structure

Claude responds well to XML-tagged content:

```python
prompt = """Please analyze the following customer feedback:

<feedback>
The product arrived late and the packaging was damaged. However, 
the product itself works great and the customer service was helpful.
</feedback>

Provide:
1. Sentiment (positive/negative/mixed)
2. Key issues mentioned
3. Positive aspects mentioned
4. Recommended action

Format your response with clear headings."""

message = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    messages=[{"role": "user", "content": prompt}]
)
```

### Few-Shot Learning

```python
messages = [
    {"role": "user", "content": "Classify: 'This product is amazing!'"},
    {"role": "assistant", "content": "Sentiment: Positive"},
    
    {"role": "user", "content": "Classify: 'Worst purchase ever.'"},
    {"role": "assistant", "content": "Sentiment: Negative"},
    
    {"role": "user", "content": "Classify: 'It's okay, nothing special.'"},
    {"role": "assistant", "content": "Sentiment: Neutral"},
    
    {"role": "user", "content": "Classify: 'Great value for money!'"}
]

response = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=100,
    messages=messages
)
```

### Chain of Thought

```python
prompt = """Let's solve this step by step:

A store sells apples for $2 each and oranges for $3 each.
If someone buys 5 apples and 3 oranges, what's the total cost?

Please show your work:
1. First, calculate the cost of apples
2. Then, calculate the cost of oranges
3. Finally, add them together"""

message = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    messages=[{"role": "user", "content": prompt}]
)
```

### Prefilling Assistant Response

```python
# Guide response format by starting assistant's response
messages = [
    {"role": "user", "content": "What's the capital of France?"},
    {"role": "assistant", "content": "The capital of France is"}
]

response = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=100,
    messages=messages
)

# Claude will complete: "The capital of France is Paris."
```

---

## System Prompts

### Basic System Prompt

```python
message = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    system="You are a senior Python developer who provides concise, practical advice with code examples.",
    messages=[
        {"role": "user", "content": "How do I handle exceptions in Python?"}
    ]
)
```

### Complex System Prompt

```python
system_prompt = """You are an expert technical writer and software architect.

Your responsibilities:
- Explain complex technical concepts clearly
- Provide production-ready code examples
- Follow best practices and design patterns
- Consider security and performance
- Use type hints in Python code

Style guidelines:
- Be concise but thorough
- Use bullet points for lists
- Include code comments
- Explain trade-offs when relevant

When writing code:
- Follow PEP 8 style guide
- Use meaningful variable names
- Include error handling
- Add docstrings to functions"""

message = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=2048,
    system=system_prompt,
    messages=[
        {"role": "user", "content": "Design a REST API for a todo list application."}
    ]
)
```

### Dynamic System Prompts

```python
def get_system_prompt(user_role, task_type):
    """Generate appropriate system prompt based on context."""
    prompts = {
        "developer": "You are a senior software engineer with expertise in modern development practices.",
        "student": "You are a patient tutor who explains concepts clearly with simple examples.",
        "business": "You are a business analyst who focuses on practical, ROI-driven solutions."
    }
    
    base = prompts.get(user_role, "You are a helpful assistant.")
    
    if task_type == "code":
        base += " Provide production-ready code with error handling."
    elif task_type == "explain":
        base += " Use analogies and step-by-step explanations."
    
    return base

# Usage
system = get_system_prompt(user_role="student", task_type="explain")
message = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    system=system,
    messages=[{"role": "user", "content": "What is recursion?"}]
)
```

---

## Tool Use (Function Calling)

### Define Tools

```python
tools = [
    {
        "name": "get_weather",
        "description": "Get the current weather for a location. Returns temperature, conditions, and forecast.",
        "input_schema": {
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
```

### Basic Tool Use

```python
message = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    tools=tools,
    messages=[{"role": "user", "content": "What's the weather in Paris?"}]
)

# Check if tool was used
if message.stop_reason == "tool_use":
    for content in message.content:
        if content.type == "tool_use":
            print(f"Tool: {content.name}")
            print(f"Input: {content.input}")
```

### Complete Tool Use Flow

```python
import json

def get_weather(location, unit="celsius"):
    """Simulated weather API."""
    return {
        "location": location,
        "temperature": 22,
        "unit": unit,
        "condition": "sunny",
        "forecast": "Clear skies expected"
    }

def process_tool_call(user_message):
    # Available functions
    available_tools = {
        "get_weather": get_weather
    }
    
    # Define tools for Claude
    tools = [
        {
            "name": "get_weather",
            "description": "Get current weather for a location",
            "input_schema": {
                "type": "object",
                "properties": {
                    "location": {"type": "string"},
                    "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]}
                },
                "required": ["location"]
            }
        }
    ]
    
    # Initial request
    messages = [{"role": "user", "content": user_message}]
    
    response = client.messages.create(
        model="claude-3-5-sonnet-20241022",
        max_tokens=1024,
        tools=tools,
        messages=messages
    )
    
    # Process tool use
    while response.stop_reason == "tool_use":
        # Extract tool use and text content
        tool_use_blocks = [c for c in response.content if c.type == "tool_use"]
        
        # Add assistant response to messages
        messages.append({"role": "assistant", "content": response.content})
        
        # Execute tools and collect results
        tool_results = []
        for tool_use in tool_use_blocks:
            tool_name = tool_use.name
            tool_input = tool_use.input
            
            # Execute function
            result = available_tools[tool_name](**tool_input)
            
            tool_results.append({
                "type": "tool_result",
                "tool_use_id": tool_use.id,
                "content": json.dumps(result)
            })
        
        # Add tool results to messages
        messages.append({"role": "user", "content": tool_results})
        
        # Get final response
        response = client.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=1024,
            tools=tools,
            messages=messages
        )
    
    # Extract final text response
    return response.content[0].text

# Usage
result = process_tool_call("What's the weather like in Tokyo?")
print(result)
```

### Multiple Tools

```python
tools = [
    {
        "name": "search_database",
        "description": "Search product database",
        "input_schema": {
            "type": "object",
            "properties": {
                "query": {"type": "string"},
                "category": {"type": "string"}
            },
            "required": ["query"]
        }
    },
    {
        "name": "get_product_details",
        "description": "Get detailed product information",
        "input_schema": {
            "type": "object",
            "properties": {
                "product_id": {"type": "string"}
            },
            "required": ["product_id"]
        }
    },
    {
        "name": "calculate_total",
        "description": "Calculate order total with tax and shipping",
        "input_schema": {
            "type": "object",
            "properties": {
                "items": {
                    "type": "array",
                    "items": {"type": "object"}
                },
                "shipping_method": {"type": "string"}
            },
            "required": ["items"]
        }
    }
]
```

---

## Vision Capabilities

### Analyze Image from URL

```python
message = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "image",
                    "source": {
                        "type": "url",
                        "url": "https://example.com/image.jpg"
                    }
                },
                {
                    "type": "text",
                    "text": "What's in this image?"
                }
            ]
        }
    ]
)

print(message.content[0].text)
```

### Analyze Base64 Image

```python
import base64

def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

# Read and encode image
image_data = encode_image("path/to/image.jpg")

message = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "image",
                    "source": {
                        "type": "base64",
                        "media_type": "image/jpeg",
                        "data": image_data
                    }
                },
                {
                    "type": "text",
                    "text": "Describe this image in detail."
                }
            ]
        }
    ]
)
```

### Multiple Images

```python
message = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": "Compare these two images. What are the main differences?"
                },
                {
                    "type": "image",
                    "source": {
                        "type": "url",
                        "url": "https://example.com/image1.jpg"
                    }
                },
                {
                    "type": "image",
                    "source": {
                        "type": "url",
                        "url": "https://example.com/image2.jpg"
                    }
                }
            ]
        }
    ]
)
```

### Document Analysis

```python
# Analyze charts, graphs, screenshots, PDFs (as images)
message = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=2048,
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "image",
                    "source": {
                        "type": "url",
                        "url": "https://example.com/chart.png"
                    }
                },
                {
                    "type": "text",
                    "text": """Analyze this chart and provide:
                    1. Main trends
                    2. Key insights
                    3. Anomalies or outliers
                    4. Recommendations based on data"""
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
with client.messages.stream(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Write a short story about a robot."}]
) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)
```

### Streaming with Event Handling

```python
with client.messages.stream(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Tell me a joke"}]
) as stream:
    for event in stream:
        if event.type == "content_block_start":
            print(f"\n[Block started: {event.content_block.type}]")
        elif event.type == "content_block_delta":
            if hasattr(event.delta, 'text'):
                print(event.delta.text, end="", flush=True)
        elif event.type == "message_stop":
            print("\n[Message complete]")
```

### Get Final Message from Stream

```python
with client.messages.stream(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Explain recursion."}]
) as stream:
    # Stream text
    for text in stream.text_stream:
        print(text, end="", flush=True)
    
    # Get full message object
    final_message = stream.get_final_message()
    
    print(f"\n\nTokens used: {final_message.usage.input_tokens} in, {final_message.usage.output_tokens} out")
```

### Async Streaming

```python
import asyncio

async def async_stream_example():
    async with client.messages.stream(
        model="claude-3-5-sonnet-20241022",
        max_tokens=1024,
        messages=[{"role": "user", "content": "Count to 10"}]
    ) as stream:
        async for text in stream.text_stream:
            print(text, end="", flush=True)

# Run
asyncio.run(async_stream_example())
```

---

## Extended Context

### Using Long Context (200K tokens)

```python
# Read long document
with open("long_document.txt", "r") as f:
    document = f.read()

# Claude can process up to 200K tokens (~150K words)
message = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=4096,
    messages=[
        {
            "role": "user",
            "content": f"""Please analyze this entire document:

<document>
{document}
</document>

Provide:
1. Executive summary
2. Key findings
3. Recommendations
4. Action items"""
        }
    ]
)
```

### Process Entire Codebase

```python
import os

def read_codebase(directory, extensions=['.py', '.js', '.java']):
    """Read all code files in directory."""
    code_files = []
    
    for root, dirs, files in os.walk(directory):
        for file in files:
            if any(file.endswith(ext) for ext in extensions):
                filepath = os.path.join(root, file)
                with open(filepath, 'r') as f:
                    code_files.append({
                        'path': filepath,
                        'content': f.read()
                    })
    
    return code_files

# Read codebase
files = read_codebase("./my_project")

# Create prompt with all files
file_contents = "\n\n".join([
    f"<file path='{f['path']}'>\n{f['content']}\n</file>"
    for f in files
])

message = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=4096,
    messages=[
        {
            "role": "user",
            "content": f"""Analyze this codebase:

{file_contents}

Provide:
1. Architecture overview
2. Potential issues or bugs
3. Security concerns
4. Suggested improvements"""
        }
    ]
)
```

### Document Q&A

```python
def document_qa(document_path, question):
    """Answer questions about a long document."""
    with open(document_path, 'r') as f:
        document = f.read()
    
    message = client.messages.create(
        model="claude-3-5-sonnet-20241022",
        max_tokens=2048,
        system="You are a helpful assistant that answers questions based on provided documents. Only use information from the document.",
        messages=[
            {
                "role": "user",
                "content": f"""<document>
{document}
</document>

Question: {question}

Please answer based only on the information in the document above."""
            }
        ]
    )
    
    return message.content[0].text

# Usage
answer = document_qa("research_paper.txt", "What were the main findings?")
print(answer)
```

---

## Safety & Moderation

### Content Moderation

Claude has built-in safety measures, but you can add additional checks:

```python
def moderate_content(text):
    """Check content for policy violations."""
    message = client.messages.create(
        model="claude-3-haiku-20240307",  # Fast model for moderation
        max_tokens=100,
        system="You are a content moderator. Classify content as SAFE, UNSAFE, or REVIEW.",
        messages=[
            {
                "role": "user",
                "content": f"""Classify this content:

<content>
{text}
</content>

Respond with only one word: SAFE, UNSAFE, or REVIEW."""
            }
        ],
        temperature=0
    )
    
    return message.content[0].text.strip()

# Usage
result = moderate_content("This is a friendly message!")
print(f"Moderation: {result}")
```

### Handling Refusals

```python
message = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "Help me with something harmful"}
    ]
)

# Claude will politely refuse
response_text = message.content[0].text

if "I can't" in response_text or "I cannot" in response_text:
    print("Request was refused due to safety policies")
else:
    print(response_text)
```

### Transparent Uncertainty

Claude will often express uncertainty when appropriate:

```python
message = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "What will the stock market do tomorrow?"}
    ]
)

# Claude will likely express that it cannot predict the future
print(message.content[0].text)
```

---

## Error Handling

### Basic Error Handling

```python
from anthropic import APIError, RateLimitError, APITimeoutError

try:
    message = client.messages.create(
        model="claude-3-5-sonnet-20241022",
        max_tokens=1024,
        messages=[{"role": "user", "content": "Hello"}]
    )
    print(message.content[0].text)

except RateLimitError as e:
    print(f"Rate limit exceeded: {e}")
    # Implement backoff

except APITimeoutError as e:
    print(f"Request timed out: {e}")
    # Retry

except APIError as e:
    print(f"API error: {e}")
    # Handle error

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
            return client.messages.create(
                model="claude-3-5-sonnet-20241022",
                max_tokens=1024,
                messages=messages
            )
        
        except RateLimitError:
            if attempt == max_retries - 1:
                raise
            
            # Exponential backoff with jitter
            wait_time = (2 ** attempt) + random.uniform(0, 1)
            print(f"Rate limited. Waiting {wait_time:.2f}s...")
            time.sleep(wait_time)
        
        except APITimeoutError:
            if attempt == max_retries - 1:
                raise
            
            print(f"Timeout on attempt {attempt + 1}. Retrying...")
            time.sleep(2)
    
    raise Exception("Max retries exceeded")

# Usage
messages = [{"role": "user", "content": "Hello"}]
response = api_call_with_retry(messages)
```

### Timeout Configuration

```python
from anthropic import Anthropic

# Set custom timeout
client = Anthropic(timeout=60.0)  # 60 seconds

# Or per request
message = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Hello"}],
    timeout=30.0
)
```

---

## Rate Limits & Optimization

### Batch Processing

```python
import asyncio
from anthropic import AsyncAnthropic

async_client = AsyncAnthropic()

async def process_batch(prompts):
    """Process multiple prompts concurrently."""
    tasks = []
    
    for prompt in prompts:
        task = async_client.messages.create(
            model="claude-3-haiku-20240307",  # Fast model
            max_tokens=1024,
            messages=[{"role": "user", "content": prompt}]
        )
        tasks.append(task)
    
    responses = await asyncio.gather(*tasks)
    return [r.content[0].text for r in responses]

# Usage
prompts = ["Question 1", "Question 2", "Question 3"]
results = asyncio.run(process_batch(prompts))
```

### Cost Optimization

```python
def estimate_cost(input_tokens, output_tokens, model="claude-3-5-sonnet-20241022"):
    """Estimate API cost."""
    pricing = {
        "claude-3-opus-20240229": {"input": 15/1_000_000, "output": 75/1_000_000},
        "claude-3-5-sonnet-20241022": {"input": 3/1_000_000, "output": 15/1_000_000},
        "claude-3-sonnet-20240229": {"input": 3/1_000_000, "output": 15/1_000_000},
        "claude-3-haiku-20240307": {"input": 0.25/1_000_000, "output": 1.25/1_000_000}
    }
    
    input_cost = input_tokens * pricing[model]["input"]
    output_cost = output_tokens * pricing[model]["output"]
    
    return input_cost + output_cost

# Choose model based on task
def select_model(task_complexity):
    if task_complexity == "simple":
        return "claude-3-haiku-20240307"
    elif task_complexity == "medium":
        return "claude-3-5-sonnet-20241022"
    else:
        return "claude-3-opus-20240229"
```

### Token Counting

```python
from anthropic import Anthropic

client = Anthropic()

# Make request and check token usage
message = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Hello, Claude!"}]
)

print(f"Input tokens: {message.usage.input_tokens}")
print(f"Output tokens: {message.usage.output_tokens}")

# Estimate cost
cost = estimate_cost(
    message.usage.input_tokens,
    message.usage.output_tokens,
    "claude-3-5-sonnet-20241022"
)
print(f"Estimated cost: ${cost:.6f}")
```

---

## Claude vs OpenAI

### Feature Comparison

| Feature | Claude 3 | GPT-4 |
|---------|----------|-------|
| Context Window | 200K tokens | 128K tokens (Turbo) |
| Vision | Yes (all models) | GPT-4 Vision only |
| Function Calling | Tool Use API | Function Calling API |
| Streaming | Yes | Yes |
| Fine-tuning | No | Yes (GPT-3.5) |
| Safety Focus | High (Constitutional AI) | Moderate |
| Pricing (per MTok) | $0.25 - $75 | $0.50 - $60 |

### When to Use Claude

✅ **Choose Claude for:**
- Long document analysis (200K context)
- Code generation and debugging
- Complex reasoning tasks
- Safety-critical applications
- Nuanced understanding required
- Multi-modal tasks (vision + text)

### When to Use GPT-4

✅ **Choose GPT-4 for:**
- Fine-tuning custom models
- Established ecosystem (LangChain, etc.)
- DALL-E image generation integration
- Whisper audio transcription
- Function calling with complex workflows

### API Comparison

```python
# Claude
from anthropic import Anthropic
client = Anthropic()

message = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    system="You are helpful.",
    messages=[{"role": "user", "content": "Hello"}]
)
response = message.content[0].text

# OpenAI
from openai import OpenAI
client = OpenAI()

completion = client.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": "You are helpful."},
        {"role": "user", "content": "Hello"}
    ]
)
response = completion.choices[0].message.content
```

---

## Best Practices

### 1. Leverage Long Context

```python
# ✅ Use Claude's 200K context for comprehensive analysis
with open("entire_codebase.txt", "r") as f:
    codebase = f.read()

message = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=4096,
    messages=[{
        "role": "user",
        "content": f"Analyze this codebase:\n\n{codebase}"
    }]
)
```

### 2. Use XML Tags

```python
# ✅ Structure complex prompts with XML
prompt = """Analyze these customer reviews:

<reviews>
<review id="1">Great product, fast shipping!</review>
<review id="2">Poor quality, broke after a week.</review>
<review id="3">Decent value for money.</review>
</reviews>

For each review, provide:
- Sentiment
- Key themes
- Priority level"""

message = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=2048,
    messages=[{"role": "user", "content": prompt}]
)
```

### 3. Choose Right Model

```python
# Simple tasks: Haiku (fast, cheap)
quick_answer = client.messages.create(
    model="claude-3-haiku-20240307",
    max_tokens=100,
    messages=[{"role": "user", "content": "What's 2+2?"}]
)

# Complex tasks: Opus (accurate, thorough)
deep_analysis = client.messages.create(
    model="claude-3-opus-20240229",
    max_tokens=4096,
    messages=[{"role": "user", "content": "Analyze this legal contract..."}]
)

# Balanced: Sonnet (default choice)
general_use = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=2048,
    messages=[{"role": "user", "content": "Write a blog post about AI..."}]
)
```

### 4. Optimize Token Usage

```python
# ✅ Set appropriate max_tokens
# Don't always use maximum

# For yes/no: 10-50 tokens
quick = client.messages.create(
    model="claude-3-haiku-20240307",
    max_tokens=50,
    messages=[{"role": "user", "content": "Is Paris in France? Yes or no."}]
)

# For detailed response: 1000-4096 tokens
detailed = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=2048,
    messages=[{"role": "user", "content": "Explain quantum computing."}]
)
```

### 5. Security Best Practices

```python
# ✅ Environment variables for API keys
import os
api_key = os.getenv("ANTHROPIC_API_KEY")

# ✅ Sanitize user input
def sanitize_input(text, max_length=10000):
    # Remove potentially harmful content
    # Limit length
    return text[:max_length]

# ✅ Add metadata for tracking
message = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    metadata={"user_id": "user-123"},
    messages=[{"role": "user", "content": sanitized_input}]
)
```

---

## Real-World Examples

### Advanced Chatbot

```python
class AdvancedClaude:
    def __init__(self, system_prompt="You are a helpful assistant.", model="claude-3-5-sonnet-20241022"):
        self.client = Anthropic()
        self.model = model
        self.system_prompt = system_prompt
        self.conversations = {}
    
    def chat(self, user_id, message):
        # Get or create conversation history
        if user_id not in self.conversations:
            self.conversations[user_id] = []
        
        # Add user message
        self.conversations[user_id].append({
            "role": "user",
            "content": message
        })
        
        # Manage context window (keep last 20 messages)
        if len(self.conversations[user_id]) > 20:
            self.conversations[user_id] = self.conversations[user_id][-20:]
        
        # Get response
        try:
            response = self.client.messages.create(
                model=self.model,
                max_tokens=2048,
                system=self.system_prompt,
                messages=self.conversations[user_id]
            )
            
            assistant_message = response.content[0].text
            
            # Add to history
            self.conversations[user_id].append({
                "role": "assistant",
                "content": assistant_message
            })
            
            return {
                "response": assistant_message,
                "tokens": response.usage.input_tokens + response.usage.output_tokens
            }
        
        except Exception as e:
            return {"error": str(e)}
    
    def reset(self, user_id):
        self.conversations[user_id] = []

# Usage
bot = AdvancedClaude(
    system_prompt="You are a technical support assistant specializing in Python."
)

result = bot.chat("user-123", "How do I read a CSV file?")
print(result["response"])

result = bot.chat("user-123", "What about writing to one?")
print(result["response"])
```

### Code Review Assistant

```python
def review_code(code, language="python"):
    """Comprehensive code review using Claude."""
    
    prompt = f"""Review this {language} code:

<code>
{code}
</code>

Provide a comprehensive review covering:

1. **Correctness**: Are there any bugs or logic errors?
2. **Performance**: Any optimization opportunities?
3. **Security**: Potential security vulnerabilities?
4. **Best Practices**: Following language conventions?
5. **Readability**: Code clarity and documentation?
6. **Suggestions**: Specific improvements with examples

Format your response with clear sections."""

    message = client.messages.create(
        model="claude-3-5-sonnet-20241022",
        max_tokens=4096,
        system="You are an expert code reviewer with deep knowledge of software engineering best practices.",
        messages=[{"role": "user", "content": prompt}]
    )
    
    return message.content[0].text

# Usage
code = """
def calculate_average(numbers):
    total = 0
    for num in numbers:
        total = total + num
    return total / len(numbers)
"""

review = review_code(code)
print(review)
```

### Document Summarizer with Citations

```python
def summarize_with_citations(document, summary_length="medium"):
    """Summarize document with specific citations."""
    
    length_tokens = {
        "short": 500,
        "medium": 1000,
        "long": 2000
    }
    
    prompt = f"""Summarize the following document:

<document>
{document}
</document>

Requirements:
1. Provide a {summary_length} summary
2. Include specific quotes to support key points
3. Use citation format: [Quote: "exact text from document"]
4. Structure with clear sections
5. Highlight most important findings

Format as:
## Summary
[Your summary]

## Key Quotes
[Relevant quotes with context]

## Main Findings
[Bullet points]"""

    message = client.messages.create(
        model="claude-3-5-sonnet-20241022",
        max_tokens=length_tokens[summary_length],
        system="You are a research assistant who creates accurate, well-cited summaries.",
        messages=[{"role": "user", "content": prompt}]
    )
    
    return message.content[0].text

# Usage
with open("research_paper.txt", "r") as f:
    paper = f.read()

summary = summarize_with_citations(paper, summary_length="medium")
print(summary)
```

---

## Resources

### Official Documentation
- [Anthropic Documentation](https://docs.anthropic.com/)
- [API Reference](https://docs.anthropic.com/claude/reference/getting-started)
- [Claude Models Overview](https://docs.anthropic.com/claude/docs/models-overview)
- [Prompt Engineering Guide](https://docs.anthropic.com/claude/docs/prompt-engineering)

### SDKs & Libraries
- [Python SDK](https://github.com/anthropics/anthropic-sdk-python)
- [TypeScript SDK](https://github.com/anthropics/anthropic-sdk-typescript)
- [Claude API Cookbook](https://github.com/anthropics/anthropic-cookbook)

### Tutorials & Guides
- [Getting Started](https://docs.anthropic.com/claude/docs/quickstart)
- [Tool Use Guide](https://docs.anthropic.com/claude/docs/tool-use)
- [Vision Guide](https://docs.anthropic.com/claude/docs/vision)
- [Streaming Guide](https://docs.anthropic.com/claude/docs/streaming)

### Community
- [Anthropic Discord](https://discord.gg/anthropic)
- [GitHub Discussions](https://github.com/anthropics/anthropic-sdk-python/discussions)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/claude-ai)

### Pricing & Usage
- [Pricing](https://www.anthropic.com/pricing)
- [Console Dashboard](https://console.anthropic.com/)
- [API Keys Management](https://console.anthropic.com/settings/keys)

### Learning Resources
- [Anthropic Blog](https://www.anthropic.com/news)
- [Research Papers](https://www.anthropic.com/research)
- [Constitutional AI Paper](https://arxiv.org/abs/2212.08073)
- [Claude 3 Model Card](https://www.anthropic.com/claude-3-model-card)

### Best Practices
- [Safety Best Practices](https://docs.anthropic.com/claude/docs/safety-best-practices)
- [Production Best Practices](https://docs.anthropic.com/claude/docs/production-best-practices)
- [Prompt Library](https://docs.anthropic.com/claude/docs/prompt-library)

### Tools & Integrations
- [LangChain Integration](https://python.langchain.com/docs/integrations/chat/anthropic)
- [Vertex AI (Google Cloud)](https://docs.anthropic.com/claude/docs/claude-on-vertex-ai)
- [Amazon Bedrock](https://docs.anthropic.com/claude/docs/claude-on-amazon-bedrock)

---

**Last Updated**: January 2026  
**Anthropic SDK Version**: 0.18+  
**Claude Models**: Claude 3 Family (Opus, Sonnet, Haiku) + Claude 3.5 Sonnet
