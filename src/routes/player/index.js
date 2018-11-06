const express = require('express');
const router = express.Router();

router.get('/profile/:uuid', require('../../middlewares/parseToken'), require('./middlewares/getPlayerProfileByUUID'));

module.exports = router;
