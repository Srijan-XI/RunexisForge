# NLTK (Natural Language Toolkit)

## Introduction

NLTK is a leading platform for building Python programs to work with human language data. It provides easy-to-use interfaces to over 50 corpora and lexical resources, along with a suite of text processing libraries for classification, tokenization, stemming, tagging, parsing, and semantic reasoning.

### What is NLTK?

The Natural Language Toolkit (NLTK) is a comprehensive library for natural language processing and computational linguistics. Created in 2001, it has become one of the most popular Python libraries for teaching and working with NLP, offering both practical tools and educational resources.

### Key Features

- **50+ Corpora & Lexicons**: Pre-loaded datasets for training and testing
- **Text Processing**: Tokenization, stemming, lemmatization
- **Classification**: Naive Bayes, Decision Tree, Maximum Entropy
- **Tagging**: POS tagging, NER (Named Entity Recognition)
- **Parsing**: Dependency parsing, constituency parsing
- **Semantic Analysis**: WordNet integration, sentiment analysis
- **Language Understanding**: Chunking, information extraction
- **Easy Learning**: Extensive documentation and NLTK book
- **Modular Design**: Pick and choose components
- **Active Community**: Large user base and contributors

### Use Cases

- **Text Classification**: Spam detection, sentiment analysis
- **Information Extraction**: Named entity recognition, relationship extraction
- **Machine Translation**: Language translation systems
- **Question Answering**: Building chatbots and QA systems
- **Text Summarization**: Automatic document summarization
- **Speech Recognition**: Text preprocessing for speech systems
- **Educational Tools**: Teaching NLP concepts
- **Research**: Academic NLP research projects
- **Content Analysis**: Social media analysis, news categorization
- **Language Detection**: Identifying text language

---

## Installation & Setup

### Basic Installation

```bash
# Install NLTK
pip install nltk

# Install with numpy (faster processing)
pip install nltk numpy

# Verify installation
python -c "import nltk; print(nltk.__version__)"
```

### Download NLTK Data

```python
import nltk

# Download all data (large ~3GB)
nltk.download('all')

# Download specific packages
nltk.download('punkt')        # Tokenizer
nltk.download('averaged_perceptron_tagger')  # POS tagger
nltk.download('maxent_ne_chunker')  # Named entity chunker
nltk.download('words')        # Word list
nltk.download('stopwords')    # Stop words
nltk.download('wordnet')      # WordNet lexical database
nltk.download('omw-1.4')      # Open Multilingual Wordnet
nltk.download('vader_lexicon')  # Sentiment analysis
nltk.download('brown')        # Brown corpus
nltk.download('reuters')      # Reuters corpus

# Download with GUI
nltk.download()

# Check downloaded data
print(nltk.data.path)
```

### Quick Start

```python
import nltk
from nltk.tokenize import word_tokenize

# Sample text
text = "NLTK is a leading platform for building Python programs to work with human language data."

# Tokenize
tokens = word_tokenize(text)
print(tokens)
# ['NLTK', 'is', 'a', 'leading', 'platform', ...]
```

---

## Text Preprocessing

### Tokenization

```python
from nltk.tokenize import word_tokenize, sent_tokenize, TweetTokenizer, RegexpTokenizer

text = "Hello! This is NLTK. It's amazing for NLP tasks."

# Word tokenization
words = word_tokenize(text)
print(words)
# ['Hello', '!', 'This', 'is', 'NLTK', '.', 'It', "'s", 'amazing', ...]

# Sentence tokenization
sentences = sent_tokenize(text)
print(sentences)
# ['Hello!', 'This is NLTK.', "It's amazing for NLP tasks."]

# Tweet tokenizer (preserves hashtags, mentions)
tweet_tokenizer = TweetTokenizer()
tweet = "Amazing #NLP tutorial by @NLTK! 😊"
tokens = tweet_tokenizer.tokenize(tweet)
print(tokens)
# ['Amazing', '#NLP', 'tutorial', 'by', '@NLTK', '!', '😊']

# Regular expression tokenizer
regex_tokenizer = RegexpTokenizer(r'\w+')
tokens = regex_tokenizer.tokenize(text)
print(tokens)
# ['Hello', 'This', 'is', 'NLTK', 'It', 's', 'amazing', 'for', 'NLP', 'tasks']
```

