import { NextFunction, Request, Response } from 'express'
import { eventSchema } from '../schemas/event.schema'
import { HttpStatusCode } from '../assets/utilities/constants'

const getTotalUpcomingEvent = async (req: Request, res: Response, next: NextFunction) => {
  const condition = eventSchema.getTotalUpcomingEventSchema
  try {
    console.log('Start validate')
    await condition.validateAsync(req.body, { abortEarly: false })
    console.log('Pass validate')
    next()
  } catch (error) {
    if (error instanceof Error) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        errors: error
      })
    }
  }
}


const createEvent = async (req: Request, res: Response, next: NextFunction) => {
  const condition = eventSchema.createEvent
  try {
    console.log('Start validate')
    await condition.validateAsync(req.body, { abortEarly: false })
    console.log('Pass validate')
    next()
  } catch (error) {
    if (error instanceof Error) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        errors: error
      })
    }
  }
}




export const EventValidation = {
  getTotalUpcomingEvent,
  createEvent
}
