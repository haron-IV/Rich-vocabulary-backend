import { readFileSync, writeFileSync } from 'node:fs'
import { Database as DatabaseInterface, Word } from './database.types'

class Database {
  private databaseFilePath

  constructor(name = 'database') {
    this.databaseFilePath = `${process.cwd()}/src/database/${name}.json`
  }

  private getDatabase = (): DatabaseInterface =>
    JSON.parse(readFileSync(this.databaseFilePath, 'utf8'))

  private saveDatabase = (database: DatabaseInterface) => {
    writeFileSync(this.databaseFilePath, JSON.stringify(database))
  }

  private checkIfWordExist = (dictionary: Word[], word: Word) => {
    const foundWord = dictionary.find(
      ({ firstLanguage, secondLanguage }) =>
        firstLanguage === word.firstLanguage ||
        secondLanguage === word.secondLanguage
    )

    return Boolean(foundWord)
  }

  addWord = (word: Word) => {
    const db = this.getDatabase()
    const isWordExist = this.checkIfWordExist(db.dictionary, word)
    if (isWordExist) {
      console.log(`Word: ${word.firstLanguage} - ${word.secondLanguage} exist.`)
      return
    }
    db.dictionary.push(word)
    this.saveDatabase(db)
  }
}

export default Database
