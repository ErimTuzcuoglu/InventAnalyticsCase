export default function create(bookDTO) {
    const {
        name,
        bookRepository
    } = bookDTO;

    return bookRepository.create({name});
}
