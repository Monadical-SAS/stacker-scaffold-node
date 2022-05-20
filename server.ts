import next from "next";
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

import { typeDefs } from './components/game/api/graphql/schema';
import { resolvers } from './components/game/api/graphql/resolvers';

const port = parseInt(process.env.PORT || "3000", 10);
const wsPort = parseInt(process.env.WS_PORT || "4000", 10);
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const nextJsHttpHandler = nextApp.getRequestHandler()

const schema = makeExecutableSchema({ typeDefs, resolvers });

const GRAPHQL_PATH = "/graphql";

nextApp.prepare().then(async () => {
  const app = express()
  const httpServer = http.createServer(app);

  // https://www.apollographql.com/docs/apollo-server/data/subscriptions
  const wsServer = new WebSocketServer({
    port: wsPort,
    path: `${GRAPHQL_PATH}`,
  });

  const wsServerCleanup = useServer({ schema }, wsServer);

  const apolloServer = new ApolloServer({
    schema,
    csrfPrevention: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer }), {
      async serverWillStart() {
        return {
          async drainServer() {
            await wsServerCleanup.dispose();
          },
        };
      },
    },],
  });



  await apolloServer.start();

  app.all(GRAPHQL_PATH, apolloServer.getMiddleware({
    path: GRAPHQL_PATH,
  }));
  app.all('*', nextJsHttpHandler as any); // Types?

  httpServer.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  });
});