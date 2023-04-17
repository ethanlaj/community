# Build client
FROM --platform=linux/amd64 node:lts AS client-build

WORKDIR /app/client

COPY packages/client/package*.json ./
RUN npm ci

COPY packages/client/ ./
RUN npm run build

# Build api
FROM --platform=linux/amd64 node:lts AS api-build

WORKDIR /app/api

COPY packages/api/package*.json ./
RUN npm ci --only=production

COPY packages/api/ ./

# Final image
FROM --platform=linux/amd64 node:lts

# Client setup
WORKDIR /app/client

COPY --from=client-build /app/client/build ./build
COPY --from=client-build /app/client/package*.json ./

# API setup
WORKDIR /app/api

COPY --from=api-build /app/api/node_modules ./node_modules
COPY --from=api-build /app/api ./

# Expose the ports your apps will run on
EXPOSE 3000
EXPOSE 3001

# Start both applications using concurrently
RUN npm install -g concurrently

CMD ["concurrently", "npm:start --prefix /app/client", "npm:start --prefix /app/api"]
