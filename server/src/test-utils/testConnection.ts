import { DataSource } from "typeorm";

export const testConnection = (dropSchema: boolean = true) => {
    const connection = new DataSource({
        name: "default",
        type: "mongodb",
        url: "mongodb://root:example@mongo:27017",
        synchronize: true,
        dropSchema,
        entities: [
            `${__dirname}/../entity/**/*.ts`
        ]
    });

    return connection.initialize();
};
