# 📈 R Programming Language

> *"R: The lingua franca of data science and statistics"*

---

## Table of Contents

1. [Introduction](#introduction)
2. [Key Features](#key-features)
3. [What is R Used For?](#what-is-r-used-for)
4. [Advantages](#advantages)
5. [Disadvantages](#disadvantages)
6. [R vs Python vs MATLAB](#r-vs-python-vs-matlab)
7. [Who Should Use R?](#who-should-use-r)
8. [Learning Resources](#learning-resources)
9. [Installation Guide](#installation-guide)
    - [Windows](#windows)
    - [Linux (Ubuntu/Debian)](#linux-ubuntudebian)
    - [macOS](#macos)
    - [Post-Installation Steps](#post-installation-steps)
10. [User Guide](#user-guide)
    - [R Basics](#r-basics)
    - [Vectors & Data Types](#vectors--data-types)
    - [Control Flow](#control-flow)
    - [Functions](#functions)
    - [Data Frames](#data-frames)
    - [Packages (CRAN)](#packages-cran)
    - [Data Manipulation with dplyr](#data-manipulation-with-dplyr)
    - [Visualization with ggplot2](#visualization-with-ggplot2)
    - [Statistical Analysis](#statistical-analysis)
    - [R Markdown & Quarto](#r-markdown--quarto)
    - [Best Practices](#best-practices)

---

## Introduction

**R** is a free, open-source programming language and software environment for statistical computing and graphics. Developed in the early 1990s by Ross Ihaka and Robert Gentleman at the University of Auckland, R is now maintained by the **R Core Team** and supported by the **Comprehensive R Archive Network (CRAN)** — home to 20,000+ packages.

R is the dominant language in academic statistics, bioinformatics, epidemiology, and social sciences, and is widely used in data science alongside Python.

### History & Context

| Attribute | Detail |
|-----------|--------|
| **Developed by** | Ross Ihaka & Robert Gentleman (1993), now R Core Team |
| **First Released** | 1995 |
| **Current Version** | R 4.4.x (2024) |
| **License** | GNU GPL (fully open-source) |
| **File Extension** | `.R` (scripts), `.Rmd` (R Markdown), `.qmd` (Quarto) |
| **Repository** | CRAN — 20,000+ packages |

---

## Key Features

| Feature | Description |
|---------|-------------|
| **Statistical Computing** | Unparalleled built-in statistical functions |
| **ggplot2 Visualization** | Grammar of Graphics — publication-quality plots |
| **Tidyverse Ecosystem** | Coherent set of data science packages |
| **CRAN** | 20,000+ peer-reviewed packages |
| **R Markdown / Quarto** | Reproducible research documents with embedded code |
| **Shiny** | Build interactive web apps entirely in R |
| **S3/S4/R5 OOP** | Multiple OOP paradigms |
| **Vectorized Operations** | No loops needed for most computations |
| **Bioconductor** | Specialized packages for genomics/bioinformatics |

---

## What is R Used For?

| Domain | Applications |
|--------|-------------|
| **Statistics** | Hypothesis testing, regression, ANOVA, Bayesian models |
| **Data Science** | EDA, feature engineering, model training |
| **Bioinformatics** | Genome analysis (Bioconductor), RNA-seq, proteomics |
| **Epidemiology** | Survival analysis, clinical trials, outbreak modeling |
| **Social Sciences** | Survey analysis, econometrics, political science |
| **Finance** | Time series, risk modeling, portfolio optimization |
| **Machine Learning** | `caret`, `tidymodels`, `mlr3`, `xgboost`, `keras` |
| **Reporting** | Reproducible research with R Markdown and Quarto |

---

## Advantages

| ✅ Advantage | Details |
|------------|---------|
| **Best-in-class stats** | More statistical methods than any other language |
| **Fully open-source** | Free for all uses — commercial, academic, research |
| **CRAN quality** | Peer-reviewed packages with documentation standards |
| **ggplot2** | Best visualization library; Grammar of Graphics |
| **R Markdown** | Seamless code + text + output in one document |
| **Bioconductor** | Gold standard for bioinformatics workflows |
| **Shiny** | Interactive data apps with zero web dev knowledge |
| **Tidyverse** | Consistent, readable data manipulation syntax |

---

## Disadvantages

| ❌ Disadvantage | Details |
|---------------|---------|
| **Memory usage** | Loads entire datasets into RAM by default |
| **Speed** | Slower than Python/Julia for large loops; needs vectorization |
| **General purpose** | Not designed for web, mobile, or system programming |
| **Learning curve** | R's syntax quirks (indexing, `<-`, S3/S4) can confuse newcomers |
| **Package fragmentation** | Multiple solutions for same problem; can be inconsistent |
| **Deployment** | Harder to deploy models than Python (Flask/FastAPI) |

---

## R vs Python vs MATLAB

| Feature | R | Python | MATLAB |
|---------|---|--------|--------|
| **Cost** | ✅ Free | ✅ Free | ❌ Commercial |
| **Statistics** | ⚡ Best | ✅ scipy/statsmodels | ✅ Stat Toolbox |
| **Visualization** | ⚡ ggplot2 | ✅ matplotlib/Plotly | ✅ Built-in |
| **ML/DL** | ✅ tidymodels/keras | ⚡ PyTorch/TF | ✅ ML Toolbox |
| **Bioinformatics** | ⚡ Bioconductor | ✅ Biopython | ⚠️ Limited |
| **General Purpose** | ⚠️ Limited | ⚡ Best | ⚠️ Limited |
| **Web/API** | Shiny (R-only) | ⚡ Flask/FastAPI | ❌ |
| **Community** | ✅ Academic/stats | ⚡ Largest overall | ✅ Engineering |

---

## Who Should Use R?

### ✅ Perfect For:
- **Statisticians** and data analysts
- **Bioinformaticians** (RNA-seq, genome analysis with Bioconductor)
- **Epidemiologists** and public health researchers
- **Social scientists** (survey analysis, econometrics)
- **Anyone** needing publication-quality statistical graphics
- **Data journalists** and report generators

### 💡 Consider Python Instead If:
- You need general-purpose programming (web, APIs, automation)
- Deep learning is a primary focus (PyTorch/TensorFlow ecosystem)
- You're building production data pipelines

---

## Learning Resources

| Resource | Link |
|----------|------|
| **Official CRAN** | [cran.r-project.org](https://cran.r-project.org) |
| **RStudio/Posit** | [posit.co](https://posit.co) |
| **R for Data Science** | [r4ds.hadley.nz](https://r4ds.hadley.nz) (free online) |
| **Tidyverse** | [tidyverse.org](https://www.tidyverse.org) |
| **Swirl** | Interactive R learning in your console |
| **Book** | *R for Data Science* — Hadley Wickham (free online) |
| **YouTube** | David Robinson, Julia Silge (TidyTuesday), StatQuest |

---

## Installation Guide

### Windows

#### Installing R

1. Go to [cran.r-project.org/bin/windows/base/](https://cran.r-project.org/bin/windows/base/)
2. Click **Download R for Windows** → download the `.exe` installer
3. Run the installer — accept defaults; optionally add R to PATH
4. Verify: open Command Prompt → type `R --version`

#### Installing RStudio

1. Download RStudio Desktop from [posit.co/download/rstudio-desktop/](https://posit.co/download/rstudio-desktop/)
2. Run the `.exe` installer and follow prompts
3. Open RStudio — it auto-detects your R installation

---

### Linux (Ubuntu/Debian)

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Add CRAN repository (for up-to-date R)
sudo apt install --no-install-recommends software-properties-common dirmngr
wget -qO- https://cloud.r-project.org/bin/linux/ubuntu/marutter_pubkey.asc \
    | sudo tee /etc/apt/trusted.gpg.d/cran_ubuntu_key.asc
sudo add-apt-repository "deb https://cloud.r-project.org/bin/linux/ubuntu $(lsb_release -cs)-cran40/"

# Install R
sudo apt update
sudo apt install -y r-base r-base-dev

# Verify
R --version
```

#### Install RStudio (Linux)

```bash
# Install dependency
sudo apt install -y gdebi-core

# Download and install (check posit.co for the latest version URL)
wget https://download1.rstudio.org/electron/jammy/amd64/rstudio-2024.09.1-394-amd64.deb
sudo gdebi rstudio-2024.09.1-394-amd64.deb
```

---

### macOS

```bash
# Option 1: Download .pkg from CRAN
# https://cran.r-project.org/bin/macosx/

# Option 2: Homebrew
xcode-select --install     # Ensure Xcode Command Line Tools
brew install r

# Install RStudio: download .dmg from posit.co
# Drag RStudio.app into Applications
```

---

### Post-Installation Steps

```r
# Verify R version
R.version.string   # → "R version 4.4.x (2024-xx-xx)"

# Install the Tidyverse (core data science ecosystem)
install.packages("tidyverse")

# Install other essentials
install.packages(c(
    "data.table",    # fast data manipulation
    "ggplot2",       # visualization (included in tidyverse)
    "devtools",      # install from GitHub
    "rmarkdown",     # R Markdown reports
    "quarto",        # next-gen Quarto documents
    "janitor",       # data cleaning
    "here"           # project-relative file paths
))

# Update all installed packages
update.packages(ask = FALSE, checkBuilt = TRUE)

# Set a custom library path (for corporate/shared environments)
.libPaths("C:/Users/you/R/library")

# Set CRAN mirror in .Rprofile (auto-selects closest mirror)
options(repos = c(CRAN = "https://cloud.r-project.org"))
```

---

## User Guide

---

### R Basics

```r
# R is interactive — use the Console or run .R scripts

# Arithmetic
3 + 4          # → 7
10 / 3         # → 3.333...
2^10           # → 1024 (power)
17 %% 5        # → 2  (modulo)
17 %/% 5       # → 3  (integer division)

# Assignment (both work; <- is idiomatic R)
x <- 42
y = "hello"
z <<- TRUE      # <<- assigns to parent environment (use carefully)

# Print
x               # auto-prints in console
print(x)        # explicit
cat("Value:", x, "\n")   # formatted output (no newline by default)

# Comments
# This is a comment

# Check type
class(x)        # → "numeric"
typeof(x)       # → "double"
is.numeric(x)   # → TRUE
is.character(y) # → TRUE
```

---

### Vectors & Data Types

R's fundamental data structure is the **vector** — everything is a vector.

```r
#--- ATOMIC VECTORS ---
num_vec  <- c(1.5, 2.7, 3.14, 4.0)    # numeric (double)
int_vec  <- c(1L, 2L, 3L)              # integer (L suffix)
chr_vec  <- c("apple", "banana", "cherry")  # character
lgl_vec  <- c(TRUE, FALSE, TRUE, NA)   # logical
cpx_vec  <- c(1+2i, 3-4i)             # complex

# Sequences
1:10                     # → 1 2 3 4 5 6 7 8 9 10
seq(0, 1, by = 0.2)     # → 0.0 0.2 0.4 0.6 0.8 1.0
seq(1, 100, length.out = 5)  # → 1 25.75 50.5 75.25 100
rep(c(1, 2, 3), times = 3)   # → 1 2 3 1 2 3 1 2 3
rep(c(1, 2, 3), each = 2)    # → 1 1 2 2 3 3

# Indexing (1-based!)
v <- c(10, 20, 30, 40, 50)
v[1]            # → 10  (first element)
v[c(1, 3, 5)]  # → 10 30 50
v[-2]           # → 10 30 40 50  (exclude index 2)
v[v > 25]       # → 30 40 50  (logical filter)

# Vectorized operations (no loop needed)
v * 2           # → 20 40 60 80 100
v + c(1, 2, 3, 4, 5)  # element-wise addition
sqrt(v)         # → 3.16 4.47 5.48 6.32 7.07
sum(v); mean(v); sd(v); var(v); median(v)
cumsum(v)       # → 10 30 60 100 150

#--- FACTORS (categorical variables) ---
grade <- factor(c("A","B","A","C","B","A"),
                levels = c("A","B","C"),
                ordered = TRUE)
table(grade)    # frequency count
levels(grade)   # → "A" "B" "C"

#--- LISTS (heterogeneous) ---
person <- list(
    name  = "Alice",
    age   = 30,
    scores = c(95, 87, 92)
)
person$name         # → "Alice"
person[["scores"]]  # → c(95, 87, 92)
person$scores[2]    # → 87

#--- MATRICES ---
M <- matrix(1:9, nrow = 3, ncol = 3, byrow = TRUE)
M[2, 3]        # row 2, col 3
M[, 1]         # entire first column
t(M)           # transpose
M %*% M        # matrix multiplication
```

---

### Control Flow

```r
#--- IF / ELSE IF / ELSE ---
x <- 75
if (x >= 90) {
    cat("A\n")
} else if (x >= 80) {
    cat("B\n")
} else if (x >= 70) {
    cat("C\n")
} else {
    cat("F\n")
}

# Inline ifelse() — vectorized ternary
scores <- c(85, 92, 67, 78, 95)
pass <- ifelse(scores >= 70, "Pass", "Fail")
# → "Pass" "Pass" "Fail" "Pass" "Pass"

#--- FOR LOOP ---
total <- 0
for (i in 1:10) {
    total <- total + i
}
cat("Sum:", total, "\n")   # → 55

# Loop over a vector
for (fruit in c("apple", "banana", "cherry")) {
    cat(toupper(fruit), "\n")
}

#--- WHILE LOOP ---
n <- 1
while (n < 100) {
    n <- n * 2
}
cat(n, "\n")   # → 128

#--- REPEAT (do-while equivalent) ---
count <- 0
repeat {
    count <- count + 1
    if (count >= 5) break
}

#--- NEXT (continue) / BREAK ---
for (i in 1:10) {
    if (i %% 2 == 0) next  # skip evens
    if (i > 7)       break  # stop at 7
    cat(i, "")
}
# → 1 3 5 7

#--- SWITCH ---
day_type <- function(day) {
    switch(day,
        Monday   = ,
        Tuesday  = ,
        Wednesday = ,
        Thursday = ,
        Friday   = "Weekday",
        Saturday = ,
        Sunday   = "Weekend",
        "Unknown"   # default
    )
}
day_type("Saturday")   # → "Weekend"
```

---

### Functions

```r
#--- BASIC FUNCTION ---
square <- function(x) {
    x^2   # last expression is returned automatically
}
square(7)   # → 49

#--- DEFAULT ARGUMENTS ---
greet <- function(name, greeting = "Hello") {
    paste(greeting, name)
}
greet("Alice")            # → "Hello Alice"
greet("Bob", "Hi")        # → "Hi Bob"

#--- MULTIPLE RETURN VALUES (via list) ---
stats <- function(x) {
    list(
        mean   = mean(x),
        sd     = sd(x),
        median = median(x),
        range  = range(x)
    )
}
result <- stats(c(4, 7, 2, 9, 1, 5))
result$mean       # → 4.666...
result$range      # → 1 9

#--- ... (ELLIPSIS) for variadic functions ---
my_sum <- function(...) {
    args <- c(...)
    sum(args)
}
my_sum(1, 2, 3, 4, 5)    # → 15

#--- ANONYMOUS FUNCTIONS (lambda) ---
# Old style
sq <- function(x) x^2

# New style (R 4.1+)
sq2 <- \(x) x^2

# Use with apply family
vapply(1:5, \(x) x^2, numeric(1))   # → 1 4 9 16 25

#--- APPLY FAMILY (vectorized alternatives to loops) ---
m <- matrix(1:12, nrow = 3)
apply(m, 1, sum)      # row sums
apply(m, 2, mean)     # column means

lst <- list(a = 1:5, b = 6:10, c = 11:15)
sapply(lst, mean)     # → a=3, b=8, c=13  (named vector)
lapply(lst, sum)      # → list of sums

# Map (pairwise)
mapply(function(x, y) x + y, 1:3, 4:6)  # → 5 7 9

#--- CLOSURES ---
make_counter <- function() {
    count <- 0
    list(
        increment = function() { count <<- count + 1; count },
        reset     = function() { count <<- 0 }
    )
}
counter <- make_counter()
counter$increment()   # → 1
counter$increment()   # → 2
counter$reset()
```

---

### Data Frames

A **data frame** is R's table structure — like a SQL table or spreadsheet.

```r
#--- CREATE ---
df <- data.frame(
    id     = 1:5,
    name   = c("Alice", "Bob", "Carol", "David", "Eve"),
    score  = c(92, 85, 78, 95, 88),
    passed = c(TRUE, TRUE, TRUE, TRUE, TRUE),
    grade  = factor(c("A","B","C","A","B")),
    stringsAsFactors = FALSE
)

#--- INSPECT ---
head(df, 3)         # first 3 rows
tail(df, 2)         # last 2 rows
str(df)             # structure
summary(df)         # summary statistics
nrow(df); ncol(df)  # dimensions
colnames(df)        # column names

#--- ACCESS ---
df$name             # column by name
df[["score"]]       # same
df[2, ]             # row 2 (all columns)
df[, 3]             # column 3
df[df$score > 90, ]  # filter rows

#--- MODIFY ---
df$rank <- rank(-df$score)    # add new column
df$score[3] <- 80             # modify a value
df$grade <- as.character(df$grade)  # change type

#--- AGGREGATE ---
aggregate(score ~ grade, data = df, FUN = mean)
tapply(df$score, df$grade, mean)   # equivalent
```

---

### Packages (CRAN)

```r
# Install a package (once)
install.packages("ggplot2")
install.packages(c("dplyr", "tidyr", "readr", "stringr"))

# Install from GitHub (requires devtools)
devtools::install_github("tidyverse/dplyr")

# Load for use in current session
library(ggplot2)
library(dplyr)

# Use without loading (namespace)
dplyr::filter(df, score > 85)

# See installed packages
installed.packages()[, "Package"]

# Update all packages
update.packages(ask = FALSE)

# renv — project-specific package environments (like Python venv)
install.packages("renv")
renv::init()        # create project lockfile
renv::snapshot()    # save current package versions
renv::restore()     # reinstall from lockfile
```

---

### Data Manipulation with dplyr

`dplyr` is the tidyverse's data manipulation package — SQL-like verbs with pipe syntax.

```r
library(dplyr)
library(tidyr)
library(readr)

# Sample dataset
students <- tibble(
    id      = 1:8,
    name    = c("Alice","Bob","Carol","David","Eve","Frank","Grace","Henry"),
    score   = c(92, 85, 78, 95, 88, 72, 96, 81),
    subject = c("Math","Sci","Math","Sci","Math","Sci","Math","Sci"),
    year    = c(2023,2023,2024,2024,2023,2024,2024,2023)
)

#--- SELECT: choose columns ---
students |> select(name, score)

#--- FILTER: keep rows matching condition ---
students |> filter(score >= 85)
students |> filter(subject == "Math", year == 2024)

#--- MUTATE: add/modify columns ---
students |>
    mutate(
        grade     = case_when(
            score >= 90 ~ "A",
            score >= 80 ~ "B",
            score >= 70 ~ "C",
            TRUE        ~ "F"
        ),
        score_pct = round(score / 100 * 100, 1)
    )

#--- ARRANGE: sort rows ---
students |> arrange(desc(score))
students |> arrange(subject, score)

#--- SUMMARIZE + GROUP_BY: aggregation ---
students |>
    group_by(subject) |>
    summarise(
        count     = n(),
        avg_score = mean(score),
        max_score = max(score),
        min_score = min(score),
        pass_rate = mean(score >= 70)
    )

#--- JOINS ---
teachers <- tibble(
    subject = c("Math","Sci"),
    teacher = c("Dr. Smith","Prof. Jones")
)
students |> left_join(teachers, by = "subject")

#--- PIVOT (reshape) ---
# Wide to long
wide_df <- tibble(
    name = c("Alice", "Bob"),
    math = c(90, 85),
    sci  = c(88, 92)
)
long_df <- wide_df |>
    pivot_longer(cols = c(math, sci),
                 names_to  = "subject",
                 values_to = "score")

# Long to wide
long_df |>
    pivot_wider(names_from  = subject,
                values_from = score)

#--- READ / WRITE CSV ---
df <- read_csv("data.csv")           # readr (tidyverse)
write_csv(students, "students.csv")

# Base R alternative
df2 <- read.csv("data.csv", stringsAsFactors = FALSE)
```

---

### Visualization with ggplot2

`ggplot2` implements the **Grammar of Graphics** — build plots layer by layer.

```r
library(ggplot2)
library(dplyr)

# Use built-in mtcars dataset
data(mtcars)
mtcars$cyl <- factor(mtcars$cyl)

#--- SCATTER PLOT ---
ggplot(mtcars, aes(x = wt, y = mpg, color = cyl, size = hp)) +
    geom_point(alpha = 0.7) +
    geom_smooth(method = "lm", se = TRUE, aes(group = 1), color = "black") +
    scale_color_brewer(palette = "Set1") +
    labs(
        title    = "MPG vs Weight by Cylinder Count",
        subtitle = "Motor Trend Car Road Tests",
        x        = "Weight (1000 lbs)",
        y        = "Miles Per Gallon",
        color    = "Cylinders",
        size     = "Horsepower"
    ) +
    theme_minimal(base_size = 13) +
    theme(legend.position = "right")

#--- BAR CHART ---
mtcars |>
    count(cyl) |>
    ggplot(aes(x = cyl, y = n, fill = cyl)) +
        geom_col(width = 0.6) +
        geom_text(aes(label = n), vjust = -0.5) +
        scale_fill_viridis_d() +
        labs(title = "Cars by Cylinder Count", x = "Cylinders", y = "Count") +
        theme_light() +
        theme(legend.position = "none")

#--- HISTOGRAM ---
ggplot(mtcars, aes(x = mpg, fill = cyl)) +
    geom_histogram(bins = 15, alpha = 0.7, position = "identity") +
    facet_wrap(~ cyl, ncol = 1) +
    labs(title = "MPG Distribution by Cylinder Count") +
    theme_minimal()

#--- BOX PLOT ---
ggplot(mtcars, aes(x = cyl, y = mpg, fill = cyl)) +
    geom_boxplot(outlier.shape = 21, outlier.size = 2) +
    geom_jitter(width = 0.1, alpha = 0.4) +
    scale_fill_brewer(palette = "Pastel1") +
    labs(title = "MPG Distribution by Cylinders") +
    theme_classic()

#--- LINE CHART (time series) ---
economics <- ggplot2::economics   # built-in dataset
ggplot(economics, aes(x = date, y = unemploy / pop * 100)) +
    geom_line(color = "#2166AC", linewidth = 1) +
    geom_area(fill = "#2166AC", alpha = 0.1) +
    labs(
        title = "US Unemployment Rate Over Time",
        x = "Year", y = "Unemployment (%)"
    ) +
    theme_minimal()

#--- FACET (multiple panels) ---
ggplot(mtcars, aes(x = wt, y = mpg)) +
    geom_point(aes(color = factor(gear))) +
    geom_smooth(method = "lm", se = FALSE) +
    facet_grid(am ~ cyl, labeller = label_both) +
    theme_bw()

#--- SAVE PLOT ---
ggsave("my_plot.png", width = 8, height = 5, dpi = 300)
ggsave("my_plot.pdf", width = 8, height = 5)
```

---

### Statistical Analysis

```r
#--- DESCRIPTIVE STATISTICS ---
x <- c(23, 45, 12, 67, 34, 89, 56, 78, 90, 43)
summary(x)         # Min, Q1, Median, Mean, Q3, Max
mean(x); median(x)
sd(x); var(x)
quantile(x, probs = c(0.25, 0.75))
cor(mtcars$wt, mtcars$mpg)   # Pearson correlation

#--- LINEAR REGRESSION ---
model <- lm(mpg ~ wt + hp + cyl, data = mtcars)
summary(model)               # coefficients, R², p-values
coef(model)                  # extract coefficients
confint(model)               # 95% CIs
fitted(model)                # predicted values
residuals(model)             # residuals
predict(model, newdata = data.frame(wt=3, hp=110, cyl="6"))

# Diagnostic plots
par(mfrow = c(2,2))
plot(model)
par(mfrow = c(1,1))

#--- HYPOTHESIS TESTS ---
# One-sample t-test
t.test(x, mu = 50)

# Two-sample t-test
group_a <- rnorm(30, mean = 70, sd = 10)
group_b <- rnorm(30, mean = 75, sd = 10)
t.test(group_a, group_b, var.equal = FALSE)   # Welch's t-test

# Chi-square test of independence
table_data <- table(mtcars$cyl, mtcars$am)
chisq.test(table_data)

# Shapiro-Wilk normality test
shapiro.test(group_a)   # H0: data is normal; p > 0.05 → fail to reject

# Wilcoxon (non-parametric alternative to t-test)
wilcox.test(group_a, group_b)

# ANOVA
model_aov <- aov(mpg ~ factor(cyl), data = mtcars)
summary(model_aov)
TukeyHSD(model_aov)    # post-hoc pairwise comparisons

#--- LOGISTIC REGRESSION ---
mtcars$am <- factor(mtcars$am)
log_model <- glm(am ~ wt + hp, data = mtcars, family = binomial)
summary(log_model)
exp(coef(log_model))   # odds ratios

#--- TIDYMODELS (modern ML in R) ---
library(tidymodels)

# Split data
split    <- initial_split(mtcars, prop = 0.8)
train_df <- training(split)
test_df  <- testing(split)

# Define model
rf_model <- rand_forest(trees = 500) |>
    set_engine("ranger") |>
    set_mode("regression")

# Fit
rf_fitted <- rf_model |> fit(mpg ~ ., data = train_df)

# Predict and evaluate
preds <- predict(rf_fitted, test_df)
bind_cols(test_df |> select(mpg), preds) |>
    metrics(truth = mpg, estimate = .pred)
```

---

### R Markdown & Quarto

R Markdown (`.Rmd`) and Quarto (`.qmd`) let you write reports where code, output, and text live in the same file.

**Basic `.Rmd` structure:**

```r
# In YAML header (at top of .Rmd file):
# ---
# title: "My Analysis"
# author: "Alice"
# date: "`r Sys.Date()`"
# output: html_document
# ---

# Then in R code chunks:
# ```{r setup, include=FALSE}
# knitr::opts_chunk$set(echo = TRUE, warning = FALSE)
# library(tidyverse)
# ```

# ```{r summary-stats}
# data(mtcars)
# summary(mtcars$mpg)
# ```

# ```{r plot, fig.width=8, fig.height=5}
# ggplot(mtcars, aes(wt, mpg)) + geom_point() + theme_minimal()
# ```

# Render from R console:
rmarkdown::render("analysis.Rmd")               # → HTML
rmarkdown::render("analysis.Rmd", "pdf_document")  # → PDF (needs LaTeX)
rmarkdown::render("analysis.Rmd", "word_document")  # → .docx
```

For **Quarto** (next-gen, multi-language):
```bash
# Install Quarto CLI from quarto.org
quarto render analysis.qmd --to html
quarto render analysis.qmd --to pdf
```

---

### Best Practices

#### 1. Use `<-` for Assignment (R idiom)

```r
# Preferred in R (more readable, avoids ambiguity)
x <- 42
y <- "hello"

# Works but not idiomatic
x = 42
```

#### 2. Use the Pipe `|>` (R 4.1+)

```r
# Without pipe — nested and hard to read
result <- summarise(group_by(filter(df, score > 70), subject), mean_score = mean(score))

# With native pipe |> — left-to-right, readable
result <- df |>
    filter(score > 70) |>
    group_by(subject) |>
    summarise(mean_score = mean(score))
```

#### 3. Vectorize — Avoid Loops

```r
# SLOW
result <- numeric(1e6)
for (i in seq_along(result)) result[i] <- sqrt(i)

# FAST (vectorized)
result <- sqrt(1:1e6)
```

#### 4. Use `here::here()` for File Paths

```r
# BAD: hardcoded absolute path
read_csv("C:/Users/alice/project/data/raw/survey.csv")

# GOOD: relative to project root
library(here)
read_csv(here("data", "raw", "survey.csv"))
```

#### 5. Structure Projects Consistently

```
my-project/
├── data/
│   ├── raw/        # never edit raw data
│   └── processed/
├── R/
│   ├── 01_load.R
│   ├── 02_clean.R
│   └── 03_analyze.R
├── output/
│   ├── figures/
│   └── tables/
├── reports/
│   └── analysis.Rmd
├── renv.lock       # package versions snapshot
└── my-project.Rproj
```

#### 6. Handle NA Values Explicitly

```r
x <- c(1, 2, NA, 4, 5)
mean(x)              # → NA (by design)
mean(x, na.rm = TRUE)  # → 3
is.na(x)             # → FALSE FALSE TRUE FALSE FALSE
x[!is.na(x)]        # remove NAs
```

---

## Reference Table

| Task/OS | Windows | Linux (Ubuntu) | macOS |
|---------|---------|---------------|-------|
| Download R | CRAN `.exe` installer | `sudo apt install r-base` | CRAN `.pkg` or `brew install r` |
| Install RStudio | `.exe` from posit.co | `.deb` via gdebi | `.dmg` from posit.co |
| Verify | `R --version` in CMD | `R --version` in terminal | `R --version` in terminal |
| Update R | Re-run installer | `sudo apt upgrade r-base` | Re-run `.pkg` |
| Update packages | `update.packages()` | `update.packages()` | `update.packages()` |

---

## Next Steps

1. **R for Data Science** — [r4ds.hadley.nz](https://r4ds.hadley.nz) — free comprehensive textbook
2. **Swirl** — `install.packages("swirl"); swirl::swirl()` — interactive in-console course
3. **TidyTuesday** — weekly data visualization challenge; great for practice
4. **Shiny** — [shiny.posit.co](https://shiny.posit.co) — build interactive apps with R
5. **[MATLAB](../MATLAB/MATLAB.md)** — compare for numerical/engineering computing

---

*Last Updated: February 20, 2026*
