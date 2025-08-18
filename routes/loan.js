const express = require('express');
const router = express.Router();
const loanCtrl = require('../controllers/loan');

router.post('/contact-admin', loanCtrl.contactAdmin);

module.exports = router;
