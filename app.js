const express = require('express')
const app = express()

const PORT = 3000

app.listen(PORT, function () {
  console.log(`
    Successful server startup
    Running at http://localhost:${PORT}
  `)
})