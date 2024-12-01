export default function create(bookDTO) {
    const {
        name,
        bookRepository
    } = bookDTO;
    if (!name || !bookRepository) {
        throw new Error(`Some fields are empty or not found!`);
    }

    const newBook = { name };

    return bookRepository.create(newBook);
}
