import faker from 'faker';
import { DataSource } from 'typeorm';
import { graphqlCall } from './../../test-utils/graphqlCall';
import { testConnection } from './../../test-utils/testConnection';

let dataSource: DataSource;

beforeAll(async () => {
    dataSource = await testConnection();
});

afterAll(async () => {
    await dataSource.destroy();
});

const mutation = `
    mutation Register($data: RegisterInput!) {
        register(data: $data) {
            id
            firstName
            lastName
            name
            email
        }
    }
`;

describe('RegisterResolver', () => {
    it('creates user', async () => {
        const user = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        };

        console.log({ user });

        const { data } = await graphqlCall({
            source: mutation,
            variableValues: { data: user },
        });

        expect(data).toMatchObject({
            register: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password,
            }
        });

        console.log({ data });

        process.exit();
    });
});
