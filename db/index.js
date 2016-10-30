const mysql = require('mysql')
const user = require('../user')

const CREATE_TASK = 'INSERT INTO tasks (name, parent, project, hasChildren, priority, accountId) values (?, ?, ?, ?, ?, ?)'
const db = mysql.createConnection({ //Connect to Mysql database
  host: '127.0.0.1',
  user: 'root',
  password: 'marsisaredplanet',
  database: 'bloktree'
})

db.connect((err)=> {
  if (err)
  console.error(err)
  console.log('Database connection established')
})

module.exports = {
  getUsers: (callback) => {
    db.query('SELECT * FROM users', (err, users) => {
      if (err) callback(err)
      let all = []
      for (i in users) {
        let user = {
          '_id': users[i].id,
          'name': users[i].username,
          'password': users[i].password
        }
        all.push(user)
      }
      callback(null, all)
    })
  },
  createUser: (username, password, callback) => {
    db.query('INSERT INTO users (username, password) VALUES (?,?)', [username, password], (err) => {
      if (err) {
        callback(err, false)
      } else {
        callback(null, true)
      }
    })
  },
  getUser: (username, callback) => {
    db.query('SELECT * FROM users WHERE username = ?', username, (err, user) => {
      if (err) callback(err)

      if (user.length > 0)
        callback(null, user[0])
      else
        callback(null, false)
    });
  },
  deleteUser: (id, callback) => {
    const DELETE_USER = 'DELETE FROM users WHERE id = ?'
    db.query(DELETE_USER, id, (err) => {
      if (err) callback(err)
      callback(null, true)
    })
  },
  createTask(userId, task, callback) {
    const data = [ task.name,
                 task.parent,
                 task.project,
                 task.hasChildren,
                 task.priority,
                 user.id ]
    db.query(CREATE_TASK, data, (err) => {
      if (err) callback(err)

      callback(null, true)
    })
  },
  editTask(task, callback) {
    const EDIT_TASK = 'UPDATE tasks SET name = ?, parent = ?, hasChildren = ?, priority = ? WHERE id = ?'
    const data = [
      task.name,
      task.parent,
      task.hasChildren,
      task.priority,
      user.id
    ]
    db.query(EDIT_TASK, data, (err) => {
      if (err) callback(err, false)
      callback(null, true)
    })
  },
  deleteTask(taskId, callback) {
    const data = [taskId, user.id]
    const DELETE_TASK = 'DELETE FROM tasks WHERE id = ? AND accountId = ?'
    db.query(DELETE_TASK, data, (err) => {
      if (err) callback(err, false)
      callback(null, true)
    })
  },
  getAllTasks (callback) {
    const userId = user.id
    const GET_ALL_TASKS = 'SELECT * FROM tasks WHERE accountId = ?'
    db.query(GET_ALL_TASKS, userId, (err, tasks) => {
      if (err) callback(err)
      else callback(null, tasks)
    })
  }
}
