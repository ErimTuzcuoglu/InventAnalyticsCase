import createBook from '../../application/use-cases/book/create';
import findById from '../../application/use-cases/book/findById';
import getAll from '../../application/use-cases/book/getAll';

export default function bookController(
    bookRepository,
    bookModelRepository,
) {
    const dbRepository = bookRepository(bookModelRepository());

    const fetchAllBooks = async (req, res, next) => {
        try {
            const books = await getAll(dbRepository)
            return res.apiResponse(books);
        } catch (error) {
            return next(error);
        }
    }

    const fetchBookById = async (req, res, next) => {
        try {
            const book = await findById(req.params.id, dbRepository)
            return res.apiResponse(book);
        } catch (error) {
            return next(error)
        }

    };

    const addNewBook = async (req, res, next) => {
        const { name } = req.body;

        try {
            const createdBook = await createBook({ name, bookRepository: dbRepository });
            res.status(201);
            return res.apiResponse(createdBook);
        } catch (error) {
            return next(error);
        }
    };

    return {
        fetchAllBooks,
        addNewBook,
        fetchBookById
    };
}
