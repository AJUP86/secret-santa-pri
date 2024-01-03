import { useState } from 'react';

const CommentForm = ({ onSubmit, placeholderText }) => {
  const [content, setContent] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    setIsButtonDisabled(
      newContent.trim().length === 0 || newContent.length > 300
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isButtonDisabled) {
      onSubmit(content);
      setContent('');
      setIsButtonDisabled(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form flex flex-col gap-4">
      <textarea
        placeholder={placeholderText}
        value={content}
        onChange={handleContentChange}
        className="comment-input"
      ></textarea>
      <div className="flex justify-end">
        <button
          type="submit"
          className={`comment-submit ${
            isButtonDisabled
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-primary hover:bg-primary-hover'
          }`}
          disabled={isButtonDisabled}
        >
          Post
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
