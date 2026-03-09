#!/bin/bash

# Question 9: Process Management - System Monitor
# Difficulty: Advanced
# 
# Task: Write a script that monitors system resources and:
# 1. Displays CPU usage
# 2. Displays memory usage
# 3. Displays disk usage
# 4. Shows top 5 processes by memory usage
# 5. Allows continuous monitoring (refresh every 5 seconds) or one-time check
# 
# Usage: 
#   ./Q9_ProcessManagement_Monitor.sh          # One-time check
#   ./Q9_ProcessManagement_Monitor.sh -c       # Continuous monitoring

# Your code here:
display_info() {
    clear
    echo "================================"
    echo "   SYSTEM RESOURCE MONITOR"
    echo "================================"
    echo "Time: $(date '+%Y-%m-%d %H:%M:%S')"
    echo "================================"
    echo
    
    echo "--- CPU Usage ---"
    if command -v mpstat &> /dev/null; then
        mpstat 1 1 | awk '/Average/ {print "CPU Usage: " 100-$NF "%"}'
    else
        top -bn1 | grep "Cpu(s)" | sed "s/.*, *\([0-9.]*\)%* id.*/\1/" | awk '{print "CPU Usage: " 100-$1 "%"}'
    fi
    echo
    
    echo "--- Memory Usage ---"
    free -h | awk 'NR==2{printf "Memory: %s / %s (%.2f%%)\n", $3, $2, $3*100/$2}'
    echo
    
    echo "--- Disk Usage ---"
    df -h / | awk 'NR==2{printf "Disk: %s / %s (%s)\n", $3, $2, $5}'
    echo
    
    echo "--- Top 5 Processes by Memory ---"
    ps aux --sort=-%mem | awk 'NR<=6{printf "%-10s %-8s %-6s %s\n", $1, $2, $4"%", $11}'
    echo
    
    if [ "$continuous" = true ]; then
        echo "Press Ctrl+C to stop monitoring..."
    fi
}

# Check for continuous mode
continuous=false
if [ "$1" = "-c" ]; then
    continuous=true
fi

if [ "$continuous" = true ]; then
    # Continuous monitoring
    while true; do
        display_info
        sleep 5
    done
else
    # One-time check
    display_info
fi
