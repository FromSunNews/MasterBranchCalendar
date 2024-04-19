import { HttpStatusCode } from '../assets/utilities/constants'
import { EventService } from '../services/event.service'
import { Request, Response } from 'express'

const getTotalUpcomingEvent = async (req: Request, res: Response) => {
  try {
    const result = await EventService.getTotalUpcomingEvent(req.body)
    res.status(HttpStatusCode.OK).json(result)
  } catch (error) {
    if (error instanceof Error) {
      res.status(HttpStatusCode.INTERNAL_SERVER).json({
        errors: error.message
      })
    }
  }
}

const createEvent = async (req: Request, res: Response) => {
  try {
    const result = await EventService.createEvent(req.body)
    res.status(HttpStatusCode.OK).json(result)
  } catch (error) {
    if (error instanceof Error) {
      res.status(HttpStatusCode.INTERNAL_SERVER).json({
        errors: error.message
      })
    }
  }
}

const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const result = await EventService.deleteEvent(id)
    res.status(HttpStatusCode.OK).json(result)
  } catch (error) {
    if (error instanceof Error) {
      res.status(HttpStatusCode.INTERNAL_SERVER).json({
        errors: error.message
      })
    }
  }
}

export const EventController = {
  getTotalUpcomingEvent,
  deleteEvent,
  createEvent
}
