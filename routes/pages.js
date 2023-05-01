import { Router } from 'express'
import * as pagesCtrl from "../controllers/pages.js"
import { isLoggedIn } from "../middleware/middleware.js"

const router = Router()


router.get('/', pagesCtrl.index)

router.get('/new', isLoggedIn, pagesCtrl.new)

router.get('/:pageId', pagesCtrl.show)

router.get('/:pageId/edit', isLoggedIn, pagesCtrl.edit)

router.post('/', isLoggedIn, pagesCtrl.create)

router.post('/:pageId/comments', isLoggedIn, pagesCtrl.createComment)

router.post('/:pageId/teams', isLoggedIn, pagesCtrl.addToFavTeams)

router.post('/:pageId/athletes', isLoggedIn, pagesCtrl.addToFavAthletes)

router.delete('/:pageId', isLoggedIn, pagesCtrl.delete)

router.delete('/:pageId/comments/:commentId', isLoggedIn, pagesCtrl.deleteComment)

router.delete('/:pageId/teams/:teamId', isLoggedIn, pagesCtrl.deleteTeam)

router.delete('/:pageId/athletes/:athleteId', isLoggedIn, pagesCtrl.deleteAthlete)

router.put('/:pageId', pagesCtrl.update)


export {
  router
}