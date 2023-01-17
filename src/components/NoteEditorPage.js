import React, { useState } from 'react';
import { useEffect } from 'react';
import "./NoteEditorPage.css";

export function NoteEditorPage({ match }) {
  const [note, setNote] = useState({ title: '', content: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNote() {
      try {
        const response = await fetch(`/api/notes/${match.params.id}`);
        const data = await response.json();
        setNote(data);
      } catch (error) {
        setError(error.message);
      }
    }
    if(match.params.id){
        fetchNote();
    }
  }, [match.params.id]);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const method = match.params.id ? 'PUT' : 'POST';
      const response = await fetch('/api/notes', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(note),
      });
      if (!response.ok) {
        throw new Error('An error occurred while saving the note');
      }
      // navigate to the list page or show a message
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={note.title}
          onChange={event => setNote({ ...note, title: event.target.value })}
        />
      </label>
      <label>
        Content:
        <textarea
          value={note.content}
          onChange={event => setNote({ ...note, content: event.target.value })}
        />
      </label>
      <button type="submit">Save</button>
{error && <p>{error}</p>}
</form>
);
}

// This component will handle the functionality of creating and editing a note. It uses the `useEffect` hook to fetch a note from the server when the component mounts and the id of the note is passed in the `match.params.id` props. The component uses the `fetch` API to send a request to the server with the payload of the note, it would handle the response of the server and it will handle the error if the request failed.
// It also uses the `match.params.id` to check if the user is creating a new note or editing an existing note. If there's an id it means that the user is editing a note, it will send a PUT request to the server, otherwise, it will send a POST request.
// make sure that the user is authenticated before sending a request to the server and also to use HTTPS to secure the communication between the client and the server.
// want to add the ability to add attachments (images, documents) to the notes, and the ability to format the text using markdown.