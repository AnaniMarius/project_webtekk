import React, { useState, useEffect } from 'react';
import "./NoteListPage.css";

export function NoteListPage() {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNotes() {
      try {
        const response = await fetch('/api/notes');
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchNotes();
  }, []);

  return (
    <div>
      <h1>My Notes</h1>
      {error && <p>{error}</p>}
      <ul>
        {notes.map(note => (
          <li key={note.id}>{note.title}</li>
        ))}
      </ul>
    </div>
  );
}
// This component will display a list of notes that have been fetched from the server. 
// It uses the useEffect hook to fetch the notes from the server on component mount. 
// The component shows the error message if there is any error from the server and it maps through the notes and renders a list item for each note with the title.
// to add additional functionality such as the ability to view, add, edit and delete notes, and organize them based on classes, date, labels, and keywords.
// to add the ability to add attachments (images, documents) to the notes, and the ability to share notes with other colleagues.
// make sure that the user is authenticated before fetching the notes, and also to use HTTPS to secure the communication between the client and the server.