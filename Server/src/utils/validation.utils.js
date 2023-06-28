const { body, validationResult } = require('express-validator');
module.exports = {
    result: validationResult,
    checkValidEmail: (val) => body(val).trim().isEmail().normalizeEmail(),
    checkValidPassword: (val) => body(val).trim().isLength({ min: 6, max: 8 }),
    checkOtpLength: (val) => body(val).trim().isLength({ min: 4, max: 4 })
}