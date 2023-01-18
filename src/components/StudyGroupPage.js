import React, { useState, useEffect } from 'react';
import "./StudyGroupPage.css";

export function StudyGroupPage() {
  const [studyGroup, setStudyGroup] = useState({ title: '', members: [] });
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStudyGroup() {
      try {
        const response = await fetch('/api/studygroup');
        const data = await response.json();
        setStudyGroup(data);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchStudyGroup();
  }, []);

  function handleInvite(event) {
    event.preventDefault();
    // send invite to the server 
  }

  return (
    <div>
      <h1>{studyGroup.title} Study Group</h1>
      {error && <p>{error}</p>} 
      
      <h2>Members</h2>
      <ul>
        {studyGroup.members.map(member => (
          <li key={member.id}>{member.email}</li>
        ))}
      </ul>
      <form onSubmit={handleInvite}>
        <label>
          Invite member by email:
          <input type="email" />
        </label>
        <button type="submit">Invite</button>
      </form>
    </div>
  );
}

// This component will handle the functionality of creating and managing a study group. It uses the useEffect hook to fetch the study group details from the server when the component mounts, it would handle the response of the server and it will handle the error if the request failed.
// It also has a form that allows users to invite new members to the study group by email. This form will handle the sending invite request to the server.
// It's important to make sure that the user is authenticated before sending a request to the server and also to use HTTPS to secure the communication between the client and the server.
// want to add the ability to view and delete members from the study group, and the ability for the members to share notes with each other within the group. Additionally, you may want to implement a way for users to create and manage multiple study groups.
// consider the security and data privacy aspects of the study groups. You may want to consider encrypting the data and using secure communication channels, and also giving users control over their data and allowing them to delete their data if they choose to leave the study group.
// test