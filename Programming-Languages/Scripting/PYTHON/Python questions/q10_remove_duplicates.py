# Remove Duplicates from a List
lst = [1, 2, 2, 3, 4, 4, 5]
res = list(set(lst))
print("Without duplicates:", res)
# Output: Without duplicates: [1, 2, 3, 4, 5]
# Note: The order of elements may change since sets do not maintain order.