# Hugging Face Transformers - State-of-the-Art NLP

## Table of Contents
- [Introduction](#introduction)
- [Why Hugging Face?](#why-hugging-face)
- [Installation & Setup](#installation--setup)
- [Core Concepts](#core-concepts)
- [Pipelines - Quick Start](#pipelines---quick-start)
- [Tokenizers](#tokenizers)
- [Pre-trained Models](#pre-trained-models)
- [Fine-tuning Models](#fine-tuning-models)
- [Text Generation](#text-generation)
- [Common NLP Tasks](#common-nlp-tasks)
- [Model Hub](#model-hub)
- [Datasets Library](#datasets-library)
- [Training APIs](#training-apis)
- [Model Deployment](#model-deployment)
- [Advanced Features](#advanced-features)
- [Best Practices](#best-practices)
- [Real-World Examples](#real-world-examples)
- [Resources](#resources)

---

## Introduction

Hugging Face Transformers is an open-source library providing thousands of pre-trained models for Natural Language Processing (NLP), Computer Vision, and Audio tasks. It has become the de facto standard for working with transformer-based models like BERT, GPT, T5, and more.

### Key Characteristics

- **Unified API**: Consistent interface across all models
- **Model Hub**: 200,000+ pre-trained models
- **Multi-framework**: PyTorch, TensorFlow, JAX support
- **Production-Ready**: Optimized inference, quantization, deployment tools
- **Community-Driven**: Active community, extensive documentation
- **Multi-modal**: Text, vision, audio, and multi-modal models

### Supported Architectures

- **Encoders**: BERT, RoBERTa, ALBERT, DistilBERT
- **Decoders**: GPT-2, GPT-3, GPT-Neo, Llama, Mistral
- **Encoder-Decoders**: T5, BART, mBART, Pegasus
- **Vision**: ViT, CLIP, DeiT, Swin Transformer
- **Multi-modal**: CLIP, BLIP, LLaVA, Flamingo

---

## Why Hugging Face?

### Benefits

✅ **Ease of Use**
- Simple 3-line inference
- Pre-trained models ready to use
- Automatic model downloading
- Unified API across models

✅ **Comprehensive**
- 200,000+ models
- 20,000+ datasets
- All major architectures
- Multiple languages (100+)

✅ **Production-Ready**
- Optimized inference
- Model quantization
- ONNX export
- Cloud deployment tools

✅ **Active Community**
- Frequent updates
- Extensive documentation
- Community models
- Regular competitions

### Use Cases

- **Text Classification**: Sentiment analysis, topic classification, spam detection
- **Named Entity Recognition**: Extract entities from text
- **Question Answering**: Extractive and generative QA
- **Text Generation**: Creative writing, code generation, chatbots
- **Translation**: Machine translation, multilingual models
- **Summarization**: Document summarization, news summarization
- **Image Classification**: Computer vision tasks
- **Speech Recognition**: Audio transcription, voice commands

---

## Installation & Setup

### Installation

```bash
# Basic installation
pip install transformers

# With PyTorch
pip install transformers[torch]

# With TensorFlow
pip install transformers[tf]

# With additional dependencies
pip install transformers[sentencepiece]  # For T5, XLNet
pip install transformers[tokenizers]     # Fast tokenizers
pip install transformers[vision]         # Computer vision
pip install transformers[audio]          # Audio processing

# All dependencies
pip install transformers[all]

# Development version
pip install git+https://github.com/huggingface/transformers
```

### Verify Installation

```python
import transformers

print(f"Transformers version: {transformers.__version__}")

# Check PyTorch/TensorFlow
import torch
print(f"PyTorch version: {torch.__version__}")
print(f"CUDA available: {torch.cuda.is_available()}")

# Test with simple pipeline
from transformers import pipeline

classifier = pipeline("sentiment-analysis")
result = classifier("I love Hugging Face!")
print(result)
```

### Additional Tools

```bash
# Datasets library
pip install datasets

# Accelerate (distributed training)
pip install accelerate

# Evaluate (metrics)
pip install evaluate

# PEFT (parameter-efficient fine-tuning)
pip install peft

# bitsandbytes (quantization)
pip install bitsandbytes

# Optimum (hardware optimization)
pip install optimum
```

---

## Core Concepts

### Transformers Architecture

```
Input Text → Tokenizer → Token IDs → Model → Output
                                        ↓
                              Hidden States/Logits
```

### Key Components

1. **Tokenizer**: Converts text to token IDs
2. **Model**: Transformer neural network
3. **Configuration**: Model hyperparameters
4. **Trainer**: Training loop abstraction

### Basic Workflow

```python
from transformers import AutoTokenizer, AutoModel

# 1. Load tokenizer and model
tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
model = AutoModel.from_pretrained("bert-base-uncased")

# 2. Tokenize input
text = "Hello, Hugging Face!"
inputs = tokenizer(text, return_tensors="pt")

# 3. Forward pass
outputs = model(**inputs)

# 4. Extract features
last_hidden_state = outputs.last_hidden_state
print(last_hidden_state.shape)  # (batch_size, sequence_length, hidden_size)
```

---

## Pipelines - Quick Start

Pipelines provide the simplest way to use pre-trained models.

### Sentiment Analysis

```python
from transformers import pipeline

# Create pipeline
classifier = pipeline("sentiment-analysis")

# Single prediction
result = classifier("I love this movie!")
print(result)  # [{'label': 'POSITIVE', 'score': 0.9998}]

# Batch prediction
texts = [
    "This is great!",
    "I hate this.",
    "It's okay."
]
results = classifier(texts)
print(results)
```

### Text Generation

```python
generator = pipeline("text-generation", model="gpt2")

# Generate text
output = generator(
    "Once upon a time",
    max_length=50,
    num_return_sequences=3,
    temperature=0.7
)

for i, generated in enumerate(output):
    print(f"Generated {i+1}: {generated['generated_text']}")
```

### Named Entity Recognition

```python
ner = pipeline("ner", aggregation_strategy="simple")

text = "Apple Inc. is headquartered in Cupertino, California."
entities = ner(text)

for entity in entities:
    print(f"{entity['word']}: {entity['entity_group']} ({entity['score']:.4f})")
```

### Question Answering

```python
qa = pipeline("question-answering")

context = """
Hugging Face is a company that develops tools for building applications 
using machine learning. It is most notable for its Transformers library.
"""

question = "What is Hugging Face known for?"

answer = qa(question=question, context=context)
print(f"Answer: {answer['answer']}")
print(f"Score: {answer['score']:.4f}")
```

### Translation

```python
translator = pipeline("translation_en_to_fr", model="Helsinki-NLP/opus-mt-en-fr")

text = "Hello, how are you?"
translation = translator(text)
print(translation[0]['translation_text'])
```

### Summarization

```python
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

article = """
The tower is 324 metres (1,063 ft) tall, about the same height as an 
81-storey building. It was the tallest structure in Paris until 1973...
"""

summary = summarizer(article, max_length=50, min_length=10)
print(summary[0]['summary_text'])
```

### Zero-Shot Classification

```python
classifier = pipeline("zero-shot-classification")

text = "This is a tutorial about machine learning and NLP."
candidate_labels = ["education", "politics", "sports", "technology"]

result = classifier(text, candidate_labels)
print(result)
```

### Available Pipelines

```python
from transformers import pipelines

# List all available pipelines
print(pipelines.SUPPORTED_TASKS.keys())
```

Common pipelines:
- `sentiment-analysis`
- `text-generation`
- `ner` (Named Entity Recognition)
- `question-answering`
- `translation`
- `summarization`
- `fill-mask`
- `feature-extraction`
- `text-classification`
- `token-classification`
- `zero-shot-classification`
- `conversational`
- `image-classification`
- `object-detection`
- `automatic-speech-recognition`

---

## Tokenizers

### Basic Tokenization

```python
from transformers import AutoTokenizer

# Load tokenizer
tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")

# Tokenize
text = "Hello, how are you?"
tokens = tokenizer.tokenize(text)
print(tokens)  # ['hello', ',', 'how', 'are', 'you', '?']

# Convert to IDs
token_ids = tokenizer.convert_tokens_to_ids(tokens)
print(token_ids)

# All-in-one
encoded = tokenizer(text)
print(encoded)  # {'input_ids': [...], 'attention_mask': [...]}
```

### Encoding Options

```python
# Return tensors
encoded = tokenizer(text, return_tensors="pt")  # PyTorch tensors
encoded = tokenizer(text, return_tensors="tf")  # TensorFlow tensors
encoded = tokenizer(text, return_tensors="np")  # NumPy arrays

# Padding
encoded = tokenizer(text, padding=True)  # Pad to longest in batch
encoded = tokenizer(text, padding="max_length", max_length=512)

# Truncation
encoded = tokenizer(text, truncation=True, max_length=512)

# Return special tokens
encoded = tokenizer(
    text,
    add_special_tokens=True,  # [CLS], [SEP], etc.
    return_attention_mask=True,
    return_token_type_ids=True
)
```

### Batch Encoding

```python
texts = [
    "First sentence.",
    "Second sentence is longer.",
    "Third."
]

# Batch encode
encoded = tokenizer(
    texts,
    padding=True,
    truncation=True,
    max_length=128,
    return_tensors="pt"
)

print(encoded['input_ids'].shape)  # (3, max_length_in_batch)
```

### Decoding

```python
# Decode token IDs back to text
token_ids = [101, 7592, 102]  # [CLS] hello [SEP]
text = tokenizer.decode(token_ids)
print(text)

# Skip special tokens
text = tokenizer.decode(token_ids, skip_special_tokens=True)
print(text)  # hello

# Batch decode
batch_ids = [[101, 7592, 102], [101, 2088, 102]]
texts = tokenizer.batch_decode(batch_ids, skip_special_tokens=True)
print(texts)
```

### Fast Tokenizers

```python
from transformers import AutoTokenizer

# Load fast tokenizer (Rust-based)
tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased", use_fast=True)

# Check if fast
print(tokenizer.is_fast)  # True

# Fast tokenizers support offset mapping
encoded = tokenizer("Hello world", return_offsets_mapping=True)
print(encoded['offset_mapping'])
# [(0, 0), (0, 5), (6, 11), (0, 0)]  # [CLS], Hello, world, [SEP]
```

### Special Tokens

```python
# View special tokens
print(tokenizer.special_tokens_map)

# Common special tokens
print(f"CLS token: {tokenizer.cls_token}")
print(f"SEP token: {tokenizer.sep_token}")
print(f"PAD token: {tokenizer.pad_token}")
print(f"MASK token: {tokenizer.mask_token}")

# Add custom tokens
tokenizer.add_tokens(["<custom_token>"])
tokenizer.add_special_tokens({'additional_special_tokens': ['<special>']})
```

---

## Pre-trained Models

### Loading Models

```python
from transformers import AutoModel, AutoModelForSequenceClassification

# General model (encoder)
model = AutoModel.from_pretrained("bert-base-uncased")

# Task-specific model
model = AutoModelForSequenceClassification.from_pretrained(
    "bert-base-uncased",
    num_labels=2
)

# Specify device
model = AutoModel.from_pretrained("bert-base-uncased").to("cuda")

# Load specific revision
model = AutoModel.from_pretrained(
    "bert-base-uncased",
    revision="main"  # or specific commit hash
)
```

### Model Classes

```python
# Sequence classification
from transformers import AutoModelForSequenceClassification
model = AutoModelForSequenceClassification.from_pretrained("bert-base-uncased")

# Token classification (NER)
from transformers import AutoModelForTokenClassification
model = AutoModelForTokenClassification.from_pretrained("bert-base-uncased")

# Question answering
from transformers import AutoModelForQuestionAnswering
model = AutoModelForQuestionAnswering.from_pretrained("bert-base-uncased")

# Causal language modeling (GPT-like)
from transformers import AutoModelForCausalLM
model = AutoModelForCausalLM.from_pretrained("gpt2")

# Masked language modeling (BERT-like)
from transformers import AutoModelForMaskedLM
model = AutoModelForMaskedLM.from_pretrained("bert-base-uncased")

# Sequence-to-sequence (T5-like)
from transformers import AutoModelForSeq2SeqLM
model = AutoModelForSeq2SeqLM.from_pretrained("t5-small")
```

### Popular Models

```python
# BERT (Encoder)
from transformers import BertModel, BertTokenizer
tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")
model = BertModel.from_pretrained("bert-base-uncased")

# GPT-2 (Decoder)
from transformers import GPT2Tokenizer, GPT2LMHeadModel
tokenizer = GPT2Tokenizer.from_pretrained("gpt2")
model = GPT2LMHeadModel.from_pretrained("gpt2")

# T5 (Encoder-Decoder)
from transformers import T5Tokenizer, T5ForConditionalGeneration
tokenizer = T5Tokenizer.from_pretrained("t5-small")
model = T5ForConditionalGeneration.from_pretrained("t5-small")

# RoBERTa
from transformers import RobertaTokenizer, RobertaModel
tokenizer = RobertaTokenizer.from_pretrained("roberta-base")
model = RobertaModel.from_pretrained("roberta-base")

# DistilBERT (smaller, faster)
from transformers import DistilBertTokenizer, DistilBertModel
tokenizer = DistilBertTokenizer.from_pretrained("distilbert-base-uncased")
model = DistilBertModel.from_pretrained("distilbert-base-uncased")
```

### Inference

```python
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification

# Load model and tokenizer
tokenizer = AutoTokenizer.from_pretrained("distilbert-base-uncased-finetuned-sst-2-english")
model = AutoModelForSequenceClassification.from_pretrained("distilbert-base-uncased-finetuned-sst-2-english")

# Prepare input
text = "I love this movie!"
inputs = tokenizer(text, return_tensors="pt")

# Inference
with torch.no_grad():
    outputs = model(**inputs)

# Get predictions
logits = outputs.logits
predictions = torch.softmax(logits, dim=-1)
predicted_class = torch.argmax(predictions, dim=-1).item()

print(f"Predicted class: {predicted_class}")
print(f"Probabilities: {predictions}")
```

---

## Fine-tuning Models

### Basic Fine-tuning

```python
from transformers import (
    AutoTokenizer,
    AutoModelForSequenceClassification,
    Trainer,
    TrainingArguments
)
from datasets import load_dataset

# Load dataset
dataset = load_dataset("imdb")

# Load tokenizer
tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")

# Tokenize dataset
def tokenize_function(examples):
    return tokenizer(examples["text"], padding="max_length", truncation=True)

tokenized_datasets = dataset.map(tokenize_function, batched=True)

# Load model
model = AutoModelForSequenceClassification.from_pretrained("bert-base-uncased", num_labels=2)

# Define training arguments
training_args = TrainingArguments(
    output_dir="./results",
    num_train_epochs=3,
    per_device_train_batch_size=16,
    per_device_eval_batch_size=64,
    warmup_steps=500,
    weight_decay=0.01,
    logging_dir="./logs",
    logging_steps=10,
    evaluation_strategy="epoch",
    save_strategy="epoch",
    load_best_model_at_end=True,
)

# Create Trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_datasets["train"].select(range(1000)),  # Subset for demo
    eval_dataset=tokenized_datasets["test"].select(range(100)),
)

# Train
trainer.train()

# Evaluate
trainer.evaluate()

# Save model
trainer.save_model("./my_model")
```

### Custom Training Loop

```python
import torch
from torch.utils.data import DataLoader
from transformers import AdamW, get_scheduler

# Prepare dataloader
train_dataloader = DataLoader(tokenized_datasets["train"], shuffle=True, batch_size=8)

# Optimizer
optimizer = AdamW(model.parameters(), lr=5e-5)

# Learning rate scheduler
num_epochs = 3
num_training_steps = num_epochs * len(train_dataloader)
lr_scheduler = get_scheduler(
    "linear",
    optimizer=optimizer,
    num_warmup_steps=0,
    num_training_steps=num_training_steps
)

# Training loop
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

model.train()
for epoch in range(num_epochs):
    for batch in train_dataloader:
        batch = {k: v.to(device) for k, v in batch.items()}
        
        outputs = model(**batch)
        loss = outputs.loss
        loss.backward()
        
        optimizer.step()
        lr_scheduler.step()
        optimizer.zero_grad()
    
    print(f"Epoch {epoch+1}/{num_epochs} completed")
```

### Metrics

```python
import evaluate
from transformers import Trainer, TrainingArguments

# Load metric
accuracy_metric = evaluate.load("accuracy")

def compute_metrics(eval_pred):
    logits, labels = eval_pred
    predictions = logits.argmax(axis=-1)
    return accuracy_metric.compute(predictions=predictions, references=labels)

# Use in Trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=eval_dataset,
    compute_metrics=compute_metrics,
)

trainer.train()
```

---

## Text Generation

### Basic Generation

```python
from transformers import AutoTokenizer, AutoModelForCausalLM

tokenizer = AutoTokenizer.from_pretrained("gpt2")
model = AutoModelForCausalLM.from_pretrained("gpt2")

# Generate text
prompt = "Once upon a time"
inputs = tokenizer(prompt, return_tensors="pt")

outputs = model.generate(
    inputs["input_ids"],
    max_length=100,
    num_return_sequences=1,
    temperature=0.7,
    top_p=0.9,
    do_sample=True
)

generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
print(generated_text)
```

### Generation Strategies

```python
# Greedy decoding (deterministic)
outputs = model.generate(inputs["input_ids"], max_length=50)

# Beam search
outputs = model.generate(
    inputs["input_ids"],
    max_length=50,
    num_beams=5,
    early_stopping=True
)

# Sampling with temperature
outputs = model.generate(
    inputs["input_ids"],
    max_length=50,
    do_sample=True,
    temperature=0.7,  # Lower = more conservative
    top_k=50,
    top_p=0.95
)

# Nucleus (top-p) sampling
outputs = model.generate(
    inputs["input_ids"],
    max_length=50,
    do_sample=True,
    top_p=0.92,
    temperature=0.8
)

# Repetition penalty
outputs = model.generate(
    inputs["input_ids"],
    max_length=50,
    repetition_penalty=1.2,
    no_repeat_ngram_size=3
)
```

### Streaming Generation

```python
from transformers import TextIteratorStreamer
from threading import Thread

streamer = TextIteratorStreamer(tokenizer, skip_special_tokens=True)

# Generate in separate thread
generation_kwargs = dict(
    inputs=inputs["input_ids"],
    max_length=100,
    streamer=streamer,
)

thread = Thread(target=model.generate, kwargs=generation_kwargs)
thread.start()

# Stream output
for new_text in streamer:
    print(new_text, end="", flush=True)

thread.join()
```

### Chat Models

```python
from transformers import AutoTokenizer, AutoModelForCausalLM

# Load chat model (e.g., Mistral, Llama)
tokenizer = AutoTokenizer.from_pretrained("mistralai/Mistral-7B-Instruct-v0.1")
model = AutoModelForCausalLM.from_pretrained("mistralai/Mistral-7B-Instruct-v0.1")

# Format conversation
messages = [
    {"role": "user", "content": "What is the capital of France?"},
]

# Apply chat template
formatted_prompt = tokenizer.apply_chat_template(messages, tokenize=False)

# Generate response
inputs = tokenizer(formatted_prompt, return_tensors="pt")
outputs = model.generate(**inputs, max_length=200)
response = tokenizer.decode(outputs[0], skip_special_tokens=True)

print(response)
```

---

## Common NLP Tasks

### Text Classification

```python
from transformers import pipeline

# Sentiment analysis
classifier = pipeline("sentiment-analysis")
result = classifier("I love this product!")

# Multi-class classification
classifier = pipeline("text-classification", model="facebook/bart-large-mnli")
result = classifier("This is a great movie!", candidate_labels=["positive", "negative", "neutral"])
```

### Named Entity Recognition

```python
ner = pipeline("ner", aggregation_strategy="simple")

text = "Apple Inc. was founded by Steve Jobs in Cupertino."
entities = ner(text)

for entity in entities:
    print(f"{entity['word']}: {entity['entity_group']}")
```

### Summarization

```python
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

article = """Your long article here..."""

summary = summarizer(
    article,
    max_length=130,
    min_length=30,
    do_sample=False
)

print(summary[0]['summary_text'])
```

### Translation

```python
# English to French
translator = pipeline("translation_en_to_fr")
translation = translator("Hello, how are you?")

# Multilingual translation (mBART, M2M100)
from transformers import M2M100ForConditionalGeneration, M2M100Tokenizer

tokenizer = M2M100Tokenizer.from_pretrained("facebook/m2m100_418M")
model = M2M100ForConditionalGeneration.from_pretrained("facebook/m2m100_418M")

# Set source and target languages
tokenizer.src_lang = "en"
text = "Life is like a box of chocolates."
encoded = tokenizer(text, return_tensors="pt")

generated_tokens = model.generate(**encoded, forced_bos_token_id=tokenizer.get_lang_id("fr"))
translation = tokenizer.batch_decode(generated_tokens, skip_special_tokens=True)[0]
print(translation)
```

### Question Answering

```python
qa = pipeline("question-answering")

context = "Paris is the capital of France. It is known for the Eiffel Tower."
question = "What is Paris known for?"

answer = qa(question=question, context=context)
print(f"Answer: {answer['answer']}")
print(f"Score: {answer['score']:.4f}")
```

### Fill-Mask

```python
unmasker = pipeline("fill-mask", model="bert-base-uncased")

text = "The capital of France is [MASK]."
results = unmasker(text)

for result in results:
    print(f"{result['token_str']}: {result['score']:.4f}")
```

---

## Model Hub

### Searching Models

```python
from huggingface_hub import HfApi

api = HfApi()

# Search models
models = api.list_models(
    filter="text-classification",
    sort="downloads",
    direction=-1,
    limit=10
)

for model in models:
    print(f"{model.modelId}: {model.downloads} downloads")

# Filter by task
models = api.list_models(task="summarization")

# Filter by library
models = api.list_models(library="transformers")
```

### Uploading Models

```python
from huggingface_hub import HfApi, create_repo

# Login
from huggingface_hub import login
login(token="your_token_here")

# Create repository
repo_name = "my-awesome-model"
create_repo(repo_name, private=False)

# Push model
model.push_to_hub(repo_name)
tokenizer.push_to_hub(repo_name)

# Or use Trainer
trainer.push_to_hub(repo_name)
```

### Model Cards

Create `README.md` with model information:

```markdown
---
language: en
license: apache-2.0
tags:
- text-classification
- sentiment-analysis
datasets:
- imdb
metrics:
- accuracy
---

# My Awesome Model

## Model Description
This model was fine-tuned on the IMDB dataset for sentiment analysis.

## Intended Uses
Classify movie reviews as positive or negative.

## Training Data
IMDB movie reviews dataset (25,000 reviews)

## Training Procedure
- Base model: bert-base-uncased
- Epochs: 3
- Batch size: 16
- Learning rate: 5e-5

## Evaluation Results
- Accuracy: 92.5%
```

---

## Datasets Library

### Loading Datasets

```python
from datasets import load_dataset

# Load from Hub
dataset = load_dataset("imdb")
print(dataset)

# Load specific split
train_data = load_dataset("imdb", split="train")

# Load from local files
dataset = load_dataset("csv", data_files="my_data.csv")
dataset = load_dataset("json", data_files="my_data.json")

# Stream large datasets
dataset = load_dataset("oscar", "unshuffled_deduplicated_en", streaming=True)
```

### Dataset Operations

```python
from datasets import load_dataset

dataset = load_dataset("imdb")

# View sample
print(dataset["train"][0])

# Map function (tokenization)
def tokenize_function(examples):
    return tokenizer(examples["text"], padding="max_length", truncation=True)

tokenized_dataset = dataset.map(tokenize_function, batched=True)

# Filter
def filter_long_texts(example):
    return len(example["text"]) < 1000

filtered_dataset = dataset.filter(filter_long_texts)

# Select subset
subset = dataset["train"].select(range(1000))

# Shuffle
shuffled = dataset["train"].shuffle(seed=42)

# Train-test split
dataset = dataset["train"].train_test_split(test_size=0.2)
```

### Custom Datasets

```python
from datasets import Dataset
import pandas as pd

# From pandas DataFrame
df = pd.DataFrame({
    "text": ["Hello", "World"],
    "label": [0, 1]
})
dataset = Dataset.from_pandas(df)

# From dictionary
data = {
    "text": ["Hello", "World"],
    "label": [0, 1]
}
dataset = Dataset.from_dict(data)

# From generator
def gen():
    for i in range(100):
        yield {"text": f"Sample {i}", "label": i % 2}

dataset = Dataset.from_generator(gen)
```

---

## Training APIs

### Trainer API

```python
from transformers import Trainer, TrainingArguments

training_args = TrainingArguments(
    output_dir="./results",
    evaluation_strategy="epoch",
    save_strategy="epoch",
    learning_rate=2e-5,
    per_device_train_batch_size=16,
    per_device_eval_batch_size=16,
    num_train_epochs=3,
    weight_decay=0.01,
    load_best_model_at_end=True,
    metric_for_best_model="accuracy",
    push_to_hub=False,
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=eval_dataset,
    compute_metrics=compute_metrics,
)

trainer.train()
```

### Seq2SeqTrainer (for T5, BART, etc.)

```python
from transformers import Seq2SeqTrainer, Seq2SeqTrainingArguments

training_args = Seq2SeqTrainingArguments(
    output_dir="./results",
    evaluation_strategy="epoch",
    learning_rate=2e-5,
    per_device_train_batch_size=4,
    per_device_eval_batch_size=4,
    num_train_epochs=3,
    predict_with_generate=True,
    fp16=True,  # Mixed precision
)

trainer = Seq2SeqTrainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=eval_dataset,
    tokenizer=tokenizer,
)

trainer.train()
```

### Accelerate (Distributed Training)

```python
from accelerate import Accelerator

accelerator = Accelerator()

# Prepare model, optimizer, dataloader
model, optimizer, train_dataloader = accelerator.prepare(
    model, optimizer, train_dataloader
)

# Training loop
for batch in train_dataloader:
    outputs = model(**batch)
    loss = outputs.loss
    accelerator.backward(loss)
    optimizer.step()
    optimizer.zero_grad()

# Run with: accelerate launch script.py
```

---

## Model Deployment

### Optimum (ONNX Export)

```python
from optimum.onnxruntime import ORTModelForSequenceClassification
from transformers import AutoTokenizer

# Export to ONNX
model = ORTModelForSequenceClassification.from_pretrained(
    "distilbert-base-uncased-finetuned-sst-2-english",
    export=True
)

tokenizer = AutoTokenizer.from_pretrained("distilbert-base-uncased-finetuned-sst-2-english")

# Inference (much faster!)
inputs = tokenizer("I love this!", return_tensors="pt")
outputs = model(**inputs)
```

### Quantization

```python
# 8-bit quantization with bitsandbytes
from transformers import AutoModelForCausalLM

model = AutoModelForCausalLM.from_pretrained(
    "facebook/opt-1.3b",
    load_in_8bit=True,
    device_map="auto"
)

# 4-bit quantization
model = AutoModelForCausalLM.from_pretrained(
    "facebook/opt-1.3b",
    load_in_4bit=True,
    device_map="auto"
)
```

### TensorRT Optimization

```python
from optimum.nvidia import TensorRTForCausalLM

model = TensorRTForCausalLM.from_pretrained(
    "gpt2",
    export=True,
    use_fp16=True
)
```

### Inference Endpoints

```python
from huggingface_hub import InferenceClient

client = InferenceClient()

# Text generation
response = client.text_generation(
    "Once upon a time",
    model="gpt2"
)

# Classification
response = client.text_classification(
    "I love this!",
    model="distilbert-base-uncased-finetuned-sst-2-english"
)
```

---

## Advanced Features

### PEFT (Parameter-Efficient Fine-Tuning)

```python
from peft import LoraConfig, get_peft_model
from transformers import AutoModelForCausalLM

# Load base model
model = AutoModelForCausalLM.from_pretrained("facebook/opt-1.3b")

# Configure LoRA
lora_config = LoraConfig(
    r=16,
    lora_alpha=32,
    lora_dropout=0.05,
    bias="none",
    task_type="CAUSAL_LM"
)

# Apply LoRA
model = get_peft_model(model, lora_config)

# Train only LoRA parameters (1-10% of full model)
model.print_trainable_parameters()
```

### Gradient Checkpointing

```python
# Reduce memory usage during training
model.gradient_checkpointing_enable()

# Train as normal
trainer.train()
```

### Mixed Precision Training

```python
training_args = TrainingArguments(
    output_dir="./results",
    fp16=True,  # Enable mixed precision
    # or bf16=True for bfloat16 on supported hardware
)
```

### Model Parallelism

```python
# Automatic device mapping for large models
from transformers import AutoModelForCausalLM

model = AutoModelForCausalLM.from_pretrained(
    "facebook/opt-13b",
    device_map="auto",
    torch_dtype=torch.float16
)
```

---

## Best Practices

### 1. Choose the Right Model

```python
# For speed: DistilBERT, ALBERT, TinyBERT
model = AutoModel.from_pretrained("distilbert-base-uncased")

# For accuracy: RoBERTa, ELECTRA, DeBERTa
model = AutoModel.from_pretrained("roberta-large")

# For generation: GPT-2, GPT-Neo, Llama, Mistral
model = AutoModelForCausalLM.from_pretrained("gpt2")

# For seq2seq: T5, BART, PEGASUS
model = AutoModelForSeq2SeqLM.from_pretrained("t5-base")
```

### 2. Optimize Batch Size

```python
# Find optimal batch size
from accelerate import find_executable_batch_size

@find_executable_batch_size(starting_batch_size=128)
def training_function(batch_size):
    training_args = TrainingArguments(
        per_device_train_batch_size=batch_size,
        # ...other args
    )
    # Train
```

### 3. Use Fast Tokenizers

```python
# Always use fast tokenizers when available
tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased", use_fast=True)
```

### 4. Enable Caching

```python
# Cache datasets
dataset = load_dataset("imdb", cache_dir="./cache")

# Cache models
model = AutoModel.from_pretrained("bert-base-uncased", cache_dir="./models")
```

### 5. Monitor Training

```python
# Use TensorBoard
training_args = TrainingArguments(
    logging_dir="./logs",
    logging_steps=100,
    logging_strategy="steps",
)

# Or Weights & Biases
training_args = TrainingArguments(
    report_to="wandb",
    run_name="my-experiment",
)
```

---

## Real-World Examples

### Sentiment Analysis Pipeline

```python
from transformers import pipeline, AutoModelForSequenceClassification, AutoTokenizer
import torch

# Load model
model_name = "distilbert-base-uncased-finetuned-sst-2-english"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)

# Create custom pipeline
def analyze_sentiment(texts, batch_size=32):
    results = []
    
    for i in range(0, len(texts), batch_size):
        batch = texts[i:i+batch_size]
        inputs = tokenizer(batch, padding=True, truncation=True, return_tensors="pt")
        
        with torch.no_grad():
            outputs = model(**inputs)
        
        predictions = torch.softmax(outputs.logits, dim=-1)
        
        for j, pred in enumerate(predictions):
            label = "POSITIVE" if pred[1] > pred[0] else "NEGATIVE"
            score = pred[1].item() if label == "POSITIVE" else pred[0].item()
            results.append({
                "text": batch[j],
                "label": label,
                "score": score
            })
    
    return results

# Usage
reviews = [
    "This movie was amazing!",
    "Worst experience ever.",
    "It was okay, nothing special."
]

results = analyze_sentiment(reviews)
for result in results:
    print(f"{result['text']}: {result['label']} ({result['score']:.4f})")
```

### Document Summarization

```python
from transformers import pipeline

summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

def summarize_document(text, max_length=150, min_length=50):
    # Split long documents into chunks
    max_chunk_length = 1024
    chunks = [text[i:i+max_chunk_length] for i in range(0, len(text), max_chunk_length)]
    
    summaries = []
    for chunk in chunks:
        summary = summarizer(
            chunk,
            max_length=max_length,
            min_length=min_length,
            do_sample=False
        )
        summaries.append(summary[0]['summary_text'])
    
    # Combine chunk summaries
    final_text = " ".join(summaries)
    
    # Final summarization if needed
    if len(final_text) > max_chunk_length:
        final_summary = summarizer(
            final_text,
            max_length=max_length,
            min_length=min_length,
            do_sample=False
        )
        return final_summary[0]['summary_text']
    
    return final_text

# Usage
article = """Long article text here..."""
summary = summarize_document(article)
print(summary)
```

### Named Entity Recognition with Custom Labels

```python
from transformers import AutoTokenizer, AutoModelForTokenClassification
import torch

# Load model
tokenizer = AutoTokenizer.from_pretrained("dslim/bert-base-NER")
model = AutoModelForTokenClassification.from_pretrained("dslim/bert-base-NER")

def extract_entities(text):
    # Tokenize
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True)
    
    # Get predictions
    with torch.no_grad():
        outputs = model(**inputs)
    
    # Decode predictions
    predictions = torch.argmax(outputs.logits, dim=-1)[0]
    tokens = tokenizer.convert_ids_to_tokens(inputs["input_ids"][0])
    
    # Group entities
    entities = []
    current_entity = []
    current_label = None
    
    for token, pred in zip(tokens, predictions):
        label = model.config.id2label[pred.item()]
        
        if label.startswith("B-"):
            if current_entity:
                entities.append({
                    "text": tokenizer.convert_tokens_to_string(current_entity),
                    "label": current_label
                })
            current_entity = [token]
            current_label = label[2:]
        elif label.startswith("I-") and current_label == label[2:]:
            current_entity.append(token)
        else:
            if current_entity:
                entities.append({
                    "text": tokenizer.convert_tokens_to_string(current_entity),
                    "label": current_label
                })
            current_entity = []
            current_label = None
    
    if current_entity:
        entities.append({
            "text": tokenizer.convert_tokens_to_string(current_entity),
            "label": current_label
        })
    
    return entities

# Usage
text = "Apple Inc. was founded by Steve Jobs in Cupertino, California."
entities = extract_entities(text)

for entity in entities:
    print(f"{entity['text']}: {entity['label']}")
```

---

## Resources

### Official Documentation
- [Transformers Documentation](https://huggingface.co/docs/transformers/)
- [Model Hub](https://huggingface.co/models)
- [Datasets Library](https://huggingface.co/docs/datasets/)
- [Tokenizers](https://huggingface.co/docs/tokenizers/)

### Tutorials & Courses
- [Hugging Face Course](https://huggingface.co/course)
- [NLP Course](https://huggingface.co/learn/nlp-course)
- [Fine-tuning Tutorial](https://huggingface.co/docs/transformers/training)
- [Examples Repository](https://github.com/huggingface/transformers/tree/main/examples)

### Community
- [Hugging Face Forums](https://discuss.huggingface.co/)
- [Discord Community](https://discord.com/invite/JfAtkvEtRb)
- [GitHub](https://github.com/huggingface/transformers)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/huggingface-transformers)

### Tools & Extensions
- [Optimum](https://huggingface.co/docs/optimum/) - Hardware optimization
- [PEFT](https://huggingface.co/docs/peft/) - Parameter-efficient fine-tuning
- [Accelerate](https://huggingface.co/docs/accelerate/) - Distributed training
- [Evaluate](https://huggingface.co/docs/evaluate/) - Model evaluation

### Papers
- [Attention Is All You Need](https://arxiv.org/abs/1706.03762) - Original Transformer
- [BERT](https://arxiv.org/abs/1810.04805)
- [GPT-2](https://openai.com/research/better-language-models)
- [T5](https://arxiv.org/abs/1910.10683)

### Blogs
- [Hugging Face Blog](https://huggingface.co/blog)
- [Papers Explained](https://huggingface.co/papers)
- [Model Cards](https://huggingface.co/docs/hub/model-cards)

---

**Last Updated**: January 2026  
**Transformers Version**: 4.37+
