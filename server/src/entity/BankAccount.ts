import { ObjectId } from "mongodb";
import { Field, ID, ObjectType, Root } from "type-graphql";
import { BaseEntity, Column, Entity, ObjectIdColumn } from "typeorm";
import { User } from "./User";

@ObjectType()
class BankAccountStatment {
    @Field()
    @Column()
    operationType: string

    @Field()
    @Column()
    amount: number

    @Field()
    @Column()
    description: string

    @Field()
    @Column()
    balance: number
}

@ObjectType()
@Entity()
export class BankAccount extends BaseEntity {
    @Field(() => ID)
    @ObjectIdColumn()
    id: ObjectId;

    @Field(() => ID)
    @Column()
    userId: ObjectId;

    @Field(() => User, { nullable: true })
    async user(@Root() { userId }: BankAccount): Promise<User | null> {
        return User.findOne(userId as any);
    }

    @Field(() => [BankAccountStatment])
    @Column("array")
    statments: BankAccountStatment[] = [{
        operationType: '-',
        amount: 0,
        description: 'Initial Setup',
        balance: 0,
    }];
}
