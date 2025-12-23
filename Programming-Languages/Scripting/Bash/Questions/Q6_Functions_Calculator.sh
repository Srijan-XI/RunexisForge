#!/bin/bash

# Question 6: Functions - Simple Calculator
# Difficulty: Intermediate
# 
# Task: Write a script that implements a simple calculator with functions for:
# - Addition
# - Subtraction
# - Multiplication
# - Division
# 
# The script should:
# 1. Ask the user for two numbers
# 2. Ask for the operation to perform
# 3. Display the result

# Your code here:
add() {
    echo $(($1 + $2))
}

subtract() {
    echo $(($1 - $2))
}

multiply() {
    echo $(($1 * $2))
}

divide() {
    if [ $2 -eq 0 ]; then
        echo "Error: Division by zero"
        return 1
    fi
    echo $(($1 / $2))
}

# Main program
read -p "Enter first number: " num1
read -p "Enter second number: " num2
read -p "Enter operation (+, -, *, /): " op

case $op in
    +)
        result=$(add $num1 $num2)
        echo "Result: $num1 + $num2 = $result"
        ;;
    -)
        result=$(subtract $num1 $num2)
        echo "Result: $num1 - $num2 = $result"
        ;;
    \*)
        result=$(multiply $num1 $num2)
        echo "Result: $num1 * $num2 = $result"
        ;;
    /)
        result=$(divide $num1 $num2)
        echo "Result: $num1 / $num2 = $result"
        ;;
    *)
        echo "Invalid operation"
        exit 1
        ;;
esac
