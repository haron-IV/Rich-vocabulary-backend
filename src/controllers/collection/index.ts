import { Router } from 'express'
import CollectionService from '../../services/collection/service.js'

class DatabaseController {
  router = Router()
  collectionService = new CollectionService()

  constructor() {
    this.router.post('/add', async (req, res) => {
      this.collectionService.createCollection(req.body, res)
    })

    this.router.post('/add-to-collection', async (req, res) => {
      this.collectionService.addWordsToCollection(req.body, res)
    })
  }
}

export default DatabaseController
