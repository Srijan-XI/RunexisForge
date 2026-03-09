#!/bin/bash

# Question 4: Loops - Multiplication Table
# Difficulty: Beginner
# 
# Task: Write a script that:
# 1. Takes a number as input
# 2. Prints the multiplication table for that number from 1 to 10
# 
# Example Output (for input 5):
# 5 x 1 = 5
# 5 x 2 = 10
# 5 x 3 = 15
# ...
# 5 x 10 = 50

# Your code here:
read -p "Enter a number: " num

for i in {1..10}; do
    result=$((num * i))
    echo "$num x $i = $result"
done
