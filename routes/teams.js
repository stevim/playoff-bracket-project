import { Router } from "express"
import * as teamsCtrl from '../controllers/teams.js'

const router = Router()


router.post('/', teamsCtrl.create)

export { router }