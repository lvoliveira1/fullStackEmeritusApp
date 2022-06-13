import { ObjectId } from "mongodb";
import { v4 } from "uuid";
import { redis } from "../../redis";
import { confirmUserEmailPrefix } from "../constants/redisPrefixes";

export const createConfirmationUrl = async (userId: ObjectId) => {
    const token = v4();

    await redis.set(`${confirmUserEmailPrefix}${token}`, userId.toHexString(), "EX", 60 * 60 * 24); // 1 day expiration

    return `${process.env.FE_APP_URI}/user/confirm/${token}`;
};