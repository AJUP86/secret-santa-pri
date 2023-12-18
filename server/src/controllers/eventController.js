const {
  getEvents,
  createEvent,
  addUserToEvent,
  getEventUsers,
  updateEventById,
} = require('../models/event');

const getAllEvents = async (req, res) => {
  try {
    const events = await getEvents(); // Use the corrected function name
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).send('Error fetching events');
  }
};
const createNewEvent = async (req, res) => {
  console.log('Request body:', req.body);
  const { creatorId, name, description } = req.body;

  try {
    const eventId = await createEvent(creatorId, name, description);
    res.status(201).json({ message: 'Event created successfully', eventId });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).send('Error creating event');
  }
};

const addParticipantToEvent = async (req, res) => {
  const { eventId } = req.params;
  const { userId } = req.body;

  try {
    await addUserToEvent(eventId, userId);
    res.status(200).json({ message: 'User added to event successfully' });
  } catch (error) {
    console.error('Error adding user to event:', error);
    res.status(500).send('Error adding user to event');
  }
};

const getParticipants = async (req, res) => {
  const { eventId } = req.params;

  try {
    const users = await getEventUsers(eventId);
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching event users:', error);
    res.status(500).send('Error fetching event users');
  }
};

const updateEvent = async (req, res) => {
  const { eventId } = req.params;
  const userId = req.user.id;
  const updatedData = req.body;

  try {
    const updatedEventId = await updateEventById(eventId, userId, updatedData);
    if (!updatedEventId) {
      return res.status(403).send('Not authorized or event not found');
    }
    res
      .status(200)
      .json({ message: 'Event updated successfully', eventId: updatedEventId });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).send('Error updating event');
  }
};

module.exports = {
  getAllEvents,
  createNewEvent,
  addParticipantToEvent,
  getParticipants,
  updateEvent,
};
