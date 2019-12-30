const express = require('express')
const path = require('path')

let app = express()
const indexPath = path.join(__dirname, 'dist')
const port = process.env.PORT || 8000

app.use(express.static(indexPath))

app.listen(port, () => {
  console.log(`App started on port ${port}`)
})

app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, 'dist/index.html'))
})
