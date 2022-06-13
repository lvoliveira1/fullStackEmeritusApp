import bcrypt from 'bcryptjs';
import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { User } from '../../entity/User';
import { RegisterInput } from '../user/register/RegisterInput';
import { createConfirmationUrl } from '../utils/createConfirmationUrl';
import { sendEmail } from '../utils/sendEmail';
import { BankAccount } from './../../entity/BankAccount';
import { isAuthenticated } from './../middleware/isAuthenticated';

@Resolver()
export class BankAccountResolver {
    @UseMiddleware(isAuthenticated)
    @Query(() => [BankAccount], { nullable: true })
    async bankAccounts(): Promise<BankAccount[] | null> {
        return BankAccount.find({});
    }

    @UseMiddleware(isAuthenticated)
    @Query(() => BankAccount, { nullable: true })
    async bankAccount(
        @Arg('bankAccountId') bankAccountId: number
    ): Promise<BankAccount | null> {
        return BankAccount.findOne(bankAccountId as any);
    }

    @Mutation(() => BankAccount)
    async bankAccountCreation(
        @Arg("data") { firstName, lastName, email, password }: RegisterInput
    ): Promise<BankAccount> {
        const hashedPass = await bcrypt.hash(password, 12);

        const user = await User
            .create({
                firstName,
                lastName,
                email,
                password: hashedPass
            })
            .save();

        await sendEmail(
            email,
            await createConfirmationUrl(user.id as any)
        );

        return BankAccount
            .create({ userId: user.id })
            .save();
    }
}
