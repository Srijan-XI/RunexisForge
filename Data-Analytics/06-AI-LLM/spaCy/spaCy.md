# spaCy

## Introduction

spaCy is an industrial-strength natural language processing library designed for production use. It's fast, efficient, and provides state-of-the-art accuracy for NLP tasks. Unlike NLTK which is primarily educational, spaCy is built for real-world applications and large-scale processing.

### What is spaCy?

spaCy is a free, open-source library for advanced Natural Language Processing in Python. Written in Cython for maximum performance, it's designed specifically for production use and can process text at scale with minimal memory footprint and excellent speed.

### Key Features

- **Industrial Strength**: Built for production, not just research
- **Blazing Fast**: 10-100x faster than other Python NLP libraries
- **State-of-the-Art**: Pre-trained models with high accuracy
- **Deep Learning**: Built-in support for transformers (BERT, GPT, etc.)
- **Multi-Language**: 70+ languages supported
- **Named Entity Recognition**: Advanced NER with custom entity types
- **Dependency Parsing**: Accurate syntactic parsing
- **Word Vectors**: Pre-trained word embeddings
- **Text Classification**: Built-in text categorization
- **Rule-Based Matching**: Powerful pattern matching engine
- **Production Ready**: Easy deployment and scaling

### Use Cases

- **Information Extraction**: Extract structured data from text
- **Named Entity Recognition**: Identify people, organizations, locations
- **Text Classification**: Categorize documents and messages
- **Similarity Matching**: Find similar documents
- **Knowledge Graphs**: Build knowledge bases from text
- **Chatbots**: Power conversational AI
- **Search Engines**: Improve search relevance
- **Content Recommendation**: Semantic content matching
- **Document Analysis**: Analyze legal, medical documents
- **Social Media Analysis**: Process tweets, posts at scale

### spaCy vs NLTK

| Feature | spaCy | NLTK |
|---------|-------|------|
| **Speed** | Very Fast (C/Cython) | Slower (Pure Python) |
| **Focus** | Production | Education/Research |
| **Models** | Pre-trained, production-ready | Basic, educational |
| **Memory** | Efficient | Higher usage |
| **API** | Object-oriented, modern | Functional, traditional |
| **Deep Learning** | Built-in | Minimal |
| **Languages** | 70+ | Limited |
| **Industry Use** | Extensive | Limited |

---

## Installation & Setup

### Basic Installation

```bash
# Install spaCy
pip install spacy

# Install with specific extras
pip install spacy[transformers,lookups]

# Verify installation
python -c "import spacy; print(spacy.__version__)"
```

### Download Models

```bash
# English models
python -m spacy download en_core_web_sm    # Small (12MB)
python -m spacy download en_core_web_md    # Medium (40MB) with word vectors
python -m spacy download en_core_web_lg    # Large (560MB) with word vectors
python -m spacy download en_core_web_trf   # Transformer (440MB) best accuracy

# Other languages
python -m spacy download de_core_news_sm   # German
python -m spacy download fr_core_news_sm   # French
python -m spacy download es_core_news_sm   # Spanish
python -m spacy download zh_core_web_sm    # Chinese
python -m spacy download ja_core_news_sm   # Japanese

# List installed models
python -m spacy info

# Model info
python -m spacy info en_core_web_sm
```

### Quick Start

```python
import spacy

# Load model
nlp = spacy.load("en_core_web_sm")

# Process text
doc = nlp("Apple is looking at buying U.K. startup for $1 billion")

# Tokens
for token in doc:
    print(token.text, token.pos_, token.dep_)

# Named entities
for ent in doc.ents:
    print(ent.text, ent.label_)
# Apple ORG
# U.K. GPE
# $1 billion MONEY
```

---

## Core Concepts

### Doc, Token, and Span

```python
import spacy

nlp = spacy.load("en_core_web_sm")
doc = nlp("SpaCy is amazing for NLP!")

# Doc: Processed document
print(f"Doc: {doc.text}")
print(f"Doc length: {len(doc)}")

# Token: Individual word/punctuation
for token in doc:
    print(f"Token: {token.text}, Index: {token.i}")

# Span: Slice of Doc
span = doc[0:2]  # "SpaCy is"
print(f"Span: {span.text}")

# Token attributes
token = doc[0]
print(f"Text: {token.text}")
print(f"Lemma: {token.lemma_}")
print(f"POS: {token.pos_}")
print(f"Tag: {token.tag_}")
print(f"Dependency: {token.dep_}")
print(f"Is alpha: {token.is_alpha}")
print(f"Is stop: {token.is_stop}")
```

