// In routes/eventRoutes.js
const express = require('express');
const eventController = require('../controllers/eventController');

const router = express.Router();

router.post('/events', eventController.createNewEvent);
router.post('/events/:eventId/users', eventController.addParticipantToEvent);
router.get('/events/:eventId/users', eventController.getParticipants);
router.put('/events/:eventId', eventController.updateEvent);

module.exports = router;
