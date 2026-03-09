# Decorator for Timing Functions
import time

def timer(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        print("Time taken:", time.time() - start)
        return result
    return wrapper

@timer
def compute():
    sum = 0
    for i in range(1000000):
        sum += i
    return sum

compute()
# This code defines a decorator `timer` that measures the time taken by a function to execute.