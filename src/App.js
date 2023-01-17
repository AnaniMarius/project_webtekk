import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import { LoginPage } from './components/LoginPage';
import { NoteListPage } from './components/NoteListPage';
import { NoteEditorPage } from './components/NoteEditorPage';
import { StudyGroupPage } from './components/StudyGroupPage';
import { StudyGroupsPage } from './components/StudyGroupsPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn"));
  const [selectedNote, setSelectedNote] = useState(null);

  function handleLogin(username, password) {
    localStorage.setItem('isLoggedIn', true);
    setIsLoggedIn(true);
  }

  function handleLogout() {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  }

  function handleSelectNote(note) {
    setSelectedNote(note);
  }

  return (
    <Router>
      <div>
        {isLoggedIn ? (
          <nav>
            <Link to="/">My Notes</Link>
            <Link to="/study-group">My Study Group</Link>
            <Link to="/study-groups">Study Groups</Link>
            <button onClick={handleLogout}>Logout</button>
          </nav>
        ) : (
          <nav>
            <Link to="/login">Login</Link>
          </nav>
        )}

        <Routes>
          {/* <Route path="login">
            <LoginPage onLogin={handleLogin} />
          </Route> */}
          <Route path="login" element={ !isLoggedIn ? <LoginPage onLogin={handleLogin} />: <div/>} />
          {/* <Route path="/">
            <NoteListPage
              selectedNote={selectedNote}
              onSelectNote={handleSelectNote}
              onAddNote={() => setSelectedNote({})}
            />
          </Route> */}
          <Route path="/" element={isLoggedIn ? <NoteListPage
            selectedNote={selectedNote}
            onSelectNote={handleSelectNote}
            onAddNote={() => setSelectedNote({})}
          /> : <div/>} />
          {/* <Route path="/study-group">
            <StudyGroupPage />
          </Route> */}
          <Route path="/study-groups" element={ isLoggedIn ? <StudyGroupsPage />: <div/>} />
          <Route path="/study-group" element={ isLoggedIn ? <StudyGroupPage />: <div/>} />
        </Routes>
        {selectedNote && (
          <NoteEditorPage
            note={selectedNote}
            onCancel={() => setSelectedNote(null)}
            onSave={updatedNote => {
              // save the note to the server
              setSelectedNote(null);
            }}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
// Authentication: includes a basic login function, but it would need to be expanded to handle the actual authentication process, such as sending a login request to the server and handling the response.

// Data management: uses React's useState hook to manage the application's state, but for a more complex application, it would be recommended to use a state management library such as Redux or the Context API to manage the state of the application, to make it easier to handle complex state and make the code more maintainable.

// Interactions with the backend: includes basic functions for handling note creation, editing, and deletion, but it would need to be expanded to include logic for sending requests to the backend to retrieve and save data.

// File uploads: does not include any file uploading functionality, it would need to be added to allow students to attach images and documents to their notes.

// Markdown editor: does not include a markdown editor, it would need to be added to allow students to format their notes using markdown.

// Study group: includes a basic function for handling the study group, but it would need to be expanded to include the functionality of inviting colleagues, sharing notes and managing the group.

// Design and styling: does not include any design or styling, it would need to be added to make the application visually appealing.

// Error handling: does not include any error handling, it would need to be added to handle any errors that might occur when interacting with the backend.
