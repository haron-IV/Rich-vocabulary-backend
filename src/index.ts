import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import json from 'body-parser'
import cors from 'cors'
import registerRoutes from './controllers/index.js'
import DatabaseService from './services/database/index.js'

const database = new DatabaseService()
database.initDatabase('test')
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
