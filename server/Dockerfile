FROM node:latest

RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma/

RUN pnpm install --frozen-lockfile

RUN npx prisma generate

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && pnpm run start:dev"]