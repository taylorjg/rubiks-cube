const path = require('path')
const express = require('express')

const PORT = process.env.PORT || 3040
const PUBLIC_FOLDER = path.join(__dirname, 'public')

const app = express()
app.use(express.static(PUBLIC_FOLDER))

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))
