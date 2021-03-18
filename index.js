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
        console.log ('Department Added!')
        start()
      })
    })
    .catch(err => console.log(err))
}

addRoles = () => {

  prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of the new role?'
    }, {
      type: 'input',
      name: 'salary',
      message: 'What is the salary of the role?'
    }
  ])
    .then(role => {
      db.query('INSERT INTO roles SET?', role, err => {
        if (err) { console.log(err) }
        console.log('Role Added!')
        start()
      })
    })
    .catch(err => console.log(err))
}

addEmployees = () => {
  prompt([
    {
      type: 'input',
      name: 'first_name',
      mesage: 'What is the new employees first name?'
    }, {
      type: 'input',
      name: 'last_name',
      message: 'What is the new employees last name?'
    }
  ])
    .then(employees => {
      db.query('INSERT INTO employee SET ?', employee, err =>{
        if (err) { console.log(err) }
        console.log('Employee Added!')
        start()
      })
    })
    .catch(err => console.log(err))
}

viewDepartments = () => {
  db.query('SELECT * FROM departments', (err, departments) => {
    if (err) { console.log(err) }

    console.table(departments)
    start()
  })
}

viewRoles = () => {
  db.query('SELECT * FROM roles', (err, roles) => {
    if (err) { console.log(err) }

    console.table(roles)
    start()
  })
}

viewEmployees = () => {
  db.query('SELECT * FROM employees', (err, employees) => {
    if (err) { console.log(err) }

    console.table(employees)
    start()
  })
}

updateEmployeeRoles = () => {
  db.query('SELECT * FROM employees', (err, employees) => {
    prompt([
      {
        type: 'list',
        name: 'name',
        message: 'Select an employee to update their role:',
        choices: employee.map()
      }, {
        type: 'input',
        name: 'title',
        message: 'What is the new employees new role?'
      }
    ])
      .then(({ name, title }) => {
        db.query('UPDATE employee SET ? WHERE ?', [{ title}, { name }],
        err => {
          if (err) {console.log(err) }
          console.log('Role has been updated!')
          start()
        })
      }) 
    })
  }

start()


