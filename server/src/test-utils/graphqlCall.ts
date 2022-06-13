import { getBuiltSchema } from './../utils/getBuiltSchema';
import { graphql, GraphQLSchema } from "graphql";
import { Maybe } from 'type-graphql';

interface Options {
    // contextValue?: {
    //     req?: { [key: string]: any },
    //     res?: { [key: string]: any },
    // },
    source: string;
    variableValues?: Maybe<{
        [key: string]: any;
    }>;
}

let schema: GraphQLSchema;

export const graphqlCall = async ({ source, variableValues }: Options) => {
    if (!schema) {
        schema = await getBuiltSchema();
    }

    return graphql({ schema, source, variableValues });
}