---

## Linguistic Analysis

### Part-of-Speech Tagging

```python
import spacy

nlp = spacy.load("en_core_web_sm")
doc = nlp("The quick brown fox jumps over the lazy dog")

# POS tags
for token in doc:
    print(f"{token.text:12} {token.pos_:6} {token.tag_:6} {spacy.explain(token.tag_)}")

# Filter by POS
nouns = [token.text for token in doc if token.pos_ == "NOUN"]
verbs = [token.text for token in doc if token.pos_ == "VERB"]
adjectives = [token.text for token in doc if token.pos_ == "ADJ"]

print(f"Nouns: {nouns}")
print(f"Verbs: {verbs}")
print(f"Adjectives: {adjectives}")
```

### Dependency Parsing

```python
# Dependency parsing
doc = nlp("The cat sat on the mat")

for token in doc:
    print(f"{token.text:10} {token.dep_:10} {token.head.text:10} {token.head.pos_}")

# Visualize dependencies (requires displacy)
from spacy import displacy

displacy.serve(doc, style="dep")  # Opens in browser
# Or render to SVG
svg = displacy.render(doc, style="dep", jupyter=False)

# Navigate tree
root = [token for token in doc if token.head == token][0]
print(f"Root: {root.text}")

# Get children
for token in doc:
    if list(token.children):
        print(f"{token.text} -> {[child.text for child in token.children]}")
```

### Lemmatization

```python
doc = nlp("running runs ran runner")

for token in doc:
    print(f"{token.text:10} -> {token.lemma_}")
# running    -> run
# runs       -> run
# ran        -> run
# runner     -> runner

# Lemmatize sentence
text = "The dogs are running and jumping"
doc = nlp(text)
lemmatized = " ".join([token.lemma_ for token in doc])
print(lemmatized)
# the dog be run and jump
```

---

## Named Entity Recognition (NER)

### Basic NER

```python
import spacy

nlp = spacy.load("en_core_web_sm")
text = """
Apple Inc. is planning to open a new store in London next month.
Tim Cook will attend the launch event. The investment is $10 million.
"""

doc = nlp(text)

# Extract entities
for ent in doc.ents:
    print(f"{ent.text:20} {ent.label_:10} {spacy.explain(ent.label_)}")

# Entity types:
# PERSON: People
# ORG: Organizations
# GPE: Geopolitical entities (countries, cities)
# LOC: Locations
# DATE: Dates
# TIME: Times
# MONEY: Monetary values
# PERCENT: Percentages
# PRODUCT: Products
# EVENT: Events

# Visualize entities
from spacy import displacy

displacy.serve(doc, style="ent")  # Browser
# Or render
html = displacy.render(doc, style="ent", jupyter=False)
```

### Custom NER

```python
from spacy.training import Example
import random

# Create blank model
nlp = spacy.blank("en")

# Create NER component
ner = nlp.add_pipe("ner")

# Add labels
ner.add_label("TECH_PRODUCT")

# Training data
TRAIN_DATA = [
    ("iPhone is a smartphone", {"entities": [(0, 6, "TECH_PRODUCT")]}),
    ("MacBook is a laptop", {"entities": [(0, 7, "TECH_PRODUCT")]}),
    ("iPad is a tablet", {"entities": [(0, 4, "TECH_PRODUCT")]}),
]

# Train
optimizer = nlp.begin_training()

for epoch in range(20):
    random.shuffle(TRAIN_DATA)
    losses = {}
    
    for text, annotations in TRAIN_DATA:
        doc = nlp.make_doc(text)
        example = Example.from_dict(doc, annotations)
        nlp.update([example], losses=losses, drop=0.5)
    
    print(f"Epoch {epoch}, Losses: {losses}")

# Test
doc = nlp("I bought an iPhone and a MacBook")
for ent in doc.ents:
    print(ent.text, ent.label_)
```

### Entity Ruler (Pattern-Based NER)

```python
import spacy
from spacy.pipeline import EntityRuler

nlp = spacy.load("en_core_web_sm")

# Create entity ruler
ruler = nlp.add_pipe("entity_ruler", before="ner")

# Define patterns
patterns = [
    {"label": "CRYPTO", "pattern": "Bitcoin"},
    {"label": "CRYPTO", "pattern": "Ethereum"},
    {"label": "CRYPTO", "pattern": [{"LOWER": "btc"}]},
    {"label": "CRYPTO", "pattern": [{"LOWER": "eth"}]},
    {"label": "EMAIL", "pattern": [{"LIKE_EMAIL": True}]},
]

ruler.add_patterns(patterns)

# Test
doc = nlp("I bought Bitcoin and ETH. Contact me at user@example.com")
for ent in doc.ents:
    print(f"{ent.text:20} {ent.label_}")
```

