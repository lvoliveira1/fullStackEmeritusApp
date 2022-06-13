import { MyContext } from '../../types/MyContext';
import { MiddlewareFn } from "type-graphql";

export const isAuthenticated: MiddlewareFn<MyContext> = async ({ context: { req: { session } } }, next) => {
    if (!session.userId) {
        throw new Error('User not authenticated');
    }

    return next();
}
