const validator = require('../helpers/validate');
const { ObjectId } = require('mongodb');

const validateUser = async (req, res, next) => {
    const validationRule = {
        "userName": "required|string|min:3",
        "password": "required|string|min:6",
        "email": "required|email",
        "bio": "string|min:3|max:255",
        "join": "string",
        "followers": "integer",
        "following": "integer"
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch( err => console.log(err))
}

const validatePost = async (req, res, next) => {
    const validationRule = {
        "userName": "required|string|min:3",
        "content": "required|string|min:3",
        "date": "date",
        "likes": "integer"
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch( err => console.log(err))
}

const validateHexkey = async (req, res, next) => {
    const { id } = req.params;
    const hexRegex = /^[0-9a-fA-F]{24}$/;
    if (!hexRegex.test(id)) {
      res.status(400).json({ message: 'Invalid ID format. ID must be a 24-character hexadecimal string' });
    } else {
      next();
    }
  }

module.exports = {
    validateUser,
    validatePost,
    validateHexkey
};