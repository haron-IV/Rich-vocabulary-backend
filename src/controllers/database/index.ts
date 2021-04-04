import { Router } from 'express'

class DatabaseController {
  router = Router()
  constructor() {
    this.router.get('/test', async (req, res) => {
      res.status(200).json({ test: 'done' })
    })
  }
}

export default DatabaseController
