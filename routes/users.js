const router = require('express').Router();
const {
  updateDataUser,
  getDataUser,
} = require('../controllers/users');
const { updateDataUserValidation } = require('../middlewares/validation');

router.get('/me', getDataUser);
router.patch('/me', updateDataUserValidation, updateDataUser);

module.exports = router;
