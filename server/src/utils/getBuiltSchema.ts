import resolvers from '../resolvers';
import { buildSchema } from "type-graphql";

export const getBuiltSchema = () => {
    return buildSchema({
        resolvers,
        authChecker: (
            { 
                // root,
                // args,
                context,
                // info
            },
            // roles
        ) => {
            return !!context.req.session.userId;
        },
    })
}
