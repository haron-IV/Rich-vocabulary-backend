import { Response } from 'express'
import { v4 as uuid } from 'uuid'
import { Id } from '../../shared/types/data.js'
import DatabaseService, { Collection } from '../database/index.js'

class CollectionService extends DatabaseService {
  public createCollection = (
    collection: Omit<Collection, 'Id'>,
    response: Response<unknown>
  ): void => {
    try {
      const db = this.getDatabase()
      db.collections.push({
        ...collection,
        id: uuid(),
        collectionLength: collection.words.length,
      })
      this.saveDatabase(db)
      response.status(200).json(`Collection: "${collection.name}" created.`)
    } catch {
      this.error.badRequest(response)
    }
  }

  public addWordsToCollection = (
    collection: { id: Id; words: Id[] },
    response: Response<unknown>
  ): void => {
    try {
      const db = this.getDatabase()
      const collectionToUpdateIndex = db.collections.findIndex(
        collectionEl => collectionEl.id === collection.id
      )
      const updatedCollection = [
        ...db.collections[collectionToUpdateIndex].words,
        ...collection.words,
      ]
      db.collections[collectionToUpdateIndex].words = updatedCollection
      this.saveDatabase(db)
      response.status(200).json('Words added')
    } catch {
      this.error.badRequest(response)
    }
  }
}

export default CollectionService
