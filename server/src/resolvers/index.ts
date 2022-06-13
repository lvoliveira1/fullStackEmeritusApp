import { NonEmptyArray } from 'type-graphql';
import { BankAccountResolver } from './../modules/bank-account/BankAccountResolver';
import { ChangePasswordResolver } from './../modules/user/ChangePasswordResolver';
import { ConfirmUserEmailResolver } from './../modules/user/ConfirmUserEmailResolver';
import { ForgotPasswordResolver } from './../modules/user/ForgotPasswordResolver';
import { LoginResolver } from './../modules/user/LoginResolver';
import { LogoutResolver } from './../modules/user/LogoutResolver';
import { MeResolver } from './../modules/user/MeResolver';
import { RegisterResolver } from './../modules/user/RegisterResolver';
import { UserResolver } from './../modules/user/UserResolver';

const resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
    BankAccountResolver,
    ChangePasswordResolver,
    ConfirmUserEmailResolver,
    ForgotPasswordResolver,
    LoginResolver,
    LogoutResolver,
    MeResolver,
    RegisterResolver,
    UserResolver,
];

export default resolvers;
