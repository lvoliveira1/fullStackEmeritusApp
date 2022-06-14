import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type BankAccount = {
  __typename?: 'BankAccount';
  id: Scalars['ID'];
  statments: Array<BankAccountStatment>;
  user?: Maybe<User>;
  userId: Scalars['ID'];
};

export type BankAccountStatment = {
  __typename?: 'BankAccountStatment';
  amount: Scalars['Float'];
  balance: Scalars['Float'];
  description: Scalars['String'];
  operationType: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login?: Maybe<BankAccount>;
  logout: Scalars['Boolean'];
  operate: BankAccount;
  register: BankAccount;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationOperateArgs = {
  bankAccountId: Scalars['String'];
  payload: OperatePayloaInput;
};


export type MutationRegisterArgs = {
  data: RegisterInput;
};

export type OperatePayloaInput = {
  amount: Scalars['Float'];
  description: Scalars['String'];
  operationType: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  bankAccount?: Maybe<BankAccount>;
  me?: Maybe<BankAccount>;
};


export type QueryBankAccountArgs = {
  bankAccountId: Scalars['String'];
};

export type RegisterInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  name: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'BankAccount', id: string, userId: string, user?: { __typename?: 'User', id: string, firstName: string, lastName: string, name: string, email: string } | null, statments: Array<{ __typename?: 'BankAccountStatment', operationType: string, amount: number, description: string, balance: number }> } | null };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type OperateMutationVariables = Exact<{
  bankAccountId: Scalars['String'];
  payload: OperatePayloaInput;
}>;


export type OperateMutation = { __typename?: 'Mutation', operate: { __typename?: 'BankAccount', id: string, userId: string, user?: { __typename?: 'User', id: string, firstName: string, lastName: string, name: string, email: string } | null, statments: Array<{ __typename?: 'BankAccountStatment', operationType: string, amount: number, description: string, balance: number }> } };

export type RegisterMutationVariables = Exact<{
  data: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'BankAccount', id: string, userId: string, user?: { __typename?: 'User', id: string, firstName: string, lastName: string, name: string, email: string } | null, statments: Array<{ __typename?: 'BankAccountStatment', operationType: string, amount: number, description: string }> } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'BankAccount', id: string, userId: string, user?: { __typename?: 'User', id: string, firstName: string, lastName: string, name: string, email: string } | null, statments: Array<{ __typename?: 'BankAccountStatment', operationType: string, amount: number, description: string, balance: number }> } | null };


export const LoginDocument = gql`
    mutation Login($password: String!, $email: String!) {
  login(password: $password, email: $email) {
    id
    userId
    user {
      id
      firstName
      lastName
      name
      email
    }
    statments {
      operationType
      amount
      description
      balance
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const OperateDocument = gql`
    mutation Operate($bankAccountId: String!, $payload: OperatePayloaInput!) {
  operate(bankAccountId: $bankAccountId, payload: $payload) {
    id
    userId
    user {
      id
      firstName
      lastName
      name
      email
    }
    statments {
      operationType
      amount
      description
      balance
    }
  }
}
    `;

export function useOperateMutation() {
  return Urql.useMutation<OperateMutation, OperateMutationVariables>(OperateDocument);
};
export const RegisterDocument = gql`
    mutation Register($data: RegisterInput!) {
  register(data: $data) {
    id
    userId
    user {
      id
      firstName
      lastName
      name
      email
    }
    statments {
      operationType
      amount
      description
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    id
    userId
    user {
      id
      firstName
      lastName
      name
      email
    }
    statments {
      operationType
      amount
      description
      balance
    }
  }
}
    `;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};