---

## Text Classification

### Built-in Text Categorizer

```python
import spacy
from spacy.training import Example
import random

# Create blank model
nlp = spacy.blank("en")

# Add text classifier
textcat = nlp.add_pipe("textcat", last=True)

# Add labels
textcat.add_label("POSITIVE")
textcat.add_label("NEGATIVE")

# Training data
TRAIN_DATA = [
    ("This is amazing!", {"cats": {"POSITIVE": 1.0, "NEGATIVE": 0.0}}),
    ("I love this product", {"cats": {"POSITIVE": 1.0, "NEGATIVE": 0.0}}),
    ("Terrible experience", {"cats": {"POSITIVE": 0.0, "NEGATIVE": 1.0}}),
    ("Worst purchase ever", {"cats": {"POSITIVE": 0.0, "NEGATIVE": 1.0}}),
]

# Train
optimizer = nlp.begin_training()

for epoch in range(10):
    random.shuffle(TRAIN_DATA)
    losses = {}
    
    for text, annotations in TRAIN_DATA:
        doc = nlp.make_doc(text)
        example = Example.from_dict(doc, annotations)
        nlp.update([example], losses=losses, drop=0.5)
    
    print(f"Epoch {epoch}, Losses: {losses}")

# Predict
doc = nlp("This is fantastic!")
print(doc.cats)
# {'POSITIVE': 0.95, 'NEGATIVE': 0.05}
```

---

## Word Vectors & Similarity

### Using Pre-trained Vectors

```python
import spacy

# Load model with word vectors (medium or large)
nlp = spacy.load("en_core_web_md")

# Word similarity
tokens = nlp("dog cat apple car")

for token1 in tokens:
    for token2 in tokens:
        if token1 != token2:
            similarity = token1.similarity(token2)
            print(f"{token1.text} <-> {token2.text}: {similarity:.2f}")

# Document similarity
doc1 = nlp("I like cats")
doc2 = nlp("I love dogs")
doc3 = nlp("Python programming")

print(f"Doc1 <-> Doc2: {doc1.similarity(doc2):.2f}")
print(f"Doc1 <-> Doc3: {doc1.similarity(doc3):.2f}")

# Access vector
token = nlp("apple")[0]
print(f"Vector shape: {token.vector.shape}")
print(f"Vector norm: {token.vector_norm}")
```

### Finding Similar Words

```python
def find_similar_words(word, topn=10):
    """Find similar words using word vectors"""
    nlp = spacy.load("en_core_web_md")
    
    word_vec = nlp(word)[0].vector
    vocab = nlp.vocab
    
    # Calculate similarities
    similarities = []
    for lex in vocab:
        if lex.has_vector and lex.is_lower:
            similarity = nlp(word)[0].similarity(nlp(lex.text)[0])
            similarities.append((lex.text, similarity))
    
    # Sort and return top N
    similarities.sort(key=lambda x: x[1], reverse=True)
    return similarities[1:topn+1]  # Skip the word itself

# Example
similar = find_similar_words("python", topn=5)
print(similar)
```

---

## Pattern Matching

### Matcher

```python
from spacy.matcher import Matcher
import spacy

nlp = spacy.load("en_core_web_sm")
matcher = Matcher(nlp.vocab)

# Define patterns
pattern1 = [{"LOWER": "hello"}, {"IS_PUNCT": True}, {"LOWER": "world"}]
pattern2 = [{"LEMMA": "love"}, {"POS": "NOUN"}]
pattern3 = [{"POS": "ADJ", "OP": "+"}, {"POS": "NOUN"}]  # One or more adjectives + noun

matcher.add("GREETING", [pattern1])
matcher.add("LOVE", [pattern2])
matcher.add("ADJ_NOUN", [pattern3])

# Match
doc = nlp("Hello, world! I love Python. The quick brown fox")
matches = matcher(doc)

for match_id, start, end in matches:
    span = doc[start:end]
    print(f"Match: {span.text}, Pattern: {nlp.vocab.strings[match_id]}")
```

### PhraseMatcher

