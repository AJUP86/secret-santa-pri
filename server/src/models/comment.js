const db = require('../config/firebaseAdmin');
const admin = require('firebase-admin');

const createComment = async (userId, eventId, content, parentId) => {
  const commentData = {
    userId,
    eventId,
    content,
    parentId,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
  };
  const commentRef = await db.collection('comments').add(commentData);
  return commentRef.id;
};
const organizeComments = (comments) => {
  let map = {},
    node,
    roots = [];
  for (let i = 0; i < comments.length; i++) {
    map[comments[i].id] = i;
    comments[i].replies = [];
  }
  for (let i = 0; i < comments.length; i++) {
    node = comments[i];
    if (node.parentId !== null && map[node.parentId] !== undefined) {
      comments[map[node.parentId]].replies.push(node);
    } else if (node.parentId === null) {
      roots.push(node);
    }
  }
  return roots;
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
  const organizedComments = organizeComments(comments);

  return organizedComments;
};

module.exports = {
  createComment,
  getCommentsForEvent,
};
