import { Router } from 'express'
import * as bracketsCtrl from "../controllers/brackets.js"

const router = Router()

router.get('/', bracketsCtrl.index)


export {
  router
}