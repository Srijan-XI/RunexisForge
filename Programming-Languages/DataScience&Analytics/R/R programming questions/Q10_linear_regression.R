# Question 10: Fit a linear regression model to predict Petal.Length using Sepal.Length in iris dataset, and print the summary
model <- lm(Petal.Length ~ Sepal.Length, data = iris)
summary(model)
