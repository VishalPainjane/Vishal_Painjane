# Use Node.js 20 as the base image
FROM node:20-alpine AS base

# 1. Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
# Setting the working directory to the project name
WORKDIR /vishal_painjane

# Copy package files from the 'web' directory to the root of the workdir
COPY web/package.json web/package-lock.json ./
RUN npm ci

# 2. Rebuild the source code only when needed
FROM base AS builder
WORKDIR /vishal_painjane
COPY --from=deps /vishal_painjane/node_modules ./node_modules
# Copy all content from the 'web' directory
COPY web/ .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# 3. Production image, copy all the files and run next
FROM base AS runner
WORKDIR /vishal_painjane

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /vishal_painjane/public ./public

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /vishal_painjane/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /vishal_painjane/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# The standalone build creates a server.js file
CMD ["node", "server.js"]