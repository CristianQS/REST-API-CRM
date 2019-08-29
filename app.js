const express = require('express')
const dependecies = require('./src/configs/server')
const db = require('./src/configs/db')
const app = express()

/** Server config */
const middlewares =  Object.values(dependecies)
middlewares.map((middleware) => app.use(middleware))

/**Db */
db.connectDb()

const PORT = process.env.SERVER_PORT

app.listen(PORT, function () {
  console.log(`
    Successful server startup
    Running at http://localhost:${PORT}
  `)
})