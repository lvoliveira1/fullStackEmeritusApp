import { Query, Resolver } from "type-graphql";
import { User } from './../../entity/User';
// import { isAuthenticated } from './../middleware/isAuthenticated';

@Resolver()
export class UserResolver {
    // @UseMiddleware(isAuthenticated)
    @Query(() => [User], { nullable: true })
    async users(
        // @Arg("limit") limit: number,
        // @Arg("limit") skip: number
    ): Promise<User[] | null> {
        return User.find({});
    }
}