### Stemming

```python
from nltk.stem import PorterStemmer, LancasterStemmer, SnowballStemmer

words = ["running", "runs", "ran", "runner", "easily", "fairly"]

# Porter Stemmer (most common)
porter = PorterStemmer()
stems = [porter.stem(word) for word in words]
print(stems)
# ['run', 'run', 'ran', 'runner', 'easili', 'fairli']

# Lancaster Stemmer (more aggressive)
lancaster = LancasterStemmer()
stems = [lancaster.stem(word) for word in words]
print(stems)
# ['run', 'run', 'ran', 'run', 'easy', 'fair']

# Snowball Stemmer (supports multiple languages)
snowball = SnowballStemmer('english')
stems = [snowball.stem(word) for word in words]
print(stems)
# ['run', 'run', 'ran', 'runner', 'easili', 'fair']
```

### Lemmatization

```python
from nltk.stem import WordNetLemmatizer
from nltk.corpus import wordnet

lemmatizer = WordNetLemmatizer()

words = ["running", "runs", "ran", "better", "good"]

# Lemmatize (more accurate than stemming)
lemmas = [lemmatizer.lemmatize(word) for word in words]
print(lemmas)
# ['running', 'run', 'ran', 'better', 'good']

# Lemmatize with POS tag
lemmas = [lemmatizer.lemmatize(word, pos='v') for word in words]
print(lemmas)
# ['run', 'run', 'run', 'better', 'good']

# Lemmatize adjectives
adj_words = ["better", "worse", "running"]
lemmas = [lemmatizer.lemmatize(word, pos='a') for word in adj_words]
print(lemmas)
# ['good', 'bad', 'running']
```

### Stop Words Removal

```python
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

# Get English stop words
stop_words = set(stopwords.words('english'))
print(f"Total stop words: {len(stop_words)}")
print(list(stop_words)[:10])

# Remove stop words
text = "This is a sample sentence demonstrating stop word removal."
tokens = word_tokenize(text.lower())
filtered = [word for word in tokens if word not in stop_words]

print("Original:", tokens)
print("Filtered:", filtered)
# Filtered: ['sample', 'sentence', 'demonstrating', 'stop', 'word', 'removal', '.']

# Multiple languages
spanish_stops = stopwords.words('spanish')
french_stops = stopwords.words('french')
german_stops = stopwords.words('german')
```

### Text Normalization

```python
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

def normalize_text(text):
    """Complete text normalization pipeline"""
    # Lowercase
    text = text.lower()
    
    # Tokenize
    tokens = word_tokenize(text)
    
    # Remove punctuation and non-alphabetic
    tokens = [word for word in tokens if word.isalpha()]
    
    # Remove stop words
    stop_words = set(stopwords.words('english'))
    tokens = [word for word in tokens if word not in stop_words]
    
    # Lemmatize
    lemmatizer = WordNetLemmatizer()
    tokens = [lemmatizer.lemmatize(word) for word in tokens]
    
    return tokens

text = "The quick brown foxes are jumping over the lazy dogs!"
normalized = normalize_text(text)
print(normalized)
# ['quick', 'brown', 'fox', 'jumping', 'lazy', 'dog']
```

---

## Part-of-Speech (POS) Tagging

### Basic POS Tagging

