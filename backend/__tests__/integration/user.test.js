import request from 'supertest';
import app from '../../src/app';

import factory from '../util/factories';
import truncate from '../util/truncate';

describe('User', () => {
    beforeEach(async () => {
        await truncate();
    });

    it('should encrypted user password when new user created', async () => {
        const user = await factory.create('User', {
            password: '123456',
        });

        const compareHash = await user.checkPassword('123456');

        expect(compareHash).toBe(true);
    });

    it('should be able to register', async () => {
        const user = await factory.attrs('User');

        const response = await request(app)
            .post('/user/create')
            .send(user);

        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('email');
        expect(response.body).toHaveProperty('provider');
    });

    it('should not be able to regiter with duplicated email', async () => {
        const user = await factory.attrs('User');

        await request(app)
            .post('/user/create')
            .send(user);

        const response = await request(app)
            .post('/user/create')
            .send(user);

        expect(response.status).toBe(400);
    });

    it('should not be able to regiter when schema validation fails', async () => {
        const user = await factory.attrs('User', { email: '1234' });

        const response = await request(app)
            .post('/user/create')
            .send(user);

        expect(response.status).toBe(400);
    });
});
