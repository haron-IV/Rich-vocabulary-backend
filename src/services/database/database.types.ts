import { Id, Word } from '../../shared/types'

export interface Database {
  name: string
  firstLanguage: string
  secondLanguage: string
  dictionaryLength: number
  dictionary: Word[]
  collections: Collection[]
}

export interface Collection {
  id: string
  name: string
  collectionLength: number
  words: Id[]
}
