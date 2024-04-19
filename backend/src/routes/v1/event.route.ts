import express from 'express'
import { EventValidation } from '../../validations/event.validation'
import { EventController } from '../../controllers/event.controller'

const router = express.Router()

router.route('/query_event_by_day')
  .post(EventValidation.getTotalUpcomingEvent, EventController.getTotalUpcomingEvent)

router.route('/create_event')
  .post(EventValidation.createEvent, EventController.createEvent)

router.route('/delete_event/:id')
  .delete(EventController.deleteEvent)

export const eventRoutes = router
