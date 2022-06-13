import bcrypt from 'bcryptjs';
import { Arg, Mutation, Resolver } from "type-graphql";
import { User } from './../../entity/User';
import { redis } from './../../redis';
import { forgotPasswordPrefix } from './../constants/redisPrefixes';
import { ChangePasswordInput } from './changePassword/ChangePasswordInput';

@Resolver()
export class ChangePasswordResolver {
    @Mutation(() => User, { nullable: true })
    async changePassword(@Arg("data") { token, password }: ChangePasswordInput): Promise<User | null> {
        const prefixedToken = `${forgotPasswordPrefix}${token}`;

        const userId = await redis.get(prefixedToken);

        if (!userId) {
            return null;
        }

        const user = await User.findOne((userId) as any);

        if (!user) {
            return null;
        }

        await redis.del(prefixedToken);

        user.password = await bcrypt.hash(password, 12);

        return await user.save();
    }
}
