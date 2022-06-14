import { BankAccount } from './../../entity/BankAccount';
import bcrypt from 'bcryptjs';
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { User } from './../../entity/User';
import { MyContext } from './../../types/MyContext';
import { ObjectId } from 'mongodb';

@Resolver(User)
export class LoginResolver {
    @Mutation(() => BankAccount, { nullable: true })
    async login(
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Ctx() context: MyContext,
    ): Promise<BankAccount | null> {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return null;
        }

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
            return null;
        }

        if (!user.confirmed) {
            return null;
        }

        context.req.session.userId = user.id.toHexString();

        return BankAccount.findOne({ where: { userId: new ObjectId(user.id) } } as any);
    }
}
