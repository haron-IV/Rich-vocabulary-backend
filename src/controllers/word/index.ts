import { Router } from 'express'
import WordService from '../../services/word/index.js'

class WordController {
  router = Router()
  word = new WordService()

  constructor() {
    this.router.post('/add', async ({ body }, res) => {
      this.word.addWord(body, res)
    })

    this.router.get('/all', async (_, res) => {
      this.word.getWords(res)
    })

    this.router.delete('/delete', async ({ body }, res) => {
      this.word.removeWordById(body, res)
    })

    this.router.get('/by-id', async ({ body }, res) => {
      this.word.getWordById(body, res)
    })
  }
}

export default WordController
