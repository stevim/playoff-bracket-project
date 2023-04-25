import { Router } from 'express'
import * as pagesCtrl from "../controllers/pages.js"
import { isLoggedIn } from "../middleware/middleware.js"

const router = Router()

// GET localhost:3000/pages
router.get('/', pagesCtrl.index)
// GET localhost:3000/pages/new
router.get('/new', isLoggedIn, pagesCtrl.new)
// GET localhost:3000/pages/:pageId
router.get('/:pageId', pagesCtrl.show)
// GET localhost:3000/pages/:pageId/edit
router.get('/:pageId/edit', isLoggedIn, pagesCtrl.edit)
// POST localhost:3000/pages
router.post('/', isLoggedIn, pagesCtrl.create)
// POST localhost:3000/pages/:pageId/comments
router.post('/:pageId/comments', pagesCtrl.createComment)
// POST localhost:3000/pages/:pageId/teams
router.post('/:pageId/teams', isLoggedIn, pagesCtrl.addToFavTeams)
// POST localhost:3000/pages/:pageId/athletes
router.post('/:pageId/athletes', isLoggedIn, pagesCtrl.addToFavAthletes)
// DELETE localhost:3000/pages/:pageId
router.delete('/:pageId', isLoggedIn, pagesCtrl.delete)
// DELETE localhost:3000/pages/:pageId/comments/:commentId
router.delete('/:pageId/comments/:commentId', isLoggedIn, pagesCtrl.deleteComment)
// DELETE localhost:3000/pages/:pageId/teams/:teamId
router.delete('/:pageId/teams/:teamId', isLoggedIn, pagesCtrl.deleteTeam)
// DELETE localhost:3000/pages/:pageId/athletes/:athleteId
router.delete('/:pageId/athletes/:athleteId', isLoggedIn, pagesCtrl.deleteAthlete)

// PUT localhost:3000/pages/:pageId
router.put('/:pageId', pagesCtrl.update)


export {
  router
}