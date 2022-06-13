import { getBuiltSchema } from './utils/getBuiltSchema';
// import { User } from './entity/User';
import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
// import cors from "cors";
import Express from "express";
import session from "express-session";
import "reflect-metadata";
import { AppDataSource } from './data-source';
import { redis } from './redis';

const main = async () => {
    await AppDataSource.initialize();

    const schema = await getBuiltSchema();

    const apolloServer = new ApolloServer({ 
        schema,
        csrfPrevention: true,
        // plugins: [ApolloServerPluginInlineTrace()],
        context: ({ req, res }) => {
            // // Note: This example uses the `req` argument to access headers,
            // // but the arguments received by `context` vary by integration.
            // // This means they vary for Express, Koa, Lambda, etc.
            // //
            // // To find out the correct arguments for a specific integration,
            // // see https://www.apollographql.com/docs/apollo-server/api/apollo-server/#middleware-specific-context-fields
         
            // // Get the user token from the headers.
            // const token = req.headers.authorization || '';
         
            // // Try to retrieve a user with the token
            // const user = getUser(token);
         
            // // Add the user to the context
            // return { user };

            // console.log({ req, res });

            return { req, res };
          },
    });

    const app = Express();

    const RedisStore = connectRedis(session);

    // app.use(
    //     cors({
    //         credentials: true,
    //         origin: [
    //             "http://localhost:3000",
    //             "https://studio.apollographql.com",
    //         ]
    //         // origin: "*"
    //     })
    // );

    app.set('trust proxy', process.env.NODE_ENV !== 'production')

    app.use(
        session({
            store: new RedisStore({ client: redis }),
            name: "qid",
            secret: "aslkdfjoiq12312",
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: false,
                // secure: process.env.NODE_ENV === "production",
                secure: true,
                maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
                sameSite: 'none',
            }
        })
    );

    await apolloServer.start();

    apolloServer.applyMiddleware({
        app,
        cors: {
            credentials: true,
            origin: [
                "http://localhost:3000",
                "https://studio.apollographql.com"
            ],
        }
    });

    app.listen(process.env?.PORT || 4000, () => {
        console.log(`
            🚀  Server is ready at ${process.env.PORT}/${process.env.PORT}
            📭  Query at https://studio.apollographql.com/dev
        `);
    });
};

main();