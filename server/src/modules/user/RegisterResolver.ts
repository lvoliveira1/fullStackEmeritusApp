import bcrypt from "bcryptjs";
import { Arg, Mutation, Resolver } from "type-graphql";
// import { sendEmail } from '../utils/sendEmail';
import { User } from './../../entity/User';
// import { createConfirmationUrl } from './../utils/createConfirmationUrl';
import { RegisterInput } from './register/RegisterInput';

@Resolver()
export class RegisterResolver {
    @Mutation(() => User)
    async register(
        @Arg("data") { firstName, lastName, email, password }: RegisterInput
    ): Promise<User> {
        const hashedPass = await bcrypt.hash(password, 12);

        const user = await User
            .create({
                firstName,
                lastName,
                email,
                password: hashedPass,
                confirmed: true
            })
            .save();

        // await sendEmail(
        //     email,
        //     await createConfirmationUrl(user.id as any)
        // );

        return user;
    }
}
