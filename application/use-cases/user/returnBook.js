export default function returnBook(bookDTO) {
    const {
        bookId,
        score,
        id,
        userRepository
    } = bookDTO;
    if (!bookId || !id || !score) {
        throw new Error(`Some fields are empty or not found!`);
    }

    return userRepository.returnBook(id, bookId, score);
}
