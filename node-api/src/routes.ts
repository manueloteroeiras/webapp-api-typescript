import { Router } from 'express'

import {index} from './controllers/Users'

const router: Router = Router()

router.get('/', index)

export = router

