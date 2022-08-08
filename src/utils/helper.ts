const checkActive = (string) => {
    if (string === 'true') {
        return true
    } else if (string === 'false') {
        return false
    }
    return undefined
}

export { checkActive }