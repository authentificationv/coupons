const express = require('express');
const router = express.Router();
const loanCtrl = require('../controllers/loan');

router.post('/contact-admin', loanCtrl.contactAdmin);
router.post('/loan-request', loanCtrl.loanRequest);

module.exports = router;
