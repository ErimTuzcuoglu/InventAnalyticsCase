import connection from '../connection';
import { Book, BorrowedBook } from '../models';

const { sequelize } = connection()

export default function bookModelRepository() {
    const getAll = async () => {
        const books = await Book.findAll();
        return books;
    };

    const findById = async (id) => {
        const book = await Book.findOne({
            where: { id: id },
            attributes: [
                'id',
                'name',
                [sequelize.fn('COALESCE', sequelize.fn('AVG', sequelize.col('borrowedBooks.score')), -1), 'score']
            ],
            include: [
                {
                    model: BorrowedBook,
                    as: 'borrowedBooks',
                    attributes: [
                    ]
                },
            ],
            group: ['Book.id', 'Book.name'],
        });
        if (!book) {
            throw new Error('Book not found');
        }
        return book;
    };

    const create = async (book) => {
        await Book.create(book);
        return;
    };

    return {
        getAll,
        findById,
        create
    };
}
