import { MyContext } from './../../types/MyContext';
import { User } from './../../entity/User';
import { Resolver, Query, Ctx } from "type-graphql";

@Resolver()
export class MeResolver {
    @Query(() => User, { nullable: true })
    async me(@Ctx() context: MyContext): Promise<User | null> {
        if (!context.req.session.userId) {
            return null;
        }

        return await User.findOne(context.req.session.userId as any);
    }
}