```python
from nltk import pos_tag
from nltk.tokenize import word_tokenize

text = "NLTK is a leading platform for building Python programs."
tokens = word_tokenize(text)

# POS tagging
tagged = pos_tag(tokens)
print(tagged)
# [('NLTK', 'NNP'), ('is', 'VBZ'), ('a', 'DT'), ('leading', 'VBG'), ...]

# Common POS tags:
# NN - Noun, singular
# NNS - Noun, plural
# VB - Verb, base form
# VBZ - Verb, 3rd person singular present
# JJ - Adjective
# RB - Adverb
# DT - Determiner
```

### Extract Specific POS

```python
def extract_nouns(text):
    """Extract all nouns from text"""
    tokens = word_tokenize(text)
    tagged = pos_tag(tokens)
    nouns = [word for word, tag in tagged if tag.startswith('NN')]
    return nouns

def extract_verbs(text):
    """Extract all verbs from text"""
    tokens = word_tokenize(text)
    tagged = pos_tag(tokens)
    verbs = [word for word, tag in tagged if tag.startswith('VB')]
    return verbs

text = "The cat quickly jumped over the sleeping dog."
print("Nouns:", extract_nouns(text))
print("Verbs:", extract_verbs(text))
# Nouns: ['cat', 'dog']
# Verbs: ['jumped', 'sleeping']
```

---

## Named Entity Recognition (NER)

```python
from nltk import ne_chunk, pos_tag
from nltk.tokenize import word_tokenize
from nltk.tree import Tree

text = "Barack Obama was born in Hawaii. He was the president of the United States."

# Tokenize and POS tag
tokens = word_tokenize(text)
tagged = pos_tag(tokens)

# Named entity recognition
entities = ne_chunk(tagged)

# Extract named entities
def extract_entities(tree):
    """Extract named entities from tree"""
    entities = []
    for subtree in tree:
        if isinstance(subtree, Tree):
            entity_name = " ".join([word for word, tag in subtree.leaves()])
            entity_type = subtree.label()
            entities.append((entity_name, entity_type))
    return entities

named_entities = extract_entities(entities)
print(named_entities)
# [('Barack Obama', 'PERSON'), ('Hawaii', 'GPE'), ('United States', 'GPE')]

# Entity types:
# PERSON - People names
# ORGANIZATION - Companies, agencies
# GPE - Geopolitical entities (countries, cities)
# LOCATION - Non-GPE locations
# DATE - Dates
# TIME - Times
```

---

## Sentiment Analysis

### VADER Sentiment Analysis

```python
from nltk.sentiment.vader import SentimentIntensityAnalyzer

# Initialize VADER
sia = SentimentIntensityAnalyzer()

def analyze_sentiment(text):
    """Analyze sentiment using VADER"""
    scores = sia.polarity_scores(text)
    return scores

# Examples
texts = [
    "This product is amazing! I love it!",
    "This is the worst experience ever.",
    "The product is okay, nothing special.",
    "I absolutely hate this! 😠"
]

for text in texts:
    scores = analyze_sentiment(text)
    print(f"Text: {text}")
    print(f"Scores: {scores}")
    print(f"Sentiment: {'Positive' if scores['compound'] > 0.05 else 'Negative' if scores['compound'] < -0.05 else 'Neutral'}")
    print()

# Output scores:
# neg: negative score
# neu: neutral score
# pos: positive score
# compound: overall score (-1 to 1)
```

### Custom Sentiment Classifier

