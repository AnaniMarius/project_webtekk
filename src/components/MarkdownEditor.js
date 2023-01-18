import React, { useState } from 'react';
import "./MarkdownEditor.css"

export function MarkdownEditor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showEditor, setShowEditor] = useState(true);

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleContentChange(e) {
    setContent(e.target.value);
  }

  function handleCancel() {
    setShowEditor(false);
  }

  function handleSave() {
    if (title && content) {
      // make API call to save title and content
      const data = {
        title: title,
        content: content
      };
      fetch('/api/save', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } else {
      // handle error, for example show a message to the user that the fields are required
      alert('Title and content are required');
    }
  }

  return (
    <div>
    {!showEditor && <button onClick={() => setShowEditor(true)}>Open Markdown Editor</button>}
      {showEditor &&
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
      <button className="cancel-button" onClick={handleCancel}>Cancel</button>
      <button className="save-button" onClick={handleSave}>Save</button>
    </div>}
    </div>
  );
}
