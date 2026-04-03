#!/usr/bin/env python3
import subprocess
import os

os.chdir('/vercel/share/v0-project')

# Add all changes
subprocess.run(['git', 'add', '-A'], check=True)

# Create commit
commit_message = """feat: Complete MSC Media Pro v2 dashboard with Custom Toolz, all components, and professional polish

- Integrated all 24 MSC components from original repo
- Created Custom Toolz section for DiviGear CPT Filterable Module controls
- Fixed all 404 errors by generating missing thumbnails and favicon assets
- Added toast notification system for user feedback
- Updated all page metadata and footers to v2 branding
- Fixed placeholder links and broken code snippets
- Added professional polish with image loading optimization
- Fixed hydration warnings and theme configuration
- All routes properly wired and navigation working
- Studio dark theme with green accents applied throughout"""

subprocess.run(['git', 'commit', '-m', commit_message], check=True)

# Push to branch
subprocess.run(['git', 'push', 'origin', 'v0/jonbeatz-7549-d113c644'], check=True)

print("✓ Successfully committed and pushed to GitHub!")
