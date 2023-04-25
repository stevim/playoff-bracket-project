import { Router } from "express"
import * as teamsCtrl from '../controllers/teams.js'

const router = Router()

router.get('/new', teamsCtrl.new)

router.post('/', teamsCtrl.create)

router.delete('/:pageId/teams/:teamId', teamsCtrl.delete)

export { router }