const express = require('express');
const eventController = require('../controllers/eventController');

const router = express.Router();

router.get('/', eventController.getAllEvents);
router.post('/', eventController.createNewEvent);
router.post('/:eventId/users', eventController.addParticipantToEvent);
router.get('/:eventId/users', eventController.getParticipants);
router.put('/:eventId', eventController.updateEvent);

module.exports = router;
