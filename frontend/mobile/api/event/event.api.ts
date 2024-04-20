import { deleteRequest, post } from "../base/base_api_req";
import { CreateEventRequest, EventRequest } from "../common/request/event.request";
import { EventResponse } from "../common/response/event.response";

// const getUpcomingEvent = async (companyId: number ) => (await get<EventResponse[]>(`/event/query_event_by_day/${companyId}`)).result;

const getUpcomingEvent = async (data: EventRequest) => (await post<EventResponse[][]>(`/event/query_event_by_day`, data)).result;
const createEvent = async (data: CreateEventRequest) => (await post<string>(`/event/create_event`, data)).result;
const deleteEvent = async (id: string) => (await deleteRequest<string>(`/event/delete_event/${id}`)).result;

const EventService = {
  getUpcomingEvent,
  deleteEvent,
  createEvent
};

export default EventService;