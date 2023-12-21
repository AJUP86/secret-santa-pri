'use client';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';

const CommentSection = ({ eventId }) => {
  const [comment, setComment] = useState('');
  const { data: session } = useSession();

  const handlePostComment = async (e) => {
    e.preventDefault();
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
        {/* Map and display comments here */}
      </div>
    </div>
  );
};

export default CommentSection;
