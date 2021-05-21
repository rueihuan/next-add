<h1 align="center">Next Add Nest</h1>

<p align="center">
  <strong>Seamlessly integrating Next.js with Nest.js</strong>
</p>

## Prerequisites

1. Setup a Next.js Project. If you have no idea how to do it, please go to https://nextjs.org/docs

2. Integrate Next.js with Typescript. If you have no idea how to do it, please go to https://nextjs.org/docs/basic-features/typescript

## Installation

```sh
npx next-add-nest
```

PS: You should manually process the files with names similar to _*.bak.1621557880_

## GraphQL Support

In addition to https://docs.nestjs.com/graphql/quick-start, manually append the following:

```ts
// app.module.ts
GraphQLModule.forRoot({
  useGlobalPrefix: true,
}),
```

```ts
// nest-cli.json
"compilerOptions": {
  "plugins": ["@nestjs/graphql/plugin"]
}
```

## To Do 

- [ ] Accept args
- [ ] Add testing library

## References
https://simonknott.de/articles/Integrating-NextJS-with-NestJS.html
