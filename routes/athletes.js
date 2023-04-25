import { Router } from "express"
import * as athletesCtrl from '../controllers/athletes.js'

const router = Router()

router.get('/new', athletesCtrl.new)

router.post('/', athletesCtrl.create)

export { router }