// Q2: Enum with associated values
//
// Goal:
// - Create an enum `Result` with cases:
//   - success(String)
//   - failure(String)
// - Create a value and switch over it to print the message.

import Foundation

enum Result {
    case success(String)
    case failure(String)
}

let r: Result = .success("Saved")

// TODO: switch over r and print the associated message
