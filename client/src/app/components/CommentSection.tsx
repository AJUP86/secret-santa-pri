'use client';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Comment from './Coments';
import { comma } from 'postcss/lib/list';

const CommentSection = ({ eventId }) => {
  const [comment, setComment] = useState('');
  const [postedComments, setPostedComments] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/comments/${eventId}`
        );
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

    if (eventId) {
      fetchComments();
    }
  }, [eventId, comment]);

  const handlePostComment = async (e) => {
    e.preventDefault();
    console.log(comment);
    if (!comment.trim()) return;

    try {
      const response = await fetch('http://localhost:5000/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: session.user.email,
          eventId,
          content: comment,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to post comment');
      }

      setComment('');
      // Update comments list here if necessary
    } catch (error) {
      console.error('Error posting comment:', error);
      // Display an error message
    }
  };

  return (
    <div className="comment-section">
      <form
        onSubmit={handlePostComment}
        className="comment-form flex flex-col gap-4"
      >
        <textarea
          className="comment-input w-full border-gray-300 rounded-lg shadow-sm p-3 text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          placeholder="Write your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
        ></textarea>
        <div className="flex justify-end">
          <button
            type="submit"
            className="comment-submit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 cursor-pointer"
          >
            Post Comment
          </button>
        </div>
      </form>
      <div className="comments-display">
        {postedComments &&
          postedComments.map((comment) => (
            <div key={comment.id} className="comment">
              <Comment
                userAvatar={session.user.image}
                userName={session.user.name}
                content={comment.content}
                timestamp={comment.timestamp}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default CommentSection;
