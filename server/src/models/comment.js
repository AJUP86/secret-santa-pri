const db = require('../config/firebaseAdmin');
const admin = require('firebase-admin');

const createComment = async (userId, eventId, content) => {
  const commentData = {
    userId,
    eventId,
    content,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
  };
  const commentRef = await db.collection('comments').add(commentData);
  return commentRef.id;
};

const getCommentsForEvent = async (eventId) => {
  const commentsSnapshot = await db
    .collection('comments')
    .where('eventId', '==', eventId)
    .orderBy('timestamp', 'desc')
    .get();

  const comments = [];
  commentsSnapshot.forEach((doc) =>
    comments.push({ id: doc.id, ...doc.data() })
  );
  return comments;
};

module.exports = {
  createComment,
  getCommentsForEvent,
};
