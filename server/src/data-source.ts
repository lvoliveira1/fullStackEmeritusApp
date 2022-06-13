import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    name: "default",
    type: "mongodb",
    url: process.env.MONGODB_URL,
    synchronize: true,
    logging: false,
    entities: [
        `${__dirname}/entity/**/*.{ts,js}`
    ],
    migrations: [
        `${__dirname}//migration/**/*.{ts,js}`
    ],
    subscribers: [
        `${__dirname}//subscriber/**/*.{ts,js}`
    ],
});
