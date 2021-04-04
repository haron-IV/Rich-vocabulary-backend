import express from 'express'
import DatabaseController from './database/index.js'
import WordController from './word/index.js'

interface Routes {
  path: string
  route: express.Router
}

const routes: Routes[] = [
  {
    path: '/database',
    route: new DatabaseController().router,
  },
  {
    path: '/word',
    route: new WordController().router,
  },
]

const registerRoutes = (app: express.Application): void => {
  for (const { path, route } of routes) {
    app.use(path, route)
  }
  console.log('Routes registered.')
}

export default registerRoutes
