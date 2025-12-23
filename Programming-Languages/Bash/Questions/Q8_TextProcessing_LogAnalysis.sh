#!/bin/bash

# Question 8: Text Processing - Log Analysis
# Difficulty: Intermediate
# 
# Task: Create a sample log file and write a script that:
# 1. Counts the total number of log entries
# 2. Counts entries with "ERROR"
# 3. Counts entries with "WARNING"
# 4. Lists the top 5 most common error messages
# 
# First, create a sample log file:
# cat > sample.log << 'EOF'
# 2024-01-15 10:23:45 INFO Application started
# 2024-01-15 10:24:12 ERROR Database connection failed
# 2024-01-15 10:24:15 WARNING Low memory
# 2024-01-15 10:25:01 ERROR Database connection failed
# 2024-01-15 10:26:33 INFO User logged in
# 2024-01-15 10:27:45 ERROR File not found
# 2024-01-15 10:28:12 WARNING Disk space low
# 2024-01-15 10:29:01 ERROR Database connection failed
# EOF

# Your code here:
log_file="sample.log"

# Create sample log if it doesn't exist
if [ ! -f "$log_file" ]; then
    cat > "$log_file" << 'EOF'
2024-01-15 10:23:45 INFO Application started
2024-01-15 10:24:12 ERROR Database connection failed
2024-01-15 10:24:15 WARNING Low memory
2024-01-15 10:25:01 ERROR Database connection failed
2024-01-15 10:26:33 INFO User logged in
2024-01-15 10:27:45 ERROR File not found
2024-01-15 10:28:12 WARNING Disk space low
2024-01-15 10:29:01 ERROR Database connection failed
2024-01-15 10:30:15 INFO Processing completed
2024-01-15 10:31:22 ERROR Timeout occurred
EOF
fi

echo "=== Log Analysis Report ==="
echo

# Total entries
total=$(wc -l < "$log_file")
echo "Total log entries: $total"

# Count errors
errors=$(grep -c "ERROR" "$log_file")
echo "Error entries: $errors"

# Count warnings
warnings=$(grep -c "WARNING" "$log_file")
echo "Warning entries: $warnings"

echo
echo "Top 5 most common error messages:"
grep "ERROR" "$log_file" | awk '{$1=$2=$3=""; print $0}' | sort | uniq -c | sort -rn | head -5
