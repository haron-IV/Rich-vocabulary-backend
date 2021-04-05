import { Word } from '../../shared/types/services.js'
import DatabaseService from '../database/index.js'
import { v4 as uuid } from 'uuid'
import ErrorService from '../error/index.js'

class WordService extends DatabaseService {
  error = new ErrorService()

  private checkIfWordExist = (dictionary: Word[], word: Word) => {
    const foundWord = dictionary.find(
      ({ firstLanguage, secondLanguage }) =>
        firstLanguage === word.firstLanguage ||
        secondLanguage === word.secondLanguage
    )

    return Boolean(foundWord)
  }

  public addWord = (word: Word, response: any): void => {
    try {
      const db = this.getDatabase()
      const isWordExist = this.checkIfWordExist(db.dictionary, word)
      if (isWordExist)
        throw new Error(
          `Word: ${word.firstLanguage} - ${word.secondLanguage} exist.`
        )

      word.id = uuid()
      db.dictionary.push(word)
      this.saveDatabase(db)
      response.status(200).json(`Word added.`)
    } catch (err) {
      this.error.resourceExist(
        response,
        `${word.firstLanguage} : ${word.secondLanguage} - Word exist.`
      )
    }
  }

  public getWords = (response: any): void => {
    try {
      const { dictionary } = this.getDatabase()
      response.status(200).json(dictionary)
    } catch (err) {
      this.error.badRequest(response, err)
    }
  }

  public removeWordById = (body: any, response: any): void => {
    try {
      const db = this.getDatabase()
      const removedWord = db.dictionary.find(word => word.id === body.id)
      const filteredDictionary = db.dictionary.filter(
        word => word.id !== body.id
      )
      db.dictionary = filteredDictionary
      this.saveDatabase(db)
      response.status(200).json(removedWord)
    } catch (err) {
      this.error.badRequest(response, err)
    }
  }
}

export default WordService
