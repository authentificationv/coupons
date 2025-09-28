const express = require('express');
const router = express.Router();
const ticketCtrl = require('../controllers/ticket');

router.post('/contact-admin', ticketCtrl.contactAdmin);

module.exports = router;
