import { PasswordInput } from './../../shared/PasswordInput';
import { Field, InputType } from "type-graphql";
import { Length, IsEmail } from 'class-validator';
import { IsEmailAlreadyInUse } from "./isEmailAlreadyInUse";

@InputType()
export class RegisterInput extends PasswordInput {
    @Field()
    @Length(1, 255)
    firstName: string;

    @Field()
    @Length(1, 255)
    lastName: string;

    @Field()
    @IsEmail()
    @IsEmailAlreadyInUse({ message: "Email already in use" })
    email: string;
}
