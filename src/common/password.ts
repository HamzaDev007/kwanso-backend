import bcrypt from 'bcrypt';
type Password = string;
const encryptPassword = async (password: Password) => await bcrypt.hash(password, 12);
const matchPassword = async (password: Password, hashPassword: Password) => {
 const doPasswordMatch = await bcrypt.compare(password, hashPassword)
 if (doPasswordMatch) return true;
 else return false;
};

export { encryptPassword, matchPassword }