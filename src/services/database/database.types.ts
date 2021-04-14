import { Word } from '../../shared/types'

export interface Database {
  name: string
  firstLanguage: string
  secondLanguage: string
  dictionary: Word[]
  dictionaryLength: number
}
