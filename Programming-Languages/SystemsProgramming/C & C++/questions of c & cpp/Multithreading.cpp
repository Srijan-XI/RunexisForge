//Question: Demonstrate basic multithreading in C++ using std::thread.
#include <iostream>
#include <thread>
using namespace std;

void task1() {
    cout << "Task 1 is running\n";
}

void task2() {
    cout << "Task 2 is running\n";
}

int main() {
    thread t1(task1);
    thread t2(task2);

    t1.join();
    t2.join();

    return 0;
}
// This program creates two threads that execute task1 and task2 concurrently.
// Each task prints a message to the console. The main thread waits for both tasks to complete