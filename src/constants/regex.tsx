const REGEX = {
    passwordRegex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,16}$/,
    emailRegex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/
}

export {
    REGEX
}