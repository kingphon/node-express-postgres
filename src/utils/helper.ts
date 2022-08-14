import * as bcrypt from "bcryptjs";

const checkActive = (string) => {
    if (string === 'true') {
        return true
    } else if (string === 'false') {
        return false
    }
    return undefined
}

const hashPassword = (password: string) => {
    return bcrypt.hashSync(password, 8);
}

const checkIfUnencryptedPasswordIsValid = (password: string, encryptedPassword: string) => {
    return bcrypt.compareSync(password, encryptedPassword);
}

export { checkActive, hashPassword, checkIfUnencryptedPasswordIsValid }