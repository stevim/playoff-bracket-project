import { Router } from "express"
import * as athletesCtrl from '../controllers/athletes.js'
import { isLoggedIn } from "../middleware/middleware.js"

const router = Router()

router.get('/new', athletesCtrl.new)

router.get('/index', athletesCtrl.index)

router.get('/:athleteId', athletesCtrl.show)

router.post('/', athletesCtrl.create)

router.post('/:athleteId/comments', athletesCtrl.createComment)

router.delete('/:athleteId', isLoggedIn, athletesCtrl.delete)

router.delete('/:athleteId/comments/:commentId', isLoggedIn, athletesCtrl.deleteComment)


export { router }