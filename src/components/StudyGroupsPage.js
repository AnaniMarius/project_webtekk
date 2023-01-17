import React, { useState } from 'react';
import { useEffect } from 'react';
import { Dropdown } from 'semantic-ui-react';
import './StudyGroupsPage.css';

export function StudyGroupsPage() {
    // const [studyGroups, setStudyGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);

    //dummy data
    const [studyGroups, setStudyGroups] = useState([
        { id: 1, inviterEmail: 'admin1@stud.ase.ro', resources: [{ id: 1, name: 'Resource 1' }, { id: 2, name: 'Resource 1' }] },
        { id: 2, inviterEmail: 'admin2@stud.ase.ro', resources: [{ id: 3, name: 'Resource 2' }, { id: 4, name: 'Resource 2' }] },
        { id: 3, inviterEmail: 'admin3@stud.ase.ro', resources: [{ id: 5, name: 'Resource 3' }, { id: 6, name: 'Resource 3' }] },
        { id: 4, inviterEmail: 'admin4@stud.ase.ro', resources: [{ id: 7, name: 'Resource 4' }, { id: 8, name: 'Resource 4' }] }
    ]);

    useEffect(() => {
        // fetch list of study groups from the server
        fetch('/api/study-groups')
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.statusText);
                }
                return res.json();
            })
            .then(data => setStudyGroups(data))
            .catch(err => {
                console.log(err);
                // handle error if any
            });
    }, []);
    
    const handleGroupSelection = (e, { value }) => {
        setSelectedGroup(value);
    };

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
                        {selectedGroup.resources.map(resource => (
                            <li key={resource.id}>{resource.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}