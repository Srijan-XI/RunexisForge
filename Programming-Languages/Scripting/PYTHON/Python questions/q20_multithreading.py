# Multithreading Example
import threading

def print_numbers():
    for i in range(5):
        print("Number:", i)

def print_letters():
    for ch in 'abcde':
        print("Letter:", ch)

t1 = threading.Thread(target=print_numbers)
t2 = threading.Thread(target=print_letters)
t1.start()
t2.start()
t1.join()
t2.join()
print("Finished printing numbers and letters.")