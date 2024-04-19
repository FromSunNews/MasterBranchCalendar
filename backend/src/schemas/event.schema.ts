import Joi from 'joi'

const getTotalUpcomingEventSchema = Joi.object({
  date: Joi.date().required().message('Date is required!')
})

const createEvent = Joi.object({
  title: Joi.string().required(),
  type: Joi.string().valid('BOOKING_CLIENT', 'WEBINAR_EVENT').required(),
  start_time: Joi.string().isoDate().required(),
  start_timestamp: Joi.number().required(),
  end_time: Joi.string().isoDate().required(),
  end_timestamp: Joi.number().required(),
  description: Joi.string().required(),
  location: Joi.string(),
  recurring: Joi.boolean().required(),
  recurring_pattern: Joi.string().valid('DAYLY', 'WEEKLY', 'MONTHLY', 'YEARLY'),
  primary_color: Joi.string().required(),
  background_color: Joi.string().required(),
  meeting_url: Joi.string(),
  profile_client_url: Joi.string(),
  profile_client_image: Joi.string()
});

export const eventSchema = {
  getTotalUpcomingEventSchema,
  createEvent,
}