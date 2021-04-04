import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import json from 'body-parser'
import cors from 'cors'
import registerRoutes from './controllers/index.js'

const app = express()
app.use(json())
app.use(cors())

app.listen(2200, () => {
  registerRoutes(app)
})

// import Database from './services/database/index.js'

// const db = new Database()

// db.addWord({
//   firstLanguage: 'Yellow',
//   secondLanguage: 'żółty',
//   description: 'kolor żółty',
//   img: '',
// })
