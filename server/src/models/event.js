const db = require('../config/firebaseAdmin');
const admin = require('firebase-admin');

const getEvents = async () => {
  const eventCollection = db.collection('events');
  const snapshot = await eventCollection.get();
  const events = [];
  snapshot.forEach((doc) => {
    events.push({ id: doc.id, ...doc.data() });
  });
  return events;
};
const createEvent = async (creatorId, name, description) => {
  const eventData = {
    creatorId,
    name,
    description,
    users: [],
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
  };
  const eventRef = await db.collection('events').add(eventData);
  return eventRef.id;
};

const addUserToEvent = async (eventId, userId, status = 'pending') => {
  const userObj = { userId, status };
  const eventRef = db.collection('events').doc(eventId);
  await eventRef.update({
    users: admin.firestore.FieldValue.arrayUnion(userObj),
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
    return null;
  }

  await eventRef.update(updatedData);
  return eventId;
};

module.exports = {
  getEvents,
  createEvent,
  addUserToEvent,
  getEventUsers,
  updateEventById,
};