```python
from nltk.corpus import movie_reviews
from nltk.classify import NaiveBayesClassifier
from nltk.classify.util import accuracy
import random

# Load movie reviews
documents = [(list(movie_reviews.words(fileid)), category)
             for category in movie_reviews.categories()
             for fileid in movie_reviews.fileids(category)]

random.shuffle(documents)

# Feature extractor
def document_features(document):
    """Extract features from document"""
    document_words = set(document)
    features = {}
    for word in word_features:
        features[f'contains({word})'] = (word in document_words)
    return features

# Get most common words
all_words = nltk.FreqDist(w.lower() for w in movie_reviews.words())
word_features = list(all_words)[:2000]

# Create feature sets
featuresets = [(document_features(d), c) for (d, c) in documents]

# Split train/test
train_set = featuresets[:1500]
test_set = featuresets[1500:]

# Train classifier
classifier = NaiveBayesClassifier.train(train_set)

# Evaluate
print(f"Accuracy: {accuracy(classifier, test_set):.2%}")

# Show most informative features
classifier.show_most_informative_features(10)

# Classify new text
def classify_text(text):
    """Classify sentiment of new text"""
    tokens = word_tokenize(text.lower())
    features = document_features(tokens)
    return classifier.classify(features)

print(classify_text("This movie was excellent!"))
print(classify_text("Terrible movie, don't watch it."))
```

---

## Text Classification

### Spam Detection Example

```python
from nltk.classify import NaiveBayesClassifier
from nltk.tokenize import word_tokenize

# Training data
train_data = [
    ("Buy now! Limited offer!", "spam"),
    ("Meeting at 3pm tomorrow", "ham"),
    ("Get rich quick! Click here!", "spam"),
    ("See you later", "ham"),
    ("Free money! Act now!", "spam"),
    ("How are you doing?", "ham"),
]

def extract_features(text):
    """Extract features from text"""
    words = word_tokenize(text.lower())
    return {word: True for word in words}

# Create training set
training_set = [(extract_features(text), label) for text, label in train_data]

# Train classifier
classifier = NaiveBayesClassifier.train(training_set)

# Test
test_messages = [
    "Free discount! Buy now!",
    "Can we meet tomorrow?",
    "Win money online!",
]

for message in test_messages:
    features = extract_features(message)
    label = classifier.classify(features)
    prob = classifier.prob_classify(features)
    print(f"Message: {message}")
    print(f"Classification: {label}")
    print(f"Confidence: {prob.prob(label):.2%}\n")
```

---

## WordNet & Lexical Analysis

### Using WordNet

```python
from nltk.corpus import wordnet as wn

# Get synsets (synonym sets)
synsets = wn.synsets('good')
print(f"Number of synsets: {len(synsets)}")
print(synsets[:3])

# Get definition
print(wn.synset('good.a.01').definition())
# 'having desirable or positive qualities'

# Get examples
print(wn.synset('good.a.01').examples())

# Get synonyms
synonyms = []
for syn in wn.synsets('good'):
    for lemma in syn.lemmas():
        synonyms.append(lemma.name())
print(set(synonyms))

# Get antonyms
antonyms = []
for syn in wn.synsets('good'):
    for lemma in syn.lemmas():
        if lemma.antonyms():
            antonyms.append(lemma.antonyms()[0].name())
print(set(antonyms))
# {'bad', 'evil', 'ill'}
```

### Semantic Similarity

```python
from nltk.corpus import wordnet as wn

# Path similarity (0-1)
dog = wn.synset('dog.n.01')
cat = wn.synset('cat.n.01')
car = wn.synset('car.n.01')

print(f"Dog-Cat similarity: {dog.path_similarity(cat):.2f}")
print(f"Dog-Car similarity: {dog.path_similarity(car):.2f}")

# Wu-Palmer similarity
print(f"Dog-Cat WUP: {dog.wup_similarity(cat):.2f}")

# Leacock-Chodorow similarity
print(f"Dog-Cat LCH: {dog.lch_similarity(cat):.2f}")
```

---

## Frequency Analysis

