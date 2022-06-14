import { getBuiltSchema } from './utils/getBuiltSchema';
import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
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
        context: ({ req, res }) => ({ req, res }),
    });

    const app = Express();

    const RedisStore = connectRedis(session);

    // app.set('trust proxy', process.env.NODE_ENV === 'production')
    app.set('trust proxy', 1)

    const cookie = {
        httpOnly: false,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
        sameSite: 'none' as any,
    };

    app.use(
        session({
            store: new RedisStore({ client: redis }),
            name: "qid",
            secret: "aslkdfjoiq12312",
            resave: false,
            saveUninitialized: false,
            cookie,
        })
    );

    await apolloServer.start();

    const cors = {
        credentials: true,
        origin: [
            "https://studio.apollographql.com",
            "https://bad-bad-bank-bank.netlify.app",
            'https://localhost:3000',
            process.env?.FE_APP_URI || '',
        ],
    };

    apolloServer.applyMiddleware({ app, cors });

    app.listen(process.env?.PORT || 4000, () => {
        console.log(`
            🚀  Server is ready at port: ${process.env.PORT}
            📭  Query at https://studio.apollographql.com
        `);
    });
};

main();
