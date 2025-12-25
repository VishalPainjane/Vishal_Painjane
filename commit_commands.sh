#!/bin/bash

# Commit 1: Update package.json for Vercel build process
git add web/package.json
git commit -m "feat(vercel): Add 'prisma migrate deploy' to build script for Vercel

This commit updates the 'build' script in package.json to include 'prisma migrate deploy'
before 'next build', ensuring database migrations are applied during Vercel deployments."

# Commit 2: Configure schema.prisma for Vercel PostgreSQL
git add web/prisma/schema.prisma
git commit -m "refactor(prisma): Use Vercel specific PostgreSQL environment variables

Modified schema.prisma to use POSTGRES_PRISMA_URL for connection pooling and
POSTGRES_URL_NON_POOLING for direct connections (migrations) as recommended by Vercel."

echo "Commit commands prepared. Please review and execute 'bash commit_commands.sh' in your terminal."
