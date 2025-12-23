# Question 7: Calculate the mean Sepal.Length for each species in the iris dataset
means <- tapply(iris$Sepal.Length, iris$Species, mean)
print(means)

# The code calculates the mean Sepal.Length for each species in the iris dataset