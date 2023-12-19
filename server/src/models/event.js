const db = require('../config/firebaseAdmin');
const admin = require('firebase-admin');

const getEvents = async () => {
  const eventCollection = db.collection('events');
  const snapshot = await eventCollection.get();
  const events = [];
  snapshot.forEach((doc) => {
    events.push({ id: doc.id, ...doc.data() });
  });
  return events; // Return the events array
};
const createEvent = async (creatorId, name, description, users = []) => {
  const eventData = {
    creatorId,
    name,
    description,
    users,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
  };
  const eventRef = await db.collection('events').add(eventData);
  return eventRef.id;
};

const addUserToEvent = async (eventId, userId) => {
  const eventRef = db.collection('events').doc(eventId);
  await eventRef.update({
    users: admin.firestore.FieldValue.arrayUnion(userId),
  });
  return eventId;
};

const getEventUsers = async (eventId) => {
  const usersSnapshot = await db
    .collection('events')
    .doc(eventId)
    .collection('users')
    .get();
  const users = [];
  usersSnapshot.forEach((doc) => users.push({ id: doc.id, ...doc.data() }));
  return users;
};

const updateEventById = async (eventId, userId, updatedData) => {
  const eventRef = db.collection('events').doc(eventId);
  const eventDoc = await eventRef.get();

  if (!eventDoc.exists || eventDoc.data().creatorId !== userId) {
    // Event not found, or user is not the creator
    return null;
  }

  await eventRef.update(updatedData);
  return eventId; // Return the event ID to confirm the update
};

module.exports = {
  getEvents,
  createEvent,
  addUserToEvent,
  getEventUsers,
  updateEventById,
};
