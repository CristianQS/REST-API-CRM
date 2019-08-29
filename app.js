const express = require('express')
const dependecies = require('./src/configs/server')
const app = express()

/** Server config */
const middlewares =  Object.values(dependecies)
middlewares.map((middleware) => app.use(middleware))

const PORT = 3000

app.listen(PORT, function () {
  console.log(`
    Successful server startup
    Running at http://localhost:${PORT}
  `)
})