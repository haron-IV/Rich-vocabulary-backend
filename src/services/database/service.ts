import { Response } from 'express'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import ErrorService from '../error/index.js'
import { Database as DatabaseInterface, InitDatabase } from './database.types'

class DatabaseService {
  error = new ErrorService()
  public databaseName = 'database'
  private databaseFilePath = `${process.cwd()}/database/database.json` // TODO: make database switchable
  private databaseTemplateFilePath = `${process.cwd()}/database/database-template.json`

  private getDatabaseTemplate = (): DatabaseInterface =>
    JSON.parse(readFileSync(this.databaseTemplateFilePath, 'utf8'))

  private checkDatabaseExist = () => {
    try {
      if (existsSync(this.databaseFilePath)) return true
      return false
    } catch {
      return false
    }
  }

  public setDatabase = (name: string, response?: Response<unknown>): void => {
    //TODO: validation, success response
    this.databaseName = name
    this.databaseFilePath = `${process.cwd()}/database/${name}.json`
  }

  public initDatabase = (
    { name = 'database', firstLanguage, secondLanguage = '' }: InitDatabase,
    response: Response<unknown>
  ): void => {
    this.setDatabase(name)
    const databaseExist = this.checkDatabaseExist()
    if (databaseExist)
      return this.error.resourceExist(response, 'Database exist')
    const databaseTemplate = this.getDatabaseTemplate()
    const database = {
      ...databaseTemplate,
      name,
      config: { firstLanguage, secondLanguage },
    }
    writeFileSync(this.databaseFilePath, JSON.stringify(database))
    console.log(`New database created with name: ${name}`)
  }

  public getDatabase = (): DatabaseInterface =>
    JSON.parse(readFileSync(this.databaseFilePath, 'utf8'))

  public saveDatabase = (database: DatabaseInterface): void => {
    writeFileSync(this.databaseFilePath, JSON.stringify(database))
  }

  public backup = (response: Response<unknown>): void => {
    try {
      const db = this.getDatabase()
      const date = new Date()
      const backupPath = `${
        this.databaseFilePath.split(`.json`)[0]
      }_${date.getDate()}-${date.getMonth()}-${date.getFullYear()}-${date.getTime()}.json`
      writeFileSync(backupPath, JSON.stringify(db))
      response.status(200).json(`Backup made in: ${backupPath}`)
    } catch (err) {
      this.error.badRequest(response, 'Backup did not made.')
    }
  }

  public debug = () => {}
}

export default DatabaseService
