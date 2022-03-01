# remix-ui-challenges

A simple set of collected UI challenges, bootstrapped with Remix, Prisma, and Tailwind. This application was heavily influenced by [Remix's Deep Dive tutorial](https://remix.run/docs/en/v1/tutorials/jokes).

## Development

Clone this repository and install this project's dependencies via your favorite package manager:

```sh
npm i
```

From there, run the following to initialize a simple SQLite table:

```sh
## Initialize an SQLite table based on the Models defined within prisma/schema.prisma
npm run db:create

## Insert a handful of sample challenges into the table (feel free to add more)
npm run db:seed

## Spin up an instance of Prisma Studio, which allows you to view and edit the SQLite table
npm run db:view
```

Afterwards, run the following to start your app in development mode.

```sh
npm run dev
```

## Resources

- [Remix Docs](https://remix.run/docs)
- [Prisma Docs](https://www.prisma.io/docs/)
- [Tailwind Docs](https://tailwindcss.com/docs/installation)
