import test from 'ava';
// const request = require('supertest');
import request from 'supertest';
import Server from '../../libs/Server';

const app = Server.bootstrap().app;

test.beforeEach(t => {
    t.context.user = "Worlds";
});

test('Authenticate user', async (t) => {
    await request(app)
        .get('/auth')
        .expect(200)
        .then(response => response.body)
        .then(data => t.is(data.hello, t.context.user));
});

test('Request new token', async (t) => {

});

