import { Book, BorrowedBook, User } from './models';

export async function seedDatabase() {
    try {
        const userCount = await User.count();
        const bookCount = await Book.count();
        const borrowedBookCount = await BorrowedBook.count();

        if (userCount < 1 && bookCount < 1 && borrowedBookCount < 1) {
            /* #region  Seed users */
            const users = await User.bulkCreate([
                { name: 'Alice Johnson' },
                { name: 'Bob Smith' },
                { name: 'Catherine Brown' },
            ]);
            /* #endregion */

            /* #region  Seed books */
            const books = await Book.bulkCreate([
                { name: 'The Great Gatsby' },
                { name: '1984' },
                { name: 'To Kill a Mockingbird' },
            ]);
            /* #endregion */

            /* #region  Seed borrowedBooks */
            await BorrowedBook.bulkCreate([
                { UserId: users[0].id, BookId: books[0].id, score: 4.5, isReturned: true },
                { UserId: users[0].id, BookId: books[1].id, score: 5, isReturned: false },
                { UserId: users[1].id, BookId: books[0].id, score: 3.5, isReturned: true },
            ]);
            /* #endregion */

            console.log('Seed Completed!');
        } else {
            console.log('Database already seeded. No action taken.');
        }
    } catch (error) {
        console.error('Error While Seeding DB:', error);
    }
}