```python
from nltk import FreqDist
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import matplotlib.pyplot as plt

text = """
Natural language processing is a subfield of linguistics, computer science,
and artificial intelligence concerned with the interactions between computers
and human language. NLP is used to apply machine learning algorithms to text
and speech.
"""

# Tokenize and clean
tokens = word_tokenize(text.lower())
tokens = [w for w in tokens if w.isalpha()]

# Remove stop words
stop_words = set(stopwords.words('english'))
tokens = [w for w in tokens if w not in stop_words]

# Frequency distribution
fdist = FreqDist(tokens)

# Most common words
print("Most common words:")
print(fdist.most_common(10))

# Plot frequency distribution
fdist.plot(20, title='Word Frequency Distribution')

# Hapaxes (words that appear only once)
print(f"\nHapaxes: {fdist.hapaxes()}")

# Word frequency
print(f"Frequency of 'language': {fdist['language']}")
```

---

## N-grams

```python
from nltk import ngrams, bigrams, trigrams
from nltk.tokenize import word_tokenize

text = "The quick brown fox jumps over the lazy dog"
tokens = word_tokenize(text.lower())

# Bigrams (2-grams)
bi = list(bigrams(tokens))
print("Bigrams:", bi[:5])
# [('the', 'quick'), ('quick', 'brown'), ('brown', 'fox'), ...]

# Trigrams (3-grams)
tri = list(trigrams(tokens))
print("Trigrams:", tri[:5])

# Custom n-grams
four_grams = list(ngrams(tokens, 4))
print("4-grams:", four_grams[:3])

# Frequency of n-grams
from nltk import FreqDist

bigram_freq = FreqDist(bigrams(tokens))
print("Most common bigrams:")
print(bigram_freq.most_common(5))
```

---

## Text Similarity

```python
from nltk import word_tokenize
from nltk.corpus import stopwords
from collections import Counter
import math

def cosine_similarity(text1, text2):
    """Calculate cosine similarity between two texts"""
    # Tokenize and clean
    tokens1 = word_tokenize(text1.lower())
    tokens2 = word_tokenize(text2.lower())
    
    # Remove stop words
    stop_words = set(stopwords.words('english'))
    tokens1 = [w for w in tokens1 if w.isalpha() and w not in stop_words]
    tokens2 = [w for w in tokens2 if w.isalpha() and w not in stop_words]
    
    # Create frequency vectors
    vec1 = Counter(tokens1)
    vec2 = Counter(tokens2)
    
    # Get all unique words
    all_words = set(vec1.keys()) | set(vec2.keys())
    
    # Calculate dot product
    dot_product = sum(vec1[w] * vec2[w] for w in all_words)
    
    # Calculate magnitudes
    mag1 = math.sqrt(sum(vec1[w]**2 for w in vec1))
    mag2 = math.sqrt(sum(vec2[w]**2 for w in vec2))
    
    # Cosine similarity
    if mag1 * mag2 == 0:
        return 0.0
    return dot_product / (mag1 * mag2)

# Example
text1 = "I love programming in Python"
text2 = "Python programming is great"
text3 = "The weather is nice today"

print(f"Text1-Text2 similarity: {cosine_similarity(text1, text2):.2f}")
print(f"Text1-Text3 similarity: {cosine_similarity(text1, text3):.2f}")
```

---

## Chunking

```python
from nltk import pos_tag, RegexpParser
from nltk.tokenize import word_tokenize

text = "The big brown dog chased the small cat"

# Tokenize and POS tag
tokens = word_tokenize(text)
tagged = pos_tag(tokens)

# Define grammar for noun phrases
grammar = r"""
    NP: {<DT>?<JJ>*<NN.*>+}    # Noun phrase
    VP: {<VB.*><NP|PP>}         # Verb phrase
    PP: {<IN><NP>}              # Prepositional phrase
"""

# Create parser
cp = RegexpParser(grammar)

# Parse
result = cp.parse(tagged)
print(result)

# Draw tree (requires matplotlib)
# result.draw()

# Extract noun phrases
def extract_chunks(tree, label='NP'):
    """Extract specific chunks from parse tree"""
    chunks = []
    for subtree in tree.subtrees():
        if subtree.label() == label:
            chunk = " ".join([word for word, tag in subtree.leaves()])
            chunks.append(chunk)
    return chunks

noun_phrases = extract_chunks(result, 'NP')
print("Noun phrases:", noun_phrases)
# ['The big brown dog', 'the small cat']
```

