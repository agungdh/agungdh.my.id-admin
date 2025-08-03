# Stage 1: Build Angular + SSR
FROM node:22 AS builder

WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app source
COPY . .

# Build browser and server (Angular Universal)
RUN npm run build

# --- Stage 2: Serve with Nginx ---
FROM nginx:alpine

# hapus default nginx content
RUN rm -rf /usr/share/nginx/html/*

# salin hasil build dari stage “build”
COPY --from=builder /app/dist/browser /usr/share/nginx/html

# jika perlu custom config, salin file nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# expose port (optional, default Nginx listen 80)
EXPOSE 80

# jalankan nginx di foreground
CMD ["nginx", "-g", "daemon off;"]
