import React, {Fragment, useEffect, useState} from "react";


const ListNotes = () => {

    const [projectName, setProjectName] = useState([]);
    const [projectDescription, setProjectDescription] = useState([]);
    const [notes, setNotes] = useState([]);


    const deleteNoteAndProject = async (id) => {
        try {
          // First, delete the note
          const deleteNoteResponse = await fetch(`http://localhost:5000/notes/${id}`, {
            method: "DELETE"
          });
      
          // Check if the note was successfully deleted before attempting to delete the project
          if (deleteNoteResponse.ok) {
            // Then, delete the project
            const deleteProjectResponse = await fetch(`http://localhost:5000/projects/${id}`, {
              method: "DELETE"
            });
      
            console.log(deleteNoteResponse);
            console.log(deleteProjectResponse);
          } else {
            console.log("Failed to delete the note");
          }
        } catch (err) {
          console.log(err.message);
        }
          getNotes();
          getName();
          getDescription();
          
      };



  const getName = async () => {
        try {
            const response = await fetch("http://localhost:5000/projects")
            const jsonData = await response.json()
            setProjectName(jsonData)
        } catch (err) {
            console.error(err.message)
        }
    } 



    const getDescription = async () => {
        try {
            const response = await fetch("http://localhost:5000/projects")
            const jsonData = await response.json()
            setProjectDescription(jsonData)
        } catch (err) {
            console.error(err.message)
        }
    } 


    const getNotes = async () => {
        try {
            const response = await fetch("http://localhost:5000/notes")
            const jsonData = await response.json()
            setNotes(jsonData)
        } catch (err) {
            console.error(err.message)
        }
    } 

    useEffect(() => {
        getNotes();
        getName();
        getDescription();
        
    }, [])

    console.log(projectName);
    console.log(notes);
    return <Fragment>
        <table className="table mt-5">
  <thead>
    <tr>
      <th>Project Name</th>
      <th>Project description</th>
      <th>Notes</th>
      <th>Delete</th>
    </tr>
  </thead>
  <tbody>
  {projectName.map((name, index) => (
    <tr key={name.project_id}>
      <td>{name.project_name || ''}</td>
      <td>{projectDescription[index]?.project_description || ''}</td>
      <td>{notes[index]?.note_content || ''}</td>
      <td><button className="btn btn-danger" onClick={() => deleteNoteAndProject(name.project_id)}>Delete</button></td>
    </tr>
  ))}
  </tbody>
</table>
    </Fragment>
}

export default ListNotes;
