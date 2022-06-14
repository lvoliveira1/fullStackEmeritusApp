import { Ctx, Mutation, Resolver } from "type-graphql";
import { MyContext } from './../../types/MyContext';

@Resolver(Boolean)
export class LogoutResolver {
    @Mutation(() => Boolean)
    async logout(@Ctx() context: MyContext): Promise<boolean> {
        return new Promise(
            (resolve, reject) => 
                context.req.session.destroy((error: any) => {
                if (error) {
                    return reject(false)
                }

                context.res.clearCookie('qid');

                return resolve(true);
            })
        );
    }
}
