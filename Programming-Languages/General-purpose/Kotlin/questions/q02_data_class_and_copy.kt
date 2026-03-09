// Q2: Data class + copy()
//
// Goal:
// - Create a data class Person(name: String, age: Int)
// - Instantiate a Person, then create a copy with a different age
// - Print both

data class Person(val name: String, val age: Int)

fun main() {
    val p1 = Person("Sam", 20)

    // TODO: make a copy with age 21
    val p2 = p1

    println("p1=$p1")
    println("p2=$p2")
}
