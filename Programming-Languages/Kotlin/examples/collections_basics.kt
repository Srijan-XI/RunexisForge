fun main() {
    val nums = listOf(1, 2, 3, 4, 5, 6)

    val evens = nums.filter { it % 2 == 0 }
    val squares = nums.map { it * it }
    val sum = nums.sum()

    println("nums=$nums")
    println("evens=$evens")
    println("squares=$squares")
    println("sum=$sum")
}
