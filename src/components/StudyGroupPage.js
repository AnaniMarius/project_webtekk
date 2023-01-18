import React, { useState, useEffect } from 'react';
import "./StudyGroupPage.css";

export function StudyGroupPage({ currentUserEmail }) {
  const [studyGroup, setStudyGroup] = useState({
    title: 'React Study Group',
    members: [
      { email: 'johndoe@example.com' },
      { email: 'janedoe@example.com' },
      { email: 'jimmydoe@example.com' },
    ],
    owner: 'janedoe@example.com',
  });
  const [notes, setNotes] = useState([
    { id: 1, title: 'Note 1', content: 'Content of note 1' },
    { id: 2, title: 'Note 2', content: 'Content of note 2' },
    { id: 3, title: 'Note 3', content: 'Content of note 3' },
    { id: 4, title: 'Note 4', content: 'Content of note 4' }
  ]);
  const [error, setError] = useState(null);
  const [inviteSuccess, setInviteSuccess] = useState(null);

  useEffect(() => {
    async function fetchStudyGroup() {
      try {
        // You can remove this block of code if you want to use the dummy data
        /*
        const response = await fetch(`/api/studygroup/${currentUserEmail}`);
        const data = await response.json();
        setStudyGroup(data);
        */
      } catch (error) {
        setError(error.message);
      }
    }

    fetchStudyGroup();
  }, []);

  async function handleInvite(event) {
    event.preventDefault();
    const email = event.target.elements.email.value;
    const data = { email };

    try {
      // You can remove this block of code if you want to use the dummy data
      /*
      const response = await fetch(`/api/studygroup/${currentUserEmail}/invite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        setInviteSuccess(true);
        setError(null);
        event.target.elements.email.value = '';
      } else {
        const result = await response.json();
        setInviteSuccess(false);
        setError(result.message);
      }
      */
    } catch (error) {
      setInviteSuccess(false);
      setError(error.message);
    }
  }
  
  async function handleKick(memberEmail) {
    const confirm = window.confirm(`Are you sure you want to kick ${memberEmail} from the group?`);
    if(confirm) {
    try {
      // You can remove this block of code if you want to use the dummy data
      /*
      const response = await fetch(`/api/studygroup/${currentUserEmail}/members/${memberEmail}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // update the state of the members array by removing the kicked member
        setStudyGroup({ ...studyGroup, members: studyGroup.members.filter(member => member.email !== memberEmail) });
      } else {
        const result = await response.json();
        setError(result.message);
      }
      */
    } catch (error) {
      setError(error.message);
    }
    }
  }

  return (
    <>
      {inviteSuccess === true && <p>Invite sent successfully!</p>}
      {inviteSuccess === false && <p>Error sending invite: {error}</p>}
      <div>
        <h1>{studyGroup.title} Study Group</h1>
        <h2>Members</h2>
        <ul>
          {studyGroup.members.map(member => (
            <li key={member.email}>{member.email}</li>
          ))}
        </ul>
        {error && <p>Error: {error}</p>}
        <form onSubmit={handleInvite}>
          <label>
            Invite member by email:
            <input type="email" name="email" />
          </label>
          <button type="submit">Invite</button>
        </form>
        <h3>Group Owner: {studyGroup.owner}</h3>
        <h2>Notes</h2>
        <ul>
          {notes.map(note => (
            <li key={note.id}><div>{note.title}</div>
            <div>{note.content}</div><br></br><br></br></li>
          ))}
        </ul>
      </div>
    </>
  );
}

// This component will handle the functionality of creating and managing a study group. It uses the useEffect hook to fetch the study group details from the server when the component mounts, it would handle the response of the server and it will handle the error if the request failed.
// It also has a form that allows users to invite new members to the study group by email. This form will handle the sending invite request to the server.
// It's important to make sure that the user is authenticated before sending a request to the server and also to use HTTPS to secure the communication between the client and the server.
// want to add the ability to view and delete members from the study group, and the ability for the members to share notes with each other within the group. Additionally, you may want to implement a way for users to create and manage multiple study groups.
// consider the security and data privacy aspects of the study groups. You may want to consider encrypting the data and using secure communication channels, and also giving users control over their data and allowing them to delete their data if they choose to leave the study group.
// test

// This component will handle the functionality of creating and managing a study group. It uses the useEffect hook to fetch the study group details from the server when the component mounts, it would handle the response of the server and it will handle the error if the request failed.
// It also has a form that allows users to invite new members to the study group by email. This form will handle the sending invite request to the server.
// It's important to make sure that the user is authenticated before sending a request to the server and also to use HTTPS to secure the communication between the client and the server.
// want to add the ability to view and delete members from the study group, and the ability for the members to share notes with each other within the group. Additionally, you may want to implement a way for users to create and manage multiple study groups.
// consider the security and data privacy aspects of the study groups. You may want to consider encrypting the data and using secure communication channels, and also giving users control over their data and allowing them to delete their data if they choose to leave the study group.
// test