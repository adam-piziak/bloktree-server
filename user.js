module.exports = (connection){
  getUsers: () => {
    connection.query('SELECT * FROM users', (err, rows) => {
      for (user in rows)
        console.log(rows[user].username)
    })
  }
}
