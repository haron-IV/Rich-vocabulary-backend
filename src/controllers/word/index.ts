import { Router } from 'express'
import WordService from '../../services/word/service.js'

class WordController {
  router = Router()
  word = new WordService()

  constructor() {
    this.router.post('/add', async ({ body }, res) => {
      try {
        this.word.addWord(body)
        res.status(200).json(`Word added.`)
      } catch (err) {
        res.status(400).json(err)
      }
    })
  }
}

export default WordController
