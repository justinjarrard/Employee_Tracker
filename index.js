const { createConnection } = require('mysql2')
const { prompt } = require('inquirer')
require('console.table')

const db = createConnection('mysql://root:rootroot@localhost/employees_db')

const start = () => {
  prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'Select action:',
      choices: ['Add departments', 'Add roles', 'Add employees', 'View departments', 'View roles', 'View employees', 'Update employee roles', 'Exit']
    }
  ])
    .then(({ choice }) => {
      switch (choice) {
        case 'Add departments':
          addDepartments()
          break
        case 'Add roles':
          addRoles()
          break
        case 'Add employees':
          addEmployees()
          break
        case 'View departments':
          viewDepartments()
          break
        case 'View roles':
          viewRoles()
          break
        case 'View employees':
          viewEmployees()
          break
        case 'Update employee roles':
          updateEmployeeRoles()
          break
        case 'Exit':
          process.exit()
      }
    })
}

addDepartments = () => {
  prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the new department name?'
    }
  ])
    .then(department => {
      db.query('INSERT INTO departments SET ?' department, err => {
        if (err) { console.log(err) }
        console.log('Department Added!')
        start()
      })
    })
    .catch(err => console.log(err))
}

addRoles = () => {

  db.query('SELECT * FROM departments', (err, departments) => {

    if (err) { console.log(err) }

    prompt([
      {
        type: 'list',
        name: 'selDept',
        message: 'choose a department to receive a new role?'
      }, {
        type: 'input',
        name: 'name',
        message: 'Enter the name of the new role?'
      }, {
        type: 'number',
        name: 'salary',
        message: 'Enter salary for new role'
      }
    ])
      .then(res => {
        let newRole = {
          title: res.name,
          salary: res.salary,
          department_id: res.selDept
        }
        db.query('INSERT INTO roles SET ?', newRole, err => {
          if (err) { console.log(err) }
          console.log('Role Added!')
          start()
        })
      })
      .catch(err => console.log(err))
  }

addEmployees = () => {

      db.query(`SELECT employees.id AS 'employeeID', CONCAT(employees.first_name, ' ', employees.last_name) AS name FROM employees`, (err, employees) => {

        if (err) { console.log(err) }

        db.query(`SELECT * FROM roles`, (err, roles) => {

          prompt([
            {
              type: 'input',
              name: 'firstName',
              mesage: 'What is the new employees first name?'
            }, {
              type: 'input',
              name: 'lastName',
              message: 'What is the new employees last name?'
            }, {
              type: 'list',
              name: 'role',
              message: 'Choose their role:',
              choices: roles.map(data => ({
                name: data.title,
                value: data.id
              }))
            }, {
              type: 'confirm',
              name: 'bool',
              message: 'Does the employee have a manager?'
            }, {
              type: 'list',
              name: 'manager',
              message: `Choose the employee's manager:`,
              when function(answers) { return answers.bool },
              choices: employees.map(data => ({
                name: data.name,
                value: data.employeeID
              }))
            }
          ])
            .then(res => {
              let newEmployee = {
                first_name: res.firstName,
                last_name: res.lastName,
                role_id: res.role,
                manager_id: res.manager || null
              }
              db.query('INSERT INTO employee SET ?', newEmployee, err => {
                if (err) { console.log(err) }
                console.log('Employee Added!')
                start()
              })
            })
            .catch(err => console.log(err))
        }

viewDepartments = () => {
            db.query('SELECT name FROM departments', (err, departments) => {
              if (err) { console.log(err) }

              console.table(departments)
              start()
            })
          }

viewRoles = () => {
            db.query('SELECT title, salary FROM roles', (err, roles) => {
              if (err) { console.log(err) }

              console.table(roles)
              start()
            })
          }

viewEmployees = () => {
            db.query('SELECT CONCAT(employees.first_name, ' ', employees.last_name) AS name, roles.title, roles.salary,
  departments.name AS 'department', CONCAT(manager.first_name, ' ', manager.last_name) AS manager
  FROM employees
  LEFT JOIN roles ON employees.role_id = roles.id
  LEFT JOIN departments ON roles.department_id = departments.id
  LEFT JOIN employees manager ON manager.id = employees.manager_id; ', (err, employees) => {
            if (err) { console.log(err) }

            console.table(employees)
            start()
          })
      }

updateEmployeeRoles = () => {
          db.query(`SELECT id, CONCAT(employees.first_name, ' ', employees.last_name) AS name FROM employees`, (err, employees) => {
            if (err) { console.log(err) }
            db.query('SELECT * FROM roles', (err, employeeRoles) => {
              prompt([
                {
                  type: 'list',
                  name: 'selEmployee',
                  message: 'Select an employee to update their role:',
                  choices: employee.map(data => ({
                    name: data.name,
                    value: data.id
                  }))
                }, {
                  type: 'input',
                  name: 'selRole',
                  message: 'What is the new employees new role?',
                  choices: roles.map(data => ({
                    name: data.title,
                    value: data.id
                  }))
                }
              ])
                .then(({ name, title }) => {
                  db.query('UPDATE employee SET role_id WHERE id = ?', [res.selRole, res.selEmployee], err => {
                    if (err) { console.log(err) }
                      console.log('Role has been updated!')
                      start()
                    })
                })
                catch(err => console.log(err))
              })
            })
          }

start()


