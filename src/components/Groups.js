import React from 'react';

const Group = ({ group }) => {
  return (
    <div>
      <p>Inviter Email: {group.inviterEmail}</p>
      <hr/>
      <h3>Group Notes</h3>
      {group.groupNotes.map((note, index) => (
        <div key={index}>
          <h4>{note.title}</h4>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Group;