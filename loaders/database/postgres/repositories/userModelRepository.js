import { Book, BorrowedBook, User } from '../models';

export default function userModelRepository() {
    const getAll = async () => {
        const users = await User.findAll();
        return users;
    };

    const findById = async (id) => {
        const user = await User.findByPk(id, {
            include: [
                {
                    model: Book,
                    as: 'books',
                    through: { attributes: ['score', 'isReturned'] },
                },
            ],
        });

        if (!user) {
            throw new Error('User not found');
        }

        const books = user.dataValues.books.reduce(
            (acc, book) => {
                if (book.BorrowedBooks.dataValues.isReturned) {
                    acc.past.push({
                        name: book.name,
                        userScore: book.BorrowedBooks.dataValues.score,
                    });
                } else {
                    acc.present.push({
                        name: book.name,
                    });
                }
                return acc;
            },
            { past: [], present: [] }
        );
        user.dataValues.books = books;
        user.books = books;

        return user;
    };

    const create = async ({ name }) => {
        await User.create({ name });
        return;
    };

    const borrowBook = async (UserId, BookId) => {
        const existingBorrow = await BorrowedBook.findOne({
            where: { UserId, BookId },
        });

        if (existingBorrow && existingBorrow.score === -1) {
            throw new Error('This book is already borrowed by this user');
        }

        await BorrowedBook.create({ UserId, BookId });
        return;
    };

    const returnBook = async (UserId, BookId, score) => {
        const borrowRecord = await BorrowedBook.findOne({
            where: { UserId, BookId, score: -1 },
        });

        if (!borrowRecord) {
            throw new Error('Borrow record not found');
        }

        borrowRecord.score = score;
        borrowRecord.isReturned = true;
        await borrowRecord.save();
        return;
    };

    return {
        getAll,
        findById,
        create,
        borrowBook,
        returnBook
    };
}
