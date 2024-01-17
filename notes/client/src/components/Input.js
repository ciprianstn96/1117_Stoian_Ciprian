import React, {Fragment, useState,} from "react";

const Input = () => {

    const[name, setName] = useState("")
    const[description, setDescription] = useState("")
    const[content, setContent] = useState("")
    
    const onSubmitForm = async(e) => {
        e.preventDefault();
        try {
            const body = {name, description};
            const response = await fetch("http://localhost:5000/projects",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)    
            });
            console.log(response);
            
            const noteBody = {content};
            const noteResponse = await fetch("http://localhost:5000/notes",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(noteBody) 
        }); 
            console.log(noteResponse);
     } catch (err) {
            console.error(err.message)
        }
    } 


    return (
    <Fragment>
        <h1 className="text-center mt-5">Add note</h1>
        <form className="mt-5" onSubmit={onSubmitForm}>
            <input type="text" className="form-control" placeholder="Project name" value={name} 
            onChange={e => setName(e.target.value)}/>
            <input type="text" className="form-control" placeholder="Project description"value={description} 
            onChange={e => setDescription(e.target.value)}/>
            <textarea className="form-control" placeholder="Note"value={content} 
            onChange={e => setContent(e.target.value)}/>
            <button className="btn btn-success">Add</button>
        </form>
    </Fragment>
    )
}

export default Input;
