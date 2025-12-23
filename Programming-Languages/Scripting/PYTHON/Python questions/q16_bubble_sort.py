#  Implement Bubble Sort
lst = [5, 2, 9, 1, 5, 6]
n = len(lst)
for i in range(n):
    for j in range(0, n-i-1):
        if lst[j] > lst[j+1]:
            lst[j], lst[j+1] = lst[j+1], lst[j]
print("Sorted list:", lst)
