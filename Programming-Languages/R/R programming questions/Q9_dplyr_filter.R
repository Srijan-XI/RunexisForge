# Question 9: Using dplyr, filter the mtcars dataset for cars with mpg greater than 25 and print their names
library(dplyr)
filtered <- mtcars %>% filter(mpg > 25)
print(rownames(filtered))
