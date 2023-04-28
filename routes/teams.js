import { Router } from "express"
import * as teamsCtrl from '../controllers/teams.js'
import { isLoggedIn } from "../middleware/middleware.js"

const router = Router()

router.get('/new', teamsCtrl.new)

router.get('/index', teamsCtrl.index)

router.get('/:teamId', teamsCtrl.show)

router.post('/', isLoggedIn, teamsCtrl.create)

router.post('/:teamId/comments', isLoggedIn, teamsCtrl.createComment)

router.delete('/:teamId', isLoggedIn, teamsCtrl.delete)

router.delete('/:teamId/comments/:commentId', isLoggedIn, teamsCtrl.deleteComment)

export { router }