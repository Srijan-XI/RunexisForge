#!/bin/bash

# Question 10: Advanced - Interactive Menu System
# Difficulty: Advanced
# 
# Task: Create an interactive menu-driven system that provides:
# 1. File operations (list, create, delete)
# 2. System information
# 3. User management (list users)
# 4. Network tools (ping test)
# 5. Exit option
# 
# The script should:
# - Display a menu continuously until user exits
# - Handle invalid input gracefully
# - Clear screen between operations for better UX

# Your code here:
show_menu() {
    clear
    echo "================================"
    echo "  BASH INTERACTIVE MENU SYSTEM"
    echo "================================"
    echo "1. File Operations"
    echo "2. System Information"
    echo "3. User Management"
    echo "4. Network Tools"
    echo "5. Exit"
    echo "================================"
    read -p "Enter your choice [1-5]: " choice
}

file_operations() {
    clear
    echo "=== File Operations ==="
    echo "1. List files in current directory"
    echo "2. Create a new file"
    echo "3. Delete a file"
    echo "4. Back to main menu"
    read -p "Enter your choice [1-4]: " file_choice
    
    case $file_choice in
        1)
            echo
            ls -lh
            ;;
        2)
            read -p "Enter filename to create: " filename
            touch "$filename"
            echo "File '$filename' created successfully!"
            ;;
        3)
            read -p "Enter filename to delete: " filename
            if [ -f "$filename" ]; then
                rm "$filename"
                echo "File '$filename' deleted successfully!"
            else
                echo "File '$filename' not found!"
            fi
            ;;
        4)
            return
            ;;
        *)
            echo "Invalid choice!"
            ;;
    esac
    read -p "Press Enter to continue..."
}

system_info() {
    clear
    echo "=== System Information ==="
    echo
    echo "Hostname: $(hostname)"
    echo "Kernel: $(uname -r)"
    echo "OS: $(uname -s)"
    echo "Uptime: $(uptime -p 2>/dev/null || uptime)"
    echo
    echo "Memory Usage:"
    free -h
    echo
    echo "Disk Usage:"
    df -h /
    read -p "Press Enter to continue..."
}

user_management() {
    clear
    echo "=== User Management ==="
    echo
    echo "Currently logged in users:"
    who
    echo
    echo "All system users:"
    cut -d: -f1 /etc/passwd | column
    read -p "Press Enter to continue..."
}

network_tools() {
    clear
    echo "=== Network Tools ==="
    read -p "Enter hostname or IP to ping: " target
    echo
    ping -c 4 "$target"
    read -p "Press Enter to continue..."
}

# Main program loop
while true; do
    show_menu
    
    case $choice in
        1)
            file_operations
            ;;
        2)
            system_info
            ;;
        3)
            user_management
            ;;
        4)
            network_tools
            ;;
        5)
            echo "Thank you for using the Interactive Menu System!"
            echo "Goodbye!"
            exit 0
            ;;
        *)
            echo "Invalid choice! Please select 1-5."
            sleep 2
            ;;
    esac
done
