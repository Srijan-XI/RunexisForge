#!/bin/bash

# Question 2: Variables and User Input
# Difficulty: Beginner
# 
# Task: Write a script that:
# 1. Asks the user for their name
# 2. Asks the user for their age
# 3. Prints a greeting message using both pieces of information
# 
# Example Output:
# Enter your name: John
# Enter your age: 25
# Hello, John! You are 25 years old.

# Your code here:
read -p "Enter your name: " name
read -p "Enter your age: " age
echo "Hello, $name! You are $age years old."
