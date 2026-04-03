#!/bin/bash

# Clone the original repo into a temporary directory
TEMP_DIR="/tmp/v0-msc-media-pro-plugin"
CURRENT_DIR="/vercel/share/v0-project"

# Remove temp dir if it exists
rm -rf "$TEMP_DIR"

# Clone the original repository
echo "Cloning original repository..."
git clone https://github.com/jonbeatz/v0-msc-media-pro-plugin.git "$TEMP_DIR"

if [ $? -ne 0 ]; then
    echo "Error: Failed to clone repository"
    exit 1
fi

echo "Copying files from original repo..."

# Copy all files from the temp directory to the current project
# Excluding .git directory
cp -r "$TEMP_DIR"/* "$CURRENT_DIR/" 2>/dev/null || true
cp -r "$TEMP_DIR"/.[!.]* "$CURRENT_DIR"/ 2>/dev/null || true

# Make sure we don't copy .git
rm -rf "$CURRENT_DIR/.git" 2>/dev/null || true

# Clean up temp directory
rm -rf "$TEMP_DIR"

echo "Files merged successfully!"
echo "All files from v0-msc-media-pro-plugin have been copied to this project."
