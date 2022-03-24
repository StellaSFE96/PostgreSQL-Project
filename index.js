// import express from "express";
// import db from "queries";
const express = require("express");
const app = express();
const port = 3000;
const db = require("./queries");

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

app.get("/project", db.getProject);
app.get("/project/:id", db.getSingleProject);
app.post("/project", db.createProject);
app.put("/project/:id", db.updateProject);
app.delete("/project/:id", db.deleteProject);
