export default function bookRepository(repository) {
    const getAll = () => repository.getAll();
    const findById = (id) => repository.findById(id);
    const create = (book) => repository.create(book);
  
    return {
      getAll,
      findById,
      create
    };
  }
  