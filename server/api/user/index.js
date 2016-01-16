'use strict';

var express = require('express');
var userController = require('./user.controller');
var questionController = require('./question.controller');
var answerController = require('./answer.controller');
var walletController = require('./wallet.controller');
var verify = require('../middleware').verify;

var router = express.Router();

router.use(verify);
router.get('/', userController.get);
router.get('/:id/questions/new', questionController.getNew);
router.get('/:id/questions/answered', questionController.getAnswered);
router.get('/:id/questions/dismissed', questionController.getDismissed);
router.post('/:id/answer', answerController.post);
router.patch('/:id/answer', answerController.patch);
router.get('/:user_id/wallet', walletController.get);

module.exports = router;