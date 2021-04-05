import { Router } from 'express'
import DatabaseService from '../../services/database/index.js'

class DatabaseController {
  router = Router()
  database = new DatabaseService()

  constructor() {
    this.router.get('/backup', async (req, res) => {
      this.database.backup(res)
    })
  }
}

export default DatabaseController
