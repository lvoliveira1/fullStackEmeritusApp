import { ObjectId } from "mongodb";
import { v4 } from "uuid";
import { redis } from "../../redis";
import { forgotPasswordPrefix } from "../constants/redisPrefixes";

export const changePasswordUrl = async (userId: ObjectId) => {
    const token = v4();

    await redis.set(`${forgotPasswordPrefix}${token}`, userId.toHexString(), "EX", 60 * 60 * 24); // 1 day expiration

    return `${process.env.FE_APP_URI}/user/change-password/${token}`;
};