# Count Word Frequency in a File
from collections import Counter

with open('sample.txt', 'r') as f:
    words = f.read().split()
    freq = Counter(words)
    print(freq)
# Output the word frequency