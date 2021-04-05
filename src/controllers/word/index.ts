import { Router } from 'express'
import ErrorService from '../../services/error/index.js'
import WordService from '../../services/word/index.js'

const error = new ErrorService()
class WordController {
  router = Router()
  word = new WordService()

  constructor() {
    this.router.post('/add', async ({ body }, res) => {
      try {
        this.word.addWord(body)
        res.status(200).json(`Word added.`)
      } catch (err) {
        error.resourceExist(
          res,
          `${body.firstLanguage} : ${body.secondLanguage} - Word exist.`
        )
      }
    })
  }
}

export default WordController
