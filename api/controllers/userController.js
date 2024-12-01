import createUser from '../../application/use-cases/user/create';
import findById from '../../application/use-cases/user/findById';
import getAll from '../../application/use-cases/user/getAll';
import borrowBook from '../../application/use-cases/user/borrowBook';
import returnBook from '../../application/use-cases/user/returnBook';

export default function userController(
    userRepository,
    userModelRepository,
) {
    const dbRepository = userRepository(userModelRepository());

    const fetchAllUsers = async (req, res, next) => {
        try {
            const users = await getAll(dbRepository)
            return res.apiResponse(users);
        } catch (error) {
            return next(error);
        }
    }

    const fetchUserById = async (req, res, next) => {
        try {
            const user = await findById(req.params.id, dbRepository)
            return res.apiResponse(user);
        } catch (error) {
            return next(error)
        }
    };

    const addNewUser = async (req, res, next) => {
        const { name } = req.body;

        try {
            const createdUser = await createUser({ name, userRepository: dbRepository });
            res.status(201);
            return res.apiResponse(createdUser);
        } catch (error) {
            return next(error);
        }
    };

    const borrowBookToUser = async (req, res, next) => {
        const { id, bookId } = req.params;

        try {
            const BorrowedBook = await borrowBook({ id, bookId, userRepository: dbRepository });
            res.status(204);
            return res.apiResponse(BorrowedBook);
        } catch (error) {
            return next(error);
        }
    }

    const returnBookFromUser = async (req, res, next) => {
        try {
            const {
                body: { score },
                params: {
                    id,
                    bookId
                }, } = req;

            try {
                const BorrowedBook = await returnBook({ id, bookId, score, userRepository: dbRepository });
                res.status(204);
                return res.apiResponse(BorrowedBook);
            } catch (error) {
                return next(error);
            }
        } catch (error) {

        }
    }

    return {
        fetchAllUsers,
        addNewUser,
        fetchUserById,
        borrowBookToUser,
        returnBookFromUser
    };
}
