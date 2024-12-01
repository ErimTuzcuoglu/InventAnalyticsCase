export default function userRepository(repository) {
  const getAll = () => repository.getAll();
  const findById = (id) => repository.findById(id);
  const create = (user) => repository.create(user);
  const borrowBook = (userId, bookId) => repository.borrowBook(userId, bookId);
  const returnBook = (userId, bookId, score) => repository.returnBook(userId, bookId, score);

  return {
    getAll,
    findById,
    create,
    borrowBook,
    returnBook
  };
}
