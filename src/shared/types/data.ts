export type Id = string

export interface Word {
  id: Id
  firstLanguage: string
  secondLanguage: string
  description?: string
  img?: string
  learned: boolean
  tags: string[]
}
