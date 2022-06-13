import { Arg, Mutation, Resolver } from "type-graphql";
import { changePasswordUrl } from "../utils/changePasswordUrl";
import { sendEmail } from "../utils/sendEmail";
import { User } from './../../entity/User';

@Resolver()
export class ForgotPasswordResolver {
    @Mutation(() => Boolean)
    async forgotPassword(@Arg("email") email: string): Promise<boolean> {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return true;
        }

        await sendEmail(email, await changePasswordUrl(user.id));

        return true;
    }
}
