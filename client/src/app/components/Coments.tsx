import React, { useEffect, useState } from 'react';
import CommentForm from './CommentForm';
import Image from 'next/image';

const Comment = ({
  id,
  userAvatar,
  userName,
  content,
  timestamp,
  onReply,
  isReply,
}) => {
  const [timeAgo, setTimeAgo] = useState('');
  const [showReplyForm, setShowReplyForm] = useState(false);

  const calculateTimeAgo = (timestamp) => {
    const { _seconds: seconds } = timestamp;
    const now: any = new Date();
    const commentDate: any = new Date(seconds * 1000);
    const diffInSeconds = (now - commentDate) / 1000;

    if (diffInSeconds < 60) {
      return 'just now';
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    } else {
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    }
  };

  const handleReplyClick = () => {
    // Toggle the reply form when the reply button is clicked
    setShowReplyForm(!showReplyForm);
  };
  const commentReply = isReply ? 'comment reply' : 'comment';
  useEffect(() => {
    // Set initial time ago
    setTimeAgo(calculateTimeAgo(timestamp));

    // Update time ago every minute
    const intervalId = setInterval(() => {
      setTimeAgo(calculateTimeAgo(timestamp));
    }, 60000);

    // Clear interval on cleanup
    return () => clearInterval(intervalId);
  }, [timestamp]);

  return (
    <div className={commentReply}>
      <div className="comment-header flex items-center space-x-2">
        <Image
          src={userAvatar}
          alt={userName}
          width={10}
          height={10}
          className="rounded-full w-8 h-8"
        />
        <span className="font-bold">{userName}</span>
      </div>
      <div className="comment-body">
        <p>{content}</p>
      </div>
      <div className="comment-footer text-sm text-gray-500">
        <span>{timeAgo}</span>
        <button onClick={handleReplyClick} className="reply-button">
          Reply
        </button>
      </div>
      {showReplyForm && (
        <CommentForm
          onSubmit={(content) => onReply(content, id)}
          placeholderText="Write a reply..."
        />
      )}
    </div>
  );
};

export default Comment;
