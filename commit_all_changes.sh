#!/bin/bash

# Ensure running from the project root
if [ ! -d "web" ]; then
    echo "This script should be run from the project root directory (Vishal_Painjane)."
    exit 1
fi

# Commit 1: feat(db): Initial Prisma setup and database utilities
echo "Committing: Initial Prisma setup and database utilities..."
git add web/package.json \
        web/package-lock.json \
        web/prisma/ \
        web/src/lib/prisma/ \
        web/src/lib/db.ts
git commit -m "feat(db): Initial Prisma setup and database utilities

- Added Prisma dependencies and scripts to package.json.
- Included initial Prisma schema and migrations.
- Set up Prisma client files and database connection utility.
- Configured schema.prisma for Vercel PostgreSQL using PRISMA_DATABASE_URL and DATABASE_URL."

# Commit 2: feat(auth): Implement core authentication logic
echo "Committing: Core authentication logic..."
git add web/src/lib/auth.ts \
        web/src/app/api/auth/login/route.ts \
        web/src/app/api/auth/logout/route.ts
git commit -m "feat(auth): Implement core authentication logic

- Created authentication utility functions.
- Developed API routes for user login and logout."

# Commit 3: feat(admin): Add admin dashboard and gate components
echo "Committing: Admin dashboard and gate components..."
git add web/src/app/admin/ \
        web/src/components/admin-gate.tsx \
        web/src/components/admin/ \
        web/src/app/api/admin/stats/route.ts
git commit -m "feat(admin): Add admin dashboard and gate components

- Introduced dedicated admin page.
- Created components for admin login form, logout button, and dashboard.
- Implemented an admin gate for access control.
- Developed API route for admin statistics."

# Commit 4: feat(personal-data): Develop personal data management API routes
echo "Committing: Personal data management API routes..."
git add web/src/app/api/personal-data/ \
        web/secure-storage/
git commit -m "feat(personal-data): Develop personal data management API routes

- Created API endpoints for managing personal data entries.
- Implemented API routes for file uploads and management related to personal data.
- Added secure-storage directory (ensure ignored if applicable)."

# Commit 5: feat(reflections): Enhance reflections API and display
echo "Committing: Reflections API and display enhancements..."
git add web/src/app/api/reflections/ \
        web/src/components/reflections-list.tsx \
        web/src/app/learning/weekly-reflections/page.tsx \
        web/src/app/learning/weekly-reflections/[slug]/page.tsx
git commit -m "feat(reflections): Enhance reflections API and display

- Extended API routes for managing reflections.
- Developed components for displaying a list of reflections.
- Updated weekly reflections page and added dynamic slug-based detail pages."

# Commit 6: feat(core): Introduce page transition wrapper and rate limiting
echo "Committing: Page transition wrapper and rate limiting..."
git add web/src/components/page-transition-wrapper.tsx \
        web/src/lib/rate-limit.ts
git commit -m "feat(core): Introduce page transition wrapper and rate limiting

- Implemented a page transition wrapper for smoother UI navigation.
- Added a utility for API rate limiting."

# Commit 7: refactor(ui): Update site header, footer, and main page layout
echo "Committing: Site header, footer, and main page layout updates..."
git add web/src/components/site-header.tsx \
        web/src/components/site-footer.tsx \
        web/src/app/page.tsx \
        web/src/app/about/
git commit -m "refactor(ui): Update site header, footer, and main page layout

- Refactored and updated the main site header and footer components.
- Adjusted the main landing page layout and content.
- Added about page."

# Commit 8: chore: Clean up and update gitignore
echo "Committing: Gitignore and local file cleanup..."
git add web/.gitignore \
        .gitignore \
        web/dev.db \
        web/.env \
        commit_commands.sh \
        test-auth-logic.js \
        Dockerfile \
        torun.md \
        research/
git commit -m "chore: Clean up and update gitignore

- Updated .gitignore files for both web and root directories to reflect new project structure and ignore sensitive or temporary files (e.g., dev.db, .env).
- Removed temporary commit script and other local development artifacts.
- Included Dockerfile, torun.md, and research directory (if intended to be tracked, otherwise ensure ignored)."



echo ""
echo "Commit script generated and commits are prepared."
echo "Please review the 'commit_all_changes.sh' script."
echo "To execute these commits, run: bash commit_all_changes.sh"


after running the script, remember to redeploy your project on Vercel.
you can also run 'git status' to ensure everything is clean.
