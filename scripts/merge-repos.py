#!/usr/bin/env python3
import os
import shutil
import subprocess

# Clone the original repo
original_repo = "https://github.com/jonbeatz/v0-msc-media-pro-plugin.git"
temp_dir = "/tmp/v0-msc-media-pro-plugin"
project_dir = "/vercel/share/v0-project"

print("[v0] Cloning original repository...")
if os.path.exists(temp_dir):
    shutil.rmtree(temp_dir)

try:
    subprocess.run(["git", "clone", original_repo, temp_dir], check=True, capture_output=True)
    print("[v0] Clone successful!")
except Exception as e:
    print(f"[v0] Error cloning: {e}")
    exit(1)

# List of files/directories to copy from original repo
items_to_copy = []

# Find all files in the original repo (except node_modules, .git, .next, etc.)
exclude_dirs = {'.git', 'node_modules', '.next', '.env', '.env.local', '.env.*.local', 'dist', 'build', '.turbo', '.vercel', 'pnpm-lock.yaml', 'package-lock.json', 'yarn.lock', 'bun.lockb'}

print("[v0] Scanning original repository...")
for root, dirs, files in os.walk(temp_dir):
    # Remove excluded directories from dirs to skip them
    dirs[:] = [d for d in dirs if d not in exclude_dirs]
    
    for file in files:
        source_path = os.path.join(root, file)
        relative_path = os.path.relpath(source_path, temp_dir)
        
        # Skip excluded files
        if any(excluded in relative_path for excluded in exclude_dirs):
            continue
        
        dest_path = os.path.join(project_dir, relative_path)
        items_to_copy.append((source_path, dest_path))

print(f"[v0] Found {len(items_to_copy)} files to copy")

# Copy all files
copied_count = 0
for source, dest in items_to_copy:
    try:
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        shutil.copy2(source, dest)
        copied_count += 1
    except Exception as e:
        print(f"[v0] Error copying {source}: {e}")

print(f"[v0] Successfully copied {copied_count} files")

# Clean up temp directory
shutil.rmtree(temp_dir)
print("[v0] Merge complete!")
