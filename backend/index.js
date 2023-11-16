const connectToMongo = require('./db');
const express = require('express')
const cors = require('cors');
connectToMongo();


const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.use('/api/auth', require('./Routes/auth'));
app.use('/api/notes', require('./Routes/notes'));

app.get('/', (req, res) => {
  res.send('Hello Talha')
})

app.listen(port, () => {
  console.log(`Example app listening http://localhost:${port}`)
})