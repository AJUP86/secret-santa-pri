const { createComment, getCommentsForEvent } = require('../models/comment');

const postComment = async (req, res) => {
  const { userId, eventId, content, parentId } = req.body;

  try {
    const commentId = await createComment(userId, eventId, content, parentId);
    res.status(201).json({ message: 'Comment added successfully', commentId });
  } catch (error) {
    console.error('Error posting comment:', error);
    res.status(500).send('Error posting comment');
  }
};

const fetchComments = async (req, res) => {
  const { eventId } = req.params;

  try {
    const comments = await getCommentsForEvent(eventId);
    res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).send('Error fetching comments');
  }
};

module.exports = {
  postComment,
  fetchComments,
};
