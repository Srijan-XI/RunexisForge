#  Find Factorial of a Number
n = int(input("Enter a number: "))
fact = 1
for i in range(1, n+1):
    fact *= i
print(f"Factorial: {fact}")
# Output the factorial of the given number