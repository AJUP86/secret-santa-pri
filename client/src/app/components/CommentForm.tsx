import { useState } from 'react';

const CommentForm = ({ onSubmit, placeholderText }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(content);
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form flex flex-col gap-4">
      <textarea
        placeholder={placeholderText}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        // additional styles
      ></textarea>
      <div className="flex justify-end">
        <button type="submit" className="comment-submit">
          Post
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
