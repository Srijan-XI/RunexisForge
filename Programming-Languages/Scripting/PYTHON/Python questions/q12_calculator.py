#  Implement a Simple Calculator
def add(a, b): return a + b
def sub(a, b): return a - b
def mul(a, b): return a * b
def div(a, b): return a / b

a = float(input("Enter first number: "))
op = input("Enter operator (+, -, *, /): ")
b = float(input("Enter second number: "))

ops = {'+': add, '-': sub, '*': mul, '/': div}
if op in ops:
    print("Result:", ops[op](a, b))
else:
    print("Invalid operator")
# Note: This code assumes valid input for simplicity.