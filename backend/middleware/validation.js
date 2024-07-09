const { body, validationResult } = require('express-validator');

const validateLogin = [
  body('email').isEmail().withMessage('Enter a valid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateCarSubmission = [
  body('carModel').isLength({ min: 3 }).withMessage('Car model must be at least 3 characters long'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('phone').isLength({ min: 11, max: 11 }).withMessage('Phone number must be exactly 11 digits long'),
  body('maxPictures').isInt({ min: 1, max: 10 }).withMessage('Max pictures must be between 1 and 10'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateLogin, validateCarSubmission };
