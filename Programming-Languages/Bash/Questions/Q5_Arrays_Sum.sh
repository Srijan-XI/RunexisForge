#!/bin/bash

# Question 5: Arrays - Sum and Average
# Difficulty: Intermediate
# 
# Task: Write a script that:
# 1. Defines an array of numbers
# 2. Calculates and prints the sum of all numbers
# 3. Calculates and prints the average
# 
# Example:
# Array: (10 20 30 40 50)
# Sum: 150
# Average: 30

# Your code here:
numbers=(10 20 30 40 50)

sum=0
count=${#numbers[@]}

for num in "${numbers[@]}"; do
    sum=$((sum + num))
done

average=$((sum / count))

echo "Array: ${numbers[@]}"
echo "Sum: $sum"
echo "Average: $average"
