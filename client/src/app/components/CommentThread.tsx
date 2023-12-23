import Comment from './Coments';

const CommentThread = ({
  rootComment,
  replies,
  onReply,
  userAvatar,
  userName,
}) => {
  return (
    <div className="comment-thread">
      <Comment
        id={rootComment.id}
        userAvatar={userAvatar}
        userName={userName}
        content={rootComment.content}
        timestamp={rootComment.timestamp}
        onReply={onReply}
      />
      <div className="replies">
        {replies.map((reply) => (
          <div key={reply.id}>
            <Comment
              id={reply.id}
              userAvatar={userAvatar}
              userName={userName}
              content={reply.content}
              timestamp={reply.timestamp}
              onReply={onReply}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentThread;
