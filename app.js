const express = require('express')
const dependecies = require('./src/configs/server')
const db = require('./src/configs/db')
const app = express()
const api = require('./routes/index')

/** Server config */
const middlewares =  Object.values(dependecies)
middlewares.map((middleware) => app.use(middleware))

/**Db */
db.connectDb()

/** Routes API */
app.use(api)

const PORT = process.env.SERVER_PORT

app.listen(PORT, function () {
  console.log(`
    Successful server startup
    Running at http://localhost:${PORT}
  `)
})