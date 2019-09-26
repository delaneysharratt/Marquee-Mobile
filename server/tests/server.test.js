let app = require('../server');
let testServer = require('supertest');

describe('test the root path', () => {
  test('should respond with 201 to watch router post', () => {
    testServer(app)
      .post('./api/watch')
      .then(response => {
        expect(response.statusCode).toBe(201);
      });
  });
  test('should respond with 201 to watch router delete', () => {
    testServer(app)
      .delete('./api/watch')
      .then(response => {
        expect(response.statusCode).toBe(201);
      });
  });
  test('should respond with 201 to watch router put', () => {
    testServer(app)
      .put('./api/watch')
      .then(response => {
        expect(response.statusCode).toBe(201);
      });
  });
});

// test('should respond with 201 to watch router post', async () => {
//     let response = await testServer(app)
//         .post('/api/watch')
//         .send({
//             title: 'A Movie',
//             poster: '/123',
//             backdrop: '/456.'
//         });
//     expect(response.statusCode).toBe(201);
// });
