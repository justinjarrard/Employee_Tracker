const { createConnection } = require('mysql2')
const { prompt } = require('inquirer')
require('console.table')

const db = createConnection('mysql://root:rootroot@localhost/employees_db')

const start = () => {
  prompt([
    {
      type: 'list',
      name: 'action',
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

}

addRoles = () => {

}

addEmployees = () => {

}

viewDepartments = () => {
  db.query('SELECT * FROM departments', (err, data) => {
    if (err) { console.log(err) }

    console.table(data)
    start()
  })
}

viewRoles = () => {
  db.query('SELECT * FROM roles', (err, data) => {
    if (err) { console.log(err) }

    console.table(data)
    start()
  })
}

viewEmployees = () => {
  db.query('SELECT * FROM employees' (err, data) => {
    if (err) { console.log(err) }

    console.table(data)
    start()
  })
}

updateEmployeeRoles = () => {

}


