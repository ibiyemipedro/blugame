const { validationResult } = require('express-validator');
const { authUser } = require('../../services/user/auth.service')

const userAuth = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await authUser(req.body)
    res.json({
      status: user.success,
      data: user.data,
      message: user.message
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { userAuth }