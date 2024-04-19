import express from 'express'

// Import from utils
import { eventRoutes } from './event.route'
import { HttpStatusCode } from '../../assets/utilities/constants'


const router = express.Router()

router.get('/status', (req, res) => res.status(HttpStatusCode.OK).json({ status: 'OK!' }))

router.use('/event', eventRoutes)


export const apiV1 = router
