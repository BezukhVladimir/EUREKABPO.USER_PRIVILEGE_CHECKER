const request = require('supertest');
const { start, close } = require('../../main/server/start.js');

describe('Server API Tests', () => {
    let server;

    beforeAll(() => {
        server = start(1337);
    });

    afterAll(() => {
        close();
    });

    it('should handle existing user', async () => {
        // Arrange
        const username = 'user';

        // Act
        const response = await request(server)
            .post('/check')
            .send({ username: username });

        // Assert
        expect(response.status).toBe(200);
        expect(response.text).toContain(`Пользователь ${username} имеет привилегию`);
    });

    it('should handle non-existing user', async () => {
        // Arrange
        const username = 'nonExistingUser';

        // Act
        const response = await request(server)
            .post('/check')
            .send({ username: username });

        // Assert
        expect(response.status).toBe(404);
        expect(response.text).toContain(`Пользователя ${username} нет`);
    });
});
