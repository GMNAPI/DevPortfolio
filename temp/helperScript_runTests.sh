#!/bin/bash

# Helper Script: Test Runner
# Description: Execute different types of tests for the PersonalWeb project
# Usage: Run this script from the project root directory

echo "==================================="
echo "PersonalWeb - Test Runner Helper"
echo "==================================="
echo ""

# Function to display menu
show_menu() {
    echo "Select test mode:"
    echo "1) Run all tests (watch mode)"
    echo "2) Run tests once (CI mode)"
    echo "3) Run tests with coverage"
    echo "4) Run tests with UI"
    echo "5) Run specific test file"
    echo "6) Exit"
    echo ""
    read -p "Enter choice [1-6]: " choice
}

# Main logic
show_menu

case $choice in
    1)
        echo "Running tests in watch mode..."
        npm run test
        ;;
    2)
        echo "Running tests once (CI mode)..."
        npm run test:run
        ;;
    3)
        echo "Running tests with coverage..."
        npm run test:coverage
        echo ""
        echo "Coverage report generated in ./coverage directory"
        ;;
    4)
        echo "Running tests with UI..."
        npm run test:ui
        ;;
    5)
        read -p "Enter test file path (e.g., tests/example/setup.test.ts): " filepath
        echo "Running test: $filepath"
        npx vitest run "$filepath"
        ;;
    6)
        echo "Exiting..."
        exit 0
        ;;
    *)
        echo "Invalid option. Exiting..."
        exit 1
        ;;
esac
