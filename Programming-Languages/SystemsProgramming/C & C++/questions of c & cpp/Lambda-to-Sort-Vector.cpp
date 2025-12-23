//Question: Sort a vector of integers in descending order using a lambda expression.
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> vec = {4, 2, 8, 1, 5};

    sort(vec.begin(), vec.end(), [](int a, int b) {
        return a > b;
    });

    for (int val : vec) {
        cout << val << " ";
    }
    return 0;
}
// Output: 8 5 4 2 1
// Explanation: The lambda function takes two integers and returns true if the first is greater than the second, thus sorting the vector in descending order. The sorted vector is then printed to the console.
// The use of the lambda function allows for concise and readable code without the need for a separate function definition.