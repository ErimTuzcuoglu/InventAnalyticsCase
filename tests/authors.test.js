import { request } from './global/jest.setup';

const testAuthor = {
    name: 'John Doe',
    country: 'USA',
    birthDate: '1990-01-01'
}

describe('Authors API Endpoints', () => {
    test('POST /api/authors - Add New Author', async () => {
        const response = await request.post('/api/authors').send(testAuthor);
        expect(response.status).toBe(201);
        expect(response.body.data.name).toBe(testAuthor.name);
        testAuthor._id = response.body.data._id;
    });

    test('GET /api/authors - Get All Authors', async () => {
        const response = await request.get('/api/authors');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
    });

    test('GET /api/authors/:id - Get A Author', async () => {
        const response = await request.get(`/api/authors/${testAuthor._id}`);
        expect(response.status).toBe(200);
        expect(response.body.data._id).toBe(testAuthor._id);
    });

    test('PUT /api/authors/:id - Update A Author', async () => {
        const updatedAuthor = {
            name: 'John Doe The Updated',
            country: 'Turkey',
            birthDate: '1996-10-16'
        };

        const response = await request.put(`/api/authors/${testAuthor._id}`).send(updatedAuthor);
        expect(response.status).toBe(200);
        expect(response.body.data.name).toBe(updatedAuthor.name);
    });

    test('DELETE /api/authors/:id - Delete A Author', async () => {
        const response = await request.delete(`/api/authors/${testAuthor._id}`);
        expect(response.status).toBe(200);
    });
});
