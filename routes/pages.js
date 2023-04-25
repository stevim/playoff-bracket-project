import { Router } from 'express'
import * as pagesCtrl from "../controllers/pages.js"

const router = Router()

// GET localhost:3000/pages
router.get('/', pagesCtrl.index)
// GET localhost:3000/pages/new
router.get('/new', pagesCtrl.new)
// GET localhost:3000/pages/:pageId
router.get('/:pageId', pagesCtrl.show)
// GET localhost:3000/pages/:pageId/edit
router.get('/:pageId/edit', pagesCtrl.edit)
// POST localhost:3000/pages
router.post('/', pagesCtrl.create)
// POST localhost:3000/pages/:pageId/comments
router.post('/:pageId/comments', pagesCtrl.createComment)
// POST localhost:3000/pages/:pageId/teams
router.post('/:pageId/teams', pagesCtrl.addToFavTeams)
// DELETE localhost:3000/pages/:pageId
router.delete('/:pageId', pagesCtrl.delete)
// DELETE localhost:3000/pages/:pageId/comments/:commentId
router.delete('/:pageId/comments/:commentId', pagesCtrl.deleteComment)
// PUT localhost:3000/pages/:pageId
router.put('/:pageId', pagesCtrl.update)


export {
  router
}