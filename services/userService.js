import { getFirstUser } from "../repositories/userRepository.js";

export async function getUserInfo() {

    const user = await getFirstUser();

    return {
        database: true,
        userAdmin: user?.role === "admin",
        user: user?.name
    };
}