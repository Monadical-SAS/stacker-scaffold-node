# 🎮 Side Stacker Game 🎮

Node 17+

## 🗒️ How to install and run tests
The project is mounted with Docker and thus, to install it you should just use basic docker-compose commands.

1. Clone this repository
2. Build the container: `docker-compose build`
3. Run it: `docker-compose up -d`
4. Run migrations (The container must be running): `docker-compose exec --workdir=/app nextjs npx prisma migrate dev`. prisma/games.db file should appear.
5. Run tests (The container must be running): `docker-compose exec --workdir=/app nextjs yarn test_docker`
7. You can run `docker-compose exec nextjs bash` to have a shell inside the container.
9. Then to play it you just have to go to `0.0.0.0:3000` in your browser (Requires the container running)

## Adding frontend packages when running with Docker

After you've installed a frontend package i.e. by adding it to `package.json` or with `yarn add <packagename>`,
it should be automatically updated inside your running Docker container. In case it doesn't you can run make sure it's updated in docker by running `docker-compose exec --workdir=/app frontend yarn install` manually, or just rebuild the container

## Migrations note

Backend uses Prisma to set up a database. 

For manual run,

`npx prisma migrate dev`

or in Docker

`docker-compose exec --workdir=/app nextjs npx prisma migrate dev`

ORM is [Prisma](http://prisma.io).

To add a migration, you could change your data schema in prisma/schema.prisma and run `npx prisma migrate dev` again