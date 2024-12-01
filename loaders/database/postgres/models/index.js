import Book from './Book';
import BorrowedBook from './BorrowedBook';
import User from './User';

/* #region  Book -> BorrowedBook */
Book.hasMany(BorrowedBook, {
    foreignKey: 'BookId',
    as: 'borrowedBooks',
});

BorrowedBook.belongsTo(Book, {
    foreignKey: 'BookId',
    as: 'book',
});
/* #endregion */

/* #region  User -> BorrowedBook */
User.hasMany(BorrowedBook, {
    foreignKey: 'UserId',
    as: 'borrowedBooks',
});

BorrowedBook.belongsTo(User, {
    foreignKey: 'UserId',
    as: 'user',
});
/* #endregion */


/* #region  User -> Book */
User.belongsToMany(Book, {
    through: 'BorrowedBooks',
    as: 'books',
});

Book.belongsToMany(User, {
    through: 'BorrowedBooks',
    as: 'users',
});
/* #endregion */

export { Book, BorrowedBook, User };
