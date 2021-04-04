import { Word } from '../../shared/types/services.js'
import DatabaseService from '../database/index.js'

class WordService extends DatabaseService {
  private checkIfWordExist = (dictionary: Word[], word: Word) => {
    const foundWord = dictionary.find(
      ({ firstLanguage, secondLanguage }) =>
        firstLanguage === word.firstLanguage ||
        secondLanguage === word.secondLanguage
    )

    return Boolean(foundWord)
  }

  addWord = (word: Word): void => {
    const db = this.getDatabase()
    const isWordExist = this.checkIfWordExist(db.dictionary, word)
    if (isWordExist) {
      throw new Error(
        `Word: ${word.firstLanguage} - ${word.secondLanguage} exist.`
      )
    }
    db.dictionary.push(word)
    this.saveDatabase(db)
  }
}

export default WordService
