import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { Database as DatabaseInterface } from './database.types'

class DatabaseService {
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

  private setDatabase = (name: string) => {
    this.databaseName = name
    this.databaseFilePath = `${process.cwd()}/database/${name}.json`
  }

  public initDatabase = (name: string): void => {
    this.setDatabase(name)
    const databaseExist = this.checkDatabaseExist()
    if (databaseExist) return
    const databaseTemplate = this.getDatabaseTemplate()
    databaseTemplate.name = name
    writeFileSync(this.databaseFilePath, JSON.stringify(databaseTemplate))
    console.log(`New database created with name: ${name}`)
  }

  public getDatabase = (): DatabaseInterface =>
    JSON.parse(readFileSync(this.databaseFilePath, 'utf8'))

  public saveDatabase = (database: DatabaseInterface): void => {
    writeFileSync(this.databaseFilePath, JSON.stringify(database))
  }
}

export default DatabaseService
