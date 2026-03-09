# Write a function sum_squares_abs_diff_squares that takes two integer inputs, a and b, and returns a tuple with:
# 1. The sum of the squares of a and b.
# 2. The absolute difference of the squares of a and b.
# NOTE: This Is a function type question, you dont have to take
# print the output, Just have to complete the required function
# Example
# Given the inputs a = 3 and b = 4:
# Explanation
# • The sum of squares would be 9 t 16 = 25.
# • The absolute difference of squares would be 19 - 161 = 7.
# So, sum_squares_abs_diff_squares(3. 4) should return (25 ,7).
def sum_squares_abs_diff_squares(a: int, b: int) -> tuple:
    """
    This function takes two integers (a, b) and returns:
    1. The sum of their squares.
    2. The absolute difference of their squares.
    
    Example:
    sum_squares_abs_diff_squares(3, 4) -> (25, 7)
    """

    # Step 1: Compute the square of a
    square_a = a ** 2   # e.g., if a = 3 → 3^2 = 9

    # Step 2: Compute the square of b
    square_b = b ** 2   # e.g., if b = 4 → 4^2 = 16

    # Step 3: Compute the sum of the squares
    sum_of_squares = square_a + square_b   # 9 + 16 = 25

    # Step 4: Compute the absolute difference of the squares
    abs_diff_squares = abs(square_a - square_b)   # |9 - 16| = 7

    # Step 5: Return both results as a tuple
    return (sum_of_squares, abs_diff_squares)
