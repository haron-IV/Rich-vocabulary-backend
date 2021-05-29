import { Router } from 'express'
import DatabaseService from '../../services/database/index.js'

class DatabaseController {
  router = Router()
  database = new DatabaseService()

  constructor() {
    this.router.get('/backup', async (req, res) => {
      this.database.backup(res)
    })

    this.router.get('/debug', async (req, res) => {
      this.database.debug()
    })

    this.router.post('/create', async ({ body }, res) => {
      this.database.initDatabase(body, res)
    })
  }
}

export default DatabaseController
