/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import 'dotenv/config';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { todoTypeDefs } from '@sass-project/contracts';
import { prisma } from '@sass-project/database';
import express from 'express';
import * as path from 'path';
import { todoResolvers } from './todo.resolvers.js';

const app = express();

const assetsPath =
  process.env.NODE_ENV === 'development'
    ? path.join(process.cwd(), 'apps/backend/src/assets')
    : path.join(__dirname, 'assets');

app.use('/assets', express.static(assetsPath));

const allowedOrigins = new Set(
  (process.env.FRONTEND_ORIGINS ??
    'http://localhost:3000,http://127.0.0.1:3000,http://localhost:4200,http://localhost:8081,http://127.0.0.1:8081')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
);

function isAllowedOrigin(origin: string): boolean {
  if (allowedOrigins.has(origin)) {
    return true;
  }

  if (process.env.NODE_ENV === 'production') {
    return false;
  }

  try {
    const { hostname, protocol } = new URL(origin);
    return (
      protocol === 'http:' &&
      (hostname === 'localhost' ||
        hostname === '127.0.0.1' ||
        hostname === '[::1]')
    );
  } catch {
    return false;
  }
}

app.use((req, res, next) => {
  const origin = req.get('origin');

  if (origin && !isAllowedOrigin(origin)) {
    res.status(403).send('Origin is not allowed.');
    return;
  }

  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }

  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');

  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }

  next();
});

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to the todo API!' });
});

const graphqlServer = new ApolloServer({
  typeDefs: todoTypeDefs,
  resolvers: todoResolvers,
  introspection: process.env.NODE_ENV !== 'production',
});

async function startServer() {
  await graphqlServer.start();

  app.use(
    '/graphql',
    express.json(),
    expressMiddleware(graphqlServer, {
      context: async () => ({ prisma }),
    })
  );

  const port = Number(process.env.PORT ?? 3333);
  const server = app.listen(port, () => {
    console.log(`GraphQL API ready at http://localhost:${port}/graphql`);
  });

  server.on('error', (error) => {
    console.error('Backend server failed:', error);
    process.exitCode = 1;
  });
}

startServer().catch((error: unknown) => {
  console.error('Backend failed to start:', error);
  process.exitCode = 1;
});
