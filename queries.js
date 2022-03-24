const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "api",
  password: "changeme",
  port: 5432,
});

const getProject = (request, response) => {
  pool.query(
    "SELECT * FROM project ORDER BY project_code",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getSingleProject = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(
    "SELECT * FROM project WHERE project_code = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const createProject = (request, response) => {
  const { project_code, project_name, project_leader, project_budget } =
    request.body;
  pool.query(
    "INSERT INTO project (project_code, project_name, project_leader, project_budget) VALUES ($1, $2, $3, $4) RETURNING *",
    [project_code, project_name, project_leader, project_budget],
    (error, results) => {
      if (error) {
        throw error;
      }
      response
        .status(201)
        .send(`Project was added! \n` + JSON.stringify(results.rows[0]));
    }
  );
};

const updateProject = (request, response) => {
  const id = parseInt(request.params.id);
  const { project_code, project_name, project_leader, project_budget } =
    request.body;
  pool.query(
    "UPDATE project SET project_code = $1, project_name = $2, project_leader = $3, project_budget = $4 WHERE project_code",
    [project_code, project_name, project_leader, project_budget],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Project modified with ID: ${id}`);
    }
  );
};

const deleteProject = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(
    "DELETE FROM project WHERE project_code = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Project deleted with ID: ${id}`);
    }
  );
};

module.exports = {
  getProject,
  getSingleProject,
  createProject,
  updateProject,
  deleteProject,
};
