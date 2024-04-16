## Development
To test the application you hace to up the DB, here are a .yml docker-compose file whitch start a development db to test, it is necessary to have DockerDesktop running.

1. Build the database
```bash
docker compose up -d
```

2. Init prisma ORM
```bash
npx prisma init
```

3. Clone and rename .env.template to .env

4. Replace the enviroment variables as required in .env file

5. Execute SEED to [create local DB](localhost:3000/api/seed/)

5. Create modules and run the server test

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

migrate is used to update changes every time our models changes
generate is used to get the code to start working with Prisma
## Prisma commands
```bash
npx prisma init
npx prisma migrate dev
npx prisma generate
```