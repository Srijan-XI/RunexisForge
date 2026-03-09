#  Count Vowels in a String
s = input("Enter a string: ")
vowels = 'aeiouAEIOU'
count = sum(1 for char in s if char in vowels)
print("Number of vowels:", count)
# This code counts the number of vowels in a given string.