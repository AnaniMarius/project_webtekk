import React, { useState, useEffect } from 'react';
import "./NoteListPage.css";
import { MarkdownEditor } from './MarkdownEditor'; // import the markdown editor component

export function NoteListPage() {
  // const [notes, setNotes] = useState([]);
  //dummy dataset
  const [notes, setNotes] = useState([
    { id: 1, title: 'Note 1', content: 'Content of note 1' },
    { id: 2, title: 'Note 2', content: 'Content of note 2' },
    { id: 3, title: 'Note 3', content: 'Content of note 3' },
    { id: 4, title: 'Note 4', content: 'Content of note 4' }
    ]);
  const [error, setError] = useState(null);
  const [showEditor, setShowEditor] = useState(false); // state to control the visibility of the editor

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

  const openEditor = () => {
    setShowEditor(true);
  }

  return (
    <div>
      <h1>My Notes</h1>
      {error && <p>{error}</p>}
      <button onClick={openEditor}>Create another note</button>
      {showEditor && <MarkdownEditor />}
      <ul>
        {notes.map(note => (
          <li key={note.id}><div>{note.title}</div>
          <div>{note.content}</div><br></br><br></br></li>
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