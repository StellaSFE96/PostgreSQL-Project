CREATE TABLE project (
	project_id serial NOT NULL,
	project_code VARCHAR (50) PRIMARY KEY,
	project_name CHAR (50) NOT NULL,
	project_leader VARCHAR (50) NOT NULL,  
	project_budget VARCHAR (6) NOT NULL
);

CREATE TABLE department (
	department_id VARCHAR(4) PRIMARY KEY,
	department_name CHAR (50) NOT NULL
);

CREATE TABLE employee (
	employee_id VARCHAR(5) PRIMARY KEY,
	employee CHAR (50) NOT NULL,
	department_id VARCHAR(4) NOT NULL,
	FOREIGN KEY(department_id) REFERENCES department(department_id)
);

CREATE TABLE projectsandemployees (
	project_employee_id serial NOT NULL,
	project_code VARCHAR NOT NULL,
	employee_id VARCHAR(5) NOT NULL,
	hourly_wage INTEGER NOT NULL,
	FOREIGN KEY (project_code) REFERENCES project(project_code),
	FOREIGN KEY (employee_id) REFERENCES employee(employee_id)
);