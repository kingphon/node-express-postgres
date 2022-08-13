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

const checkIfUnencryptedPasswordIsValid = (unencryptedPassword: string, password: string) => {
    return bcrypt.compareSync(unencryptedPassword, password);
}

export { checkActive, hashPassword, checkIfUnencryptedPasswordIsValid }