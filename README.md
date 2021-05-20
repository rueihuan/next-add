# Next-Add-Nest

## Prerequisites

1. Setup a Next.js Project. If you have no idea how to do it, please go to https://nextjs.org/docs

2. Integrate Next.js with Typescript. If you have no idea how to do it, please go to https://nextjs.org/docs/basic-features/typescript

## Installation

```
npx next-add-nest
```

## GraphQL Support

In addition to https://docs.nestjs.com/graphql/quick-start, manually append the following:

```ts
// app.module.ts
GraphQLModule.forRoot({
  useGlobalPrefix: true,
}),
```

```json
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
