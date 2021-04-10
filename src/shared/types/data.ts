export interface Id {
  id: string
}
export interface Word extends Id {
  firstLanguage: string
  secondLanguage: string
  description?: string
  img?: string
  learned: boolean
  tags: string[]
}
