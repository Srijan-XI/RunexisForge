#!/bin/bash

# Question 3: Conditional Statements - Even or Odd
# Difficulty: Beginner
# 
# Task: Write a script that:
# 1. Takes a number as input from the user
# 2. Determines if the number is even or odd
# 3. Prints the result
# 
# Example Output:
# Enter a number: 7
# 7 is odd.

# Your code here:
read -p "Enter a number: " num

if [ $((num % 2)) -eq 0 ]; then
    echo "$num is even."
else
    echo "$num is odd."
fi
