'use strict';

var express = require('express');
var rewardController = require('./reward.controller');
var verify = require('../middleware').verify;

var router = express.Router();

router.use(verify);
router.get('/', rewardController.get);
router.post('/:id/redeem', rewardController.redeem);

module.exports = router;