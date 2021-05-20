// server/main.ts

module.exports = `import { Server } from 'http';
import { NextApiHandler } from 'next';

import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';

import { AppModule } from './app.module';

export module Backend {
  let app: INestApplication;

  export async function getApp() {
    if (!app) {
      app = await NestFactory.create(AppModule);
      app.setGlobalPrefix("api");

      await app.init();
    }

    return app;
  }

  export async function getNestRequestHandler() {
    const app = await getApp();
    const server: Server = app.getHttpServer();
    const [requestHandler] = server.listeners("request") as NextApiHandler[];
    return requestHandler;
  }
}
`
