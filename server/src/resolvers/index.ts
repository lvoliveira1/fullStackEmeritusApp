import { NonEmptyArray } from 'type-graphql';
import { BankAccountResolver } from './../modules/bank-account/BankAccountResolver';
import { LoginResolver } from './../modules/user/LoginResolver';
import { LogoutResolver } from './../modules/user/LogoutResolver';
import { MeResolver } from './../modules/user/MeResolver';

const resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
    BankAccountResolver,
    LoginResolver,
    LogoutResolver,
    MeResolver,
];

export default resolvers;
