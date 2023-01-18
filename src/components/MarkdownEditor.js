import React, { useState } from 'react';
import "./MarkdownEditor.css"

export function MarkdownEditor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleContentChange(e) {
    setContent(e.target.value);
  }

  return (
    <div className="markdown-editor">
      <h1>
        <input 
          className="markdown-title"
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Title"
        />
      </h1>
      <textarea 
        className="markdown-content"
        value={content}
        onChange={handleContentChange}
        placeholder="Content"
      />
    </div>
  );
}