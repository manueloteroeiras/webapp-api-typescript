import { Router } from 'express'

import {authenticate, getMe} from './controllers/Users'

const router: Router = Router()

router.post('/authenticate', authenticate)
router.get('/users/me', getMe)

export = router

