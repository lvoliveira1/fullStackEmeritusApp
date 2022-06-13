import Redis from "ioredis";

const {
    REDIS_HOST: host = 'redis',
    REDIS_PORT: port = 6379,
    REDIS_USERNAME: username,
    REDIS_PASSWORD: password,
}  = process.env;

export const redis = new Redis({ host, port, username, password } as any);