---

## Working with Corpora

```python
from nltk.corpus import brown, reuters, gutenberg, webtext

# Brown Corpus
print(f"Brown categories: {brown.categories()}")
print(f"Brown words: {len(brown.words())}")
print(f"Sample: {brown.words()[:10]}")

# News category
news_text = brown.words(categories='news')
print(f"News words: {len(news_text)}")

# Reuters Corpus
print(f"\nReuters categories: {reuters.categories()[:10]}")
print(f"Reuters words: {len(reuters.words())}")

# Gutenberg Corpus (literature)
print(f"\nGutenberg files: {gutenberg.fileids()}")
emma = gutenberg.words('austen-emma.txt')
print(f"Emma words: {len(emma)}")

# Webtext Corpus (web content)
print(f"\nWebtext files: {webtext.fileids()}")

# Analyze corpus
from nltk import FreqDist

fdist = FreqDist(w.lower() for w in brown.words() if w.isalpha())
print(f"\n Most common words in Brown corpus:")
print(fdist.most_common(10))
```

---

## Real-World Example: Document Summarization

```python
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import stopwords
from collections import Counter
import math

def summarize_text(text, num_sentences=3):
    """Extract key sentences from text"""
    # Sentence tokenization
    sentences = sent_tokenize(text)
    
    # Word tokenization and cleaning
    stop_words = set(stopwords.words('english'))
    words = word_tokenize(text.lower())
    words = [w for w in words if w.isalpha() and w not in stop_words]
    
    # Word frequency
    word_freq = Counter(words)
    
    # Score sentences
    sentence_scores = {}
    for sentence in sentences:
        words_in_sentence = word_tokenize(sentence.lower())
        words_in_sentence = [w for w in words_in_sentence if w in word_freq]
        
        if len(words_in_sentence) > 0:
            sentence_scores[sentence] = sum(word_freq[w] for w in words_in_sentence) / len(words_in_sentence)
    
    # Get top sentences
    top_sentences = sorted(sentence_scores.items(), key=lambda x: x[1], reverse=True)[:num_sentences]
    
    # Sort by original order
    summary = []
    for sentence in sentences:
        if any(sentence == s[0] for s in top_sentences):
            summary.append(sentence)
            if len(summary) == num_sentences:
                break
    
    return " ".join(summary)

# Example
article = """
Natural language processing is a field of computer science and artificial intelligence
concerned with interactions between computers and human languages. The goal of NLP is to
enable computers to understand, interpret, and generate human language in a valuable way.
NLP combines computational linguistics with machine learning and deep learning. It has many
practical applications including machine translation, sentiment analysis, and chatbots.
Modern NLP systems can process text and speech with remarkable accuracy.
"""

summary = summarize_text(article, num_sentences=2)
print("Summary:")
print(summary)
```

---

## Resources

### Official Documentation
- [NLTK Website](https://www.nltk.org/)
- [NLTK Book](https://www.nltk.org/book/)
- [NLTK API Documentation](https://www.nltk.org/api/nltk.html)

### Learning Resources
- [NLTK Tutorial](https://www.nltk.org/howto)
- [Natural Language Processing with Python](http://www.nltk.org/book/)
- [NLTK Cookbook](https://www.packtpub.com/product/nltk-cookbook/9781849513609)

### Datasets & Corpora
- [NLTK Data](https://www.nltk.org/nltk_data/)
- [Linguistic Data Consortium](https://www.ldc.upenn.edu/)

### Community
- [GitHub Repository](https://github.com/nltk/nltk)
- [NLTK Google Group](https://groups.google.com/g/nltk-users)
- [Stack Overflow - NLTK](https://stackoverflow.com/questions/tagged/nltk)

---

**Last Updated:** February 2026
