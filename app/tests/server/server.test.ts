import test from 'ava';
// const request = require('supertest');
import request from 'supertest';
import Server from '../../libs/Server';

const app = Server.bootstrap().app;


test('simple test', (t) => {
    t.pass();
});


test('Server init test', async (t) => {
    await request(app)
        .get('/')
        .expect(200)
        .then(response => response.body)
        .then(data => t.is(data.hello, 'World'));
});

