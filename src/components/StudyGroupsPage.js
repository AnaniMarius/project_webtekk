import React, { useState } from 'react';
import { useEffect } from 'react';
import { Dropdown, Button, Confirm } from 'semantic-ui-react';
import './StudyGroupsPage.css';
import { MarkdownEditor } from './MarkdownEditor'; // import the markdown editor component

export function StudyGroupsPage() {
    // const [studyGroups, setStudyGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState();
    const [open, setOpen] = useState(false);
    const [showEditor, setShowEditor] = useState(false);
    const [noteToEdit, setNoteToEdit] = useState(null); // new state for the note to be edited
    const [error, setError] = useState(null);

    //dummy data
    const [studyGroups, setStudyGroups] = useState([
        { id: 1, inviterEmail: 'admin1@stud.ase.ro', resources: [{ id: 1, title: 'Title1', content: 'Content1' }, { id: 2, title: 'Title1', content: 'Content1' }] },
        { id: 2, inviterEmail: 'admin2@stud.ase.ro', resources: [{ id: 3, title: 'Title2', content: 'Content2' }, { id: 4, title: 'Title2', content: 'Content2' }] },
        { id: 3, inviterEmail: 'admin3@stud.ase.ro', resources: [{ id: 5, title: 'Title3', content: 'Content3' }, { id: 6, title: 'Title3', content: 'Content3' }] },
        { id: 4, inviterEmail: 'admin4@stud.ase.ro', resources: [{ id: 7, title: 'Title4', content: 'Content4' }, { id: 8, title: 'Title4', content: 'Content4' }] }
    ]);

    useEffect(() => {
        // fetch list of study groups from the server
        fetch('http://localhost:5002/api/groups/email/admin1@stud.ase.ro')
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.statusText);
                }
                return res.json();
            })
            .then(data => setStudyGroups(data))
            .catch(err => {
                console.log(err);
                
            });
    }, []);

    const handleGroupSelection = (e, { value }) => {
            setSelectedGroup(value);
    };

    const handleLeaveGroup = () => {
        // Remove group from studyGroups
        setStudyGroups(studyGroups.filter(group => group.id !== selectedGroup.id));
        setSelectedGroup(null);

        // Send request to server to remove user from group
        fetch('/api/study-groups/leave', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ groupId: selectedGroup.id }),
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.statusText);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
    // const handleDelete = async (noteId) => {
    //     try {
    //       await fetch(`/api/notes/${noteId}`, {
    //         method: 'DELETE',
    //       });
    //       setNotes(notes.filter(note => note.id !== noteId));
    //     } catch (error) {
    //       setError(error.message);
    //     }
    //   }

    // const handleEdit = (note) => {
    //     setNoteToEdit(note);
    //     setShowEditor(true);
    // }

    const openEditor = () => {
        setShowEditor(true);
    }
    return (
            <div>
                <h1>Study Groups</h1>
                <Dropdown
                    placeholder="Select a study group"
                    options={studyGroups.map(group => ({
                        key: group.id,
                        text: group.inviterEmail,
                        value: group
                    }))}
                    onChange={handleGroupSelection}
                />
                {selectedGroup && (
                    <div>
                        <h2>Resources for {selectedGroup.inviterEmail}'s group</h2>
                        <ul>
                            {selectedGroup.groupNotes.map(resource => (
                                <li key={resource.id}><div>{resource.title}</div> <div>{resource.content}</div><br></br><br></br>
                                    {/* <button onClick={() => handleDelete(note.id)}>Delete</button>
                                    <button onClick={() => handleEdit(note)}>Edit</button> */}
                                    </li>
                            ))}
                        </ul>
                        <button onClick={openEditor}>Create another note</button>
                        {showEditor && <MarkdownEditor />}
                        <Button onClick={() => setOpen(true)}>Leave Group</Button>
                        <Confirm
                            open={open}
                            onCancel={() => setOpen(false)}
                            onConfirm={handleLeaveGroup}
                            content="Are you sure you want to leave this group?"
                        />
                    </div>
                )}
            </div>
    );
}