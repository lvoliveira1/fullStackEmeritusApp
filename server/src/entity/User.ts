import { Entity, ObjectIdColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, ID, Root } from "type-graphql";
import { ObjectId } from "mongodb";

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field(() => ID)
    @ObjectIdColumn()
    id: ObjectId;

    @Field()
    @Column()
    firstName: string;

    @Field()
    @Column()
    lastName: string;

    @Field()
    name(@Root() { firstName, lastName }: User): string {
        return `${firstName} ${lastName}`;
    }

    @Field()
    @Column("text", { unique: true })
    email: string;

    @Column()
    password: string;

    @Column('boolean', { default: false })
    confirmed: boolean = false;
}