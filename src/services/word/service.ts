import { Id, Word } from '../../shared/types/index.js'
import DatabaseService, { Database } from '../database/index.js'
import { v4 as uuid } from 'uuid'
import ErrorService from '../error/index.js'
import { Response } from 'express'

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

  private decreaseDictionaryCount = (db: Database) => {
    db.dictionaryLength--
  }

  private increaseDictionaryCount = (db: Database) => {
    db.dictionaryLength++
  }

  public addWord = (word: Word, response: Response<unknown>): void => {
    try {
      const db = this.getDatabase()
      const isWordExist = this.checkIfWordExist(db.dictionary, word)
      if (isWordExist)
        return this.error.resourceExist(
          response,
          `Word: ${word.firstLanguage} - ${word.secondLanguage} exist.`
        )
      const newWord = {
        ...word,
        id: uuid(),
        learned: false,
      }

      db.dictionary.push(newWord)
      this.increaseDictionaryCount(db)
      this.saveDatabase(db)
      response.status(200).json(`Word added.`)
    } catch (err) {
      this.error.resourceExist(
        response,
        `${word.firstLanguage} : ${word.secondLanguage} - Word exist.`
      )
    }
  }

  public getWords = (response: Response<unknown>): void => {
    try {
      const { dictionary } = this.getDatabase()
      response.status(200).json(dictionary)
    } catch (err) {
      this.error.badRequest(response, err)
    }
  }

  public getWordById = (id: Id, response: Response<unknown>): void => {
    try {
      const { dictionary } = this.getDatabase()
      const foundWord = dictionary.find(word => word.id === id)
      response.status(200).json(foundWord)
    } catch (err) {
      this.error.resourceDoNotExist(
        response,
        `Word with id: ${id} does not exist.`
      )
    }
  }

  public removeWordById = (id: Id, response: Response<unknown>): void => {
    try {
      const db = this.getDatabase()
      const removedWord = db.dictionary.find(word => word.id === id)
      if (!removedWord)
        return this.error.resourceDoNotExist(
          response,
          `Word with id: ${id} doesn't exist`
        )

      const filteredDictionary = db.dictionary.filter(word => word.id !== id)

      db.dictionary = filteredDictionary
      this.decreaseDictionaryCount(db)
      this.saveDatabase(db)
      response.status(200).json(removedWord)
    } catch (err) {
      this.error.badRequest(response, err)
    }
  }

  public getDictionaryLength = (response: Response<unknown>): void => {
    try {
      const db = this.getDatabase()
      response.status(200).json({ dictionaryLength: db.dictionaryLength })
    } catch (err) {
      this.error.badRequest(response, err)
    }
  }

  public markWordAsLearned = (id: Id, response: Response<unknown>): void => {
    try {
      const db = this.getDatabase()
      const { dictionary } = db

      const learnedWord = dictionary.find(word =>
        word.id === id ? word : null
      )
      if (!learnedWord)
        return this.error.resourceDoNotExist(
          response,
          `Word with id "${id} doesn't exist."`
        )

      learnedWord.learned = true
      db.dictionary = dictionary.filter(word =>
        word.id === learnedWord?.id ? null : word
      )
      this.decreaseDictionaryCount(db)
      db.learned.push(learnedWord)

      this.saveDatabase(db)
      response.status(200).json(`Word correctly marked as learned.`)
    } catch (err) {
      this.error.badRequest(response, err)
    }
  }
}

export default WordService
