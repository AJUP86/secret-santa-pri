import Comment from './Coments';

const CommentThread = ({
  rootComment,
  replies,
  onReply,
  userAvatar,
  userName,
}) => {
  const renderReplies = (replies) => {
    return replies.map((reply) => (
      <div key={reply.id} className="ml-4">
        <Comment
          id={reply.id}
          userAvatar={userAvatar}
          userName={userName}
          content={reply.content}
          timestamp={reply.timestamp}
          onReply={onReply}
          isReply={true}
        />
        {/* Render the nested replies if any */}
        {reply.replies &&
          reply.replies.length > 0 &&
          renderReplies(reply.replies)}
      </div>
    ));
  };
  return (
    <div className="comment-thread">
      <Comment
        id={rootComment.id}
        userAvatar={userAvatar}
        userName={userName}
        content={rootComment.content}
        timestamp={rootComment.timestamp}
        onReply={onReply}
        isReply={false}
      />
      <div className="replies">{renderReplies(replies)}</div>
    </div>
  );
};

export default CommentThread;
