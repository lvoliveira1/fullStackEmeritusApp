import { BankAccount } from './../../entity/BankAccount';
import { MyContext } from './../../types/MyContext';
import { Resolver, Query, Ctx } from "type-graphql";
import { ObjectId } from 'mongodb';

@Resolver()
export class MeResolver {
    @Query(() => BankAccount, { nullable: true })
    async me(@Ctx() context: MyContext): Promise<BankAccount | null> {
        if (!context.req.session.userId) {
            return null;
        }

        return BankAccount.findOne({ where: { userId: new ObjectId(context.req.session.userId) } } as any);
    }
}
