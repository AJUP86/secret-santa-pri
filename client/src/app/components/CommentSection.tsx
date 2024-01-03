'use client';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import CommentForm from './CommentForm';
import CommentThread from './CommentThread';
const CommentSection = ({ eventId }) => {
  const [postedComments, setPostedComments] = useState([]);
  const { data: session } = useSession();

  const fetchComments = async (event) => {
    try {
      const response = await fetch(`http://localhost:5000/comments/${event}`);
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      const data = await response.json();
      setPostedComments(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    if (eventId) {
      fetchComments(eventId);
    }
  }, [eventId]);

  const handlePost = async (content, parentId = null) => {
    try {
      const response = await fetch('http://localhost:5000/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: session.user.email,
          eventId,
          content,
          parentId,
        }),
      });
      if (!response.ok) throw new Error('Failed to post comment');
      await fetchComments(eventId);
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };
  const handlePostReply = async (content, parentId) => {
    if (!content.trim()) return;

    try {
      const response = await fetch('http://localhost:5000/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: session.user.email,
          eventId,
          content: content,
          parentId: parentId, // Send the parentId of the comment being replied to
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to post reply');
      }

      // Fetch comments again to update the list with the new reply
      await fetchComments(eventId);
    } catch (error) {
      console.error('Error posting reply:', error);
    }
  };

  return (
    <div className="comment-section">
      <CommentForm
        onSubmit={(content) => handlePost(content)}
        placeholderText="Write your comment..."
      />
      <div className="comments-display">
        {postedComments &&
          postedComments.map(
            (comment) =>
              // Check if the comment is a root comment (no parentId)
              !comment.parentId && (
                <CommentThread
                  key={comment.id}
                  rootComment={comment}
                  replies={comment.replies}
                  onReply={handlePostReply}
                  userAvatar={session.user.image}
                  userName={session.user.name}
                />
              )
          )}
      </div>
    </div>
  );
};

export default CommentSection;
