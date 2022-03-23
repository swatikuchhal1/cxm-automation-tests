FROM buildkite/puppeteer:latest
COPY . /app
WORKDIR /app
COPY package.json package.json
COPY package-lock.json package-lock.json
FROM base as test
COPY . .
RUN apk add --no-cache chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
   PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
RUN npm install
CMD npm run test




