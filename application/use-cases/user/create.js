export default function create(userDTO) {
    const {
        name,
        userRepository
    } = userDTO;
    if (!name) {
        throw new Error(`Some fields are empty or not found!`);
    }

    const newUser = { name };

    return userRepository.create(newUser);
}