```python
from spacy.matcher import PhraseMatcher

nlp = spacy.load("en_core_web_sm")
matcher = PhraseMatcher(nlp.vocab)

# Define terms
terms = ["machine learning", "deep learning", "neural network", "artificial intelligence"]
patterns = [nlp.make_doc(term) for term in terms]

matcher.add("AI_TERMS", patterns)

# Match
doc = nlp("I study machine learning and neural networks at university")
matches = matcher(doc)

for match_id, start, end in matches:
    print(doc[start:end].text)
```

---

## Custom Pipeline Components

```python
from spacy.language import Language
import spacy

# Define custom component
@Language.component("custom_sentencizer")
def custom_sentencizer(doc):
    """Custom sentence boundary detection"""
    for token in doc[:-1]:
        if token.text == "." and token.nbor().is_title:
            token.is_sent_start = True
    return doc

# Create pipeline
nlp = spacy.load("en_core_web_sm")
nlp.add_pipe("custom_sentencizer", before="parser")

# View pipeline
print(nlp.pipe_names)

# Use
doc = nlp("Dr. Smith arrived. He was late. Mrs. Jones waited.")
for sent in doc.sents:
    print(sent.text)
```

---

## Efficient Processing

### Processing in Batches

```python
import spacy

nlp = spacy.load("en_core_web_sm")

# Large list of texts
texts = ["Text 1", "Text 2", "Text 3"] * 1000

# Process in batches (much faster)
docs = list(nlp.pipe(texts, batch_size=50))

print(f"Processed {len(docs)} documents")

# With context (for error handling)
for doc, context in nlp.pipe(texts, as_tuples=True):
    # Process doc
    pass
```

### Disable Pipeline Components

```python
# Disable components you don't need
with nlp.select_pipes(disable=["tagger", "parser"]):
    doc = nlp("Just need NER")  # Faster!

# Only enable specific components
with nlp.select_pipes(enable=["ner"]):
    doc = nlp("Quick NER only")
```

---

## Multi-Language Support

```python
# Load different language models
nlp_en = spacy.load("en_core_web_sm")
nlp_de = spacy.load("de_core_news_sm")
nlp_fr = spacy.load("fr_core_news_sm")
nlp_es = spacy.load("es_core_news_sm")

# Process multilingual text
texts = {
    "en": "Hello, world!",
    "de": "Guten Tag!",
    "fr": "Bonjour!",
    "es": "¡Hola, mundo!"
}

models = {"en": nlp_en, "de": nlp_de, "fr": nlp_fr, "es": nlp_es}

for lang, text in texts.items():
    doc = models[lang](text)
    print(f"{lang}: {doc.text}")
    for token in doc:
        print(f"  {token.text} - {token.pos_}")
```

---

## Production Deployment

### Save and Load Models

```python
# Save model
nlp.to_disk("/path/to/model")

# Load model
nlp = spacy.load("/path/to/model")

# Package as Python module
# python -m spacy package /path/to/model /output/path
```

### REST API with FastAPI

```python
from fastapi import FastAPI
from pydantic import BaseModel
import spacy

app = FastAPI()
nlp = spacy.load("en_core_web_sm")

class Text(BaseModel):
    text: str

@app.post("/ner")
async def extract_entities(data: Text):
    doc = nlp(data.text)
    entities = [{"text": ent.text, "label": ent.label_} for ent in doc.ents]
    return {"entities": entities}

@app.post("/tokenize")
async def tokenize(data: Text):
    doc = nlp(data.text)
    tokens = [{"text": token.text, "pos": token.pos_, "lemma": token.lemma_} 
              for token in doc]
    return {"tokens": tokens}

# Run with: uvicorn main:app --reload
```

---

## Resources

### Official Documentation
- [spaCy Website](https://spacy.io/)
- [spaCy Documentation](https://spacy.io/usage)
- [spaCy API Reference](https://spacy.io/api)

### Learning Resources
- [Advanced NLP with spaCy](https://course.spacy.io/)
- [spaCy Universe](https://spacy.io/universe) - Projects & plugins
- [spaCy 101](https://spacy.io/usage/spacy-101)

### Models & Extensions
- [Pre-trained Models](https://spacy.io/models)
- [spaCy Transformers](https://spacy.io/usage/transformers)
- [Prodigy](https://prodi.gy/) - Annotation tool

### Community
- [GitHub Repository](https://github.com/explosion/spaCy)
- [Discussion Forum](https://github.com/explosion/spaCy/discussions)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/spacy)

---

**Last Updated:** February 2026
