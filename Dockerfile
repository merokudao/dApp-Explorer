FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN  npm install

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_WC_PROJECT_ID
ENV NEXT_PUBLIC_WC_PROJECT_ID=$NEXT_PUBLIC_WC_PROJECT_ID

ARG API_HOST
ENV API_HOST=$API_HOST

ARG NEXT_PUBLIC_API_HOST
ENV NEXT_PUBLIC_API_HOST=$NEXT_PUBLIC_API_HOST

ARG NEXT_PUBLIC_MEROKU_API_KEY
ENV NEXT_PUBLIC_MEROKU_API_KEY=$NEXT_PUBLIC_MEROKU_API_KEY

ARG API_PATH
ENV API_PATH=$API_PATH

ARG API_VERSION
ENV API_VERSION=$API_VERSION

ARG NEXT_PUBLIC_HOST_PATH
ENV NEXT_PUBLIC_HOST_PATH=$NEXT_PUBLIC_HOST_PATH

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "run", "start"]