export interface Word {
  firstLanguage: string
  secondLanguage: string
  description?: string
  img?: string
}

export interface Database {
  name: string
  firstLanguage: string
  secondLanguage: string
  dictionary: Word[]
}
