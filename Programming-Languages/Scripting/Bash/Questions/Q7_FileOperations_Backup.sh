#!/bin/bash

# Question 7: File Operations - Backup Script
# Difficulty: Intermediate
# 
# Task: Write a script that:
# 1. Takes a directory path as an argument
# 2. Creates a backup of all .txt files in that directory
# 3. Saves the backup in a new directory named "backup_YYYYMMDD_HHMMSS"
# 4. Prints a summary of how many files were backed up
# 
# Usage: ./Q7_FileOperations_Backup.sh /path/to/directory

# Your code here:
if [ $# -eq 0 ]; then
    echo "Usage: $0 <directory_path>"
    exit 1
fi

source_dir="$1"

if [ ! -d "$source_dir" ]; then
    echo "Error: Directory '$source_dir' does not exist"
    exit 1
fi

# Create backup directory with timestamp
backup_dir="backup_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$backup_dir"

# Counter for backed up files
count=0

# Find and copy all .txt files
for file in "$source_dir"/*.txt; do
    if [ -f "$file" ]; then
        cp "$file" "$backup_dir/"
        ((count++))
    fi
done

echo "Backup completed!"
echo "Directory: $backup_dir"
echo "Files backed up: $count"
