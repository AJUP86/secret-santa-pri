import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const Comment = ({ userAvatar, userName, content, timestamp }) => {
  const [timeAgo, setTimeAgo] = useState('');
  // Function to calculate the time ago string
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
    <div className="comment">
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
      </div>
    </div>
  );
};

export default Comment;
