import bcrypt from 'bcrypt';

export const hashPassword = async (password,hash) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password,hash);
}