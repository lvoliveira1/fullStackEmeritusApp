import { GraphQLError } from 'graphql';

export const toErrorMap = (errors: GraphQLError[]) => {
    const errorMap: any = {};
    errors.forEach(({ extensions: { exception }}) => {
        (exception as any).validationErrors.forEach(({ property, constraints }: any) => {
            return errorMap[property] = Object.values(constraints)[0];
        });
    });

    return errorMap
}
