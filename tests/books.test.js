import { request } from './global/jest.setup';

const testBook = {
    title: 'Test Book',
    authorId: '1233453425453',
    price: 19.99,
    ISBN: '1234567890123',
    language: 'English',
    numberOfPages: 300,
    publisher: 'Test Publisher',
};

const testAuthor = {
    name: 'John Doe',
    country: 'USA',
    birthDate: '1990-01-01'
}

describe('Books API Endpoints', () => {
    test('POST /api/books - Add New Book', async () => {
        const exampleAuthor = await request.post('/api/authors').send(testAuthor);
        const response = await request.post('/api/books').send({ ...testBook, authorId: exampleAuthor.body.data._id });
        expect(response.status).toBe(201);
        expect(response.body.data.title).toBe(testBook.title);
        testBook._id = response.body.data._id;
        testBook.authorId = exampleAuthor.body.data._id;
    });

    test('GET /api/books - Get All Books', async () => {
        const response = await request.get('/api/books');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
    });

    test('GET /api/books/:id - Get A Book', async () => {
        const response = await request.get(`/api/books/${testBook._id}`);
        expect(response.status).toBe(200);
        expect(response.body.data._id).toBe(testBook._id);
    });

    test('PUT /api/books/:id - Update A book', async () => {
        const updatedBook = {
            title: 'Updated Test Book',
            authorId: testBook.authorId,
            price: 29.99,
            ISBN: '1234567890123',
            language: 'English',
            numberOfPages: 350,
            publisher: 'Updated Publisher',
        };

        const response = await request.put(`/api/books/${testBook._id}`).send(updatedBook);
        expect(response.status).toBe(200);
        expect(response.body.data.title).toBe(updatedBook.title);
    });

    test('DELETE /api/books/:id - Delete A Book', async () => {
        const response = await request.delete(`/api/books/${testBook._id}`);
        expect(response.status).toBe(200);
    });
});
