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
                    console.log(error);
                    return reject(false)
                }

                console.log("cleaning");
                context.res.clearCookie('qid');

                return resolve(true);
            })
        );
    }
}
