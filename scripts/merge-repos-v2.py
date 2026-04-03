import subprocess
import sys
import os

# Try to clone using SSH with authentication
repo_url = "https://github.com/jonbeatz/v0-msc-media-pro-plugin.git"
clone_dir = "/tmp/v0-msc-media-pro-original"
target_dir = "/vercel/share/v0-project"

print("[v0] Attempting to clone with SSH keys...")

try:
    # Try using GitHub CLI if available
    result = subprocess.run(
        ["gh", "repo", "clone", "jonbeatz/v0-msc-media-pro-plugin", clone_dir],
        capture_output=True,
        text=True,
        timeout=30
    )
    if result.returncode != 0:
        raise Exception(f"GitHub CLI failed: {result.stderr}")
    print("[v0] Successfully cloned with GitHub CLI")
except Exception as e:
    print(f"[v0] GitHub CLI not available or failed: {e}")
    print("[v0] Trying HTTPS with git config...")
    
    try:
        # Configure git to use credentials if available
        subprocess.run(["git", "config", "--global", "http.version", "HTTP/1.1"], check=False)
        result = subprocess.run(
            ["git", "clone", repo_url, clone_dir],
            capture_output=True,
            text=True,
            timeout=30,
            env={**os.environ, "GIT_TRACE": "1"}
        )
        if result.returncode != 0:
            print(f"[v0] Clone failed with stderr: {result.stderr}")
            print(f"[v0] Clone failed with stdout: {result.stdout}")
            sys.exit(1)
    except subprocess.TimeoutExpired:
        print("[v0] Clone operation timed out")
        sys.exit(1)
    except Exception as e:
        print(f"[v0] Clone failed: {e}")
        sys.exit(1)

print("[v0] Cloning completed successfully")

# Copy files
import shutil
import pathlib

files_copied = 0
errors = []

if os.path.exists(clone_dir):
    for item in pathlib.Path(clone_dir).rglob("*"):
        if item.is_file():
            # Skip git files
            if ".git" in str(item):
                continue
            
            rel_path = item.relative_to(clone_dir)
            target_path = pathlib.Path(target_dir) / rel_path
            
            try:
                # Create parent directories
                target_path.parent.mkdir(parents=True, exist_ok=True)
                # Copy file
                shutil.copy2(item, target_path)
                files_copied += 1
                print(f"[v0] Copied: {rel_path}")
            except Exception as e:
                errors.append(f"Failed to copy {rel_path}: {e}")
    
    print(f"[v0] Successfully copied {files_copied} files")
    if errors:
        print(f"[v0] Encountered {len(errors)} errors:")
        for error in errors:
            print(f"  - {error}")
else:
    print("[v0] Clone directory not found")
    sys.exit(1)
