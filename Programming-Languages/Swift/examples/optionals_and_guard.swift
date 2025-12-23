import Foundation

func printLength(_ value: String?) {
    guard let value else {
        print(0)
        return
    }
    print(value.count)
}

printLength(nil)
printLength("DevSphere")
