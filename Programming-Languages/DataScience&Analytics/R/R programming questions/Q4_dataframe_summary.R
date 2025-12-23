# Question 4: Create a data frame of names and ages, and print the mean age
df <- data.frame(
  name = c("Srijan", "Akash", "Priya", "Neha"),
  age = c(21, 22, 20, 23)
)
mean_age <- mean(df$age)
print(mean_age)
