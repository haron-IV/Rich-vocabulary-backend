import Database from './database/index.js'

const db = new Database()

db.addWord({
  firstLanguage: 'Yellow',
  secondLanguage: 'żółty',
  description: 'kolor żółty',
  img: '',
})
