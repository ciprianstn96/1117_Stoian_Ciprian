const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

//ROUTES

//add a project

app.post("/projects", async (req, res) => {
    try {
        const {name, description} = req.body;
        const newProject = await pool.query("INSERT INTO projects (project_name, project_description) VALUES($1, $2)", [name, description]);

    res.json(newProject);

}catch (err) {
        console.error(err.message);
    }
});

//get all projects

app.get("/projects", async (req, res) => {
    try {
        const allProjects = await pool.query("SELECT * FROM projects");
        res.json(allProjects.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get a project

app.get("/projects/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const project = await pool.query("SELECT * FROM projects WHERE project_id = $1", [id])
        res.json(project.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//update a project

app.put("/projects/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updateProject = await pool.query("UPDATE projects SET project_description = $1 WHERE project_id = $2", [description, id]);
        res.json("Project was updated!");
    } catch (err) {
        console.error(err.message);
    }
});

//delete a project

app.delete("/projects/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const deleteProject = await pool.query("DELETE FROM projects WHERE project_id = $1", [id]);
        res.json("Project was deleted!");
    } catch (err) {
        console.error(err.message);
    }
});

//add a note

app.post("/notes", async (req, res) => {
    try {
        const {content, project_id} = req.body;
        const newNote = await pool.query("INSERT INTO notes (note_content, project_id) VALUES($1, $2)", [content, project_id]);

    res.json(newNote);

}catch (err) {
        console.error(err.message);
    }
});

//get all notes

app.get("/notes", async (req, res) => {
    try {
        const allNotes = await pool.query("SELECT * FROM notes");
        res.json(allNotes.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get a note

app.get("/notes/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const note = await pool.query("SELECT * FROM notes WHERE note_id = $1", [id])
        res.json(note.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//update a note

app.put("/notes/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const {content} = req.body;
        const updateNote = await pool.query("UPDATE notes SET note_content = $1 WHERE note_id = $2", [content, id]);
        res.json("Note was updated!");
    } catch (err) {
        console.error(err.message);
    }
});

//delete a note

app.delete("/notes/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const deleteNote = await pool.query("DELETE FROM notes WHERE note_id = $1", [id]);
        res.json("Note was deleted!");
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(5000, () => {
    console.log("server has started on port 5000");
})