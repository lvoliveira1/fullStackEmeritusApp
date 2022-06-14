import { Field, InputType } from "type-graphql";

@InputType()
export class OperatePayloaInput {
    @Field()
    operationType: string

    @Field()
    amount: number

    @Field()
    description: string
}
