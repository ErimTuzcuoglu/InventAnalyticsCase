export default function borrowBook(bookDTO) {
    const {
        bookId,
        id,
        userRepository
    } = bookDTO;
    if (!bookId || !id) {
        throw new Error(`Some fields are empty or not found!`);
    }

    return userRepository.borrowBook(parseInt(id), parseInt(bookId));
}
