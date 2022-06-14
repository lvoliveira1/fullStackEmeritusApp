import resolvers from '../resolvers';
import { buildSchema } from "type-graphql";

export const getBuiltSchema = () => {
    return buildSchema({
        resolvers,
        authChecker: ({ context }) => !!context.req.session.userId,
    })
}
