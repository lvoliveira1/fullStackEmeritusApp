import { Arg, Mutation, Resolver } from "type-graphql";
import { redis } from '../../redis';
import { confirmUserEmailPrefix } from "../constants/redisPrefixes";
import { User } from './../../entity/User';

@Resolver()
export class ConfirmUserEmailResolver {
    @Mutation(() => Boolean)
    async confirmUserEmail(@Arg("token") token: string): Promise<boolean> {
        const prefixedToken = `${confirmUserEmailPrefix}${token}`

        const userId = await redis.get(prefixedToken);

        if (!userId) {
            return false;
        }

        await User.update(userId, { confirmed: true });
        await redis.del(prefixedToken);

        return true;
    }
}
