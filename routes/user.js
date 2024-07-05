const express = require('express');

const { getUsers } = require('../controllers/user');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.get('/', authMiddleware, getUsers);

module.exports = router;