import bcrypt from 'bcryptjs';
import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { User } from '../../entity/User';
import { RegisterInput } from '../user/register/RegisterInput';
import { BankAccount } from '../../entity/BankAccount';
import { isAuthenticated } from '../middleware/isAuthenticated';
import { OperatePayloaInput } from './OperateInput';

@Resolver()
export class BankAccountResolver {
    @UseMiddleware(isAuthenticated)
    @Query(() => BankAccount, { nullable: true })
    async bankAccount(
        @Arg('bankAccountId') bankAccountId: string
    ): Promise<BankAccount | null> {
        return BankAccount.findOne(bankAccountId as any);
    }

    @Mutation(() => BankAccount)
    async register(
        @Arg("data") { firstName, lastName, email, password }: RegisterInput
    ): Promise<BankAccount> {
        const hashedPass = await bcrypt.hash(password, 12);

        const user = await User
            .create({
                firstName,
                lastName,
                email,
                password: hashedPass,
                confirmed: true,
            })
            .save();

        return BankAccount
            .create({ userId: user.id })
            .save();
    }

    @Mutation(() => BankAccount)
    async operate(
        @Arg('bankAccountId') bankAccountId: string,
        @Arg("payload") payload: OperatePayloaInput
    ): Promise<BankAccount> {
        const bankAccount = await BankAccount.findOne(bankAccountId as any);

        if (!bankAccount) {
            throw new Error('Bank Account not found');
        }

        const lastStatment = bankAccount.statments[bankAccount?.statments.length - 1];

        bankAccount.statments.push({
            ...payload,
            balance: lastStatment.balance + (payload.amount * (payload.operationType === 'withdraw' ? -1 : 1)),
        })

        return bankAccount.save();
    }
}
