const express = require('express');
const {
  postComment,
  fetchComments,
} = require('../controllers/commentsController');

const router = express.Router();

router.post('/', postComment);
router.get('/:eventId', fetchComments);

module.exports = router;
