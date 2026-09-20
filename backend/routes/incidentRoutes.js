const express = require('express');
const router = express.Router();
const incidentController = require('../controllers/incidentController');

router.post('/submit-report', incidentController.createReport);

router.get('/incidents', incidentController.getIncidents);

router.put('/update-status', incidentController.updateStatus);

module.exports = router;