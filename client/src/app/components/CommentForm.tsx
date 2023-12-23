import { useState } from 'react';

const CommentForm = ({ onSubmit, placeholderText }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(content);
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
        placeholder={placeholderText}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        // additional styles
      ></textarea>
      <button type="submit" className="comment-submit">
        Post
      </button>
    </form>
  );
};

export default CommentForm;
