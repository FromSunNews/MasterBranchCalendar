import { get, post } from "../base/base_api_req";
import { EventResponse } from "../common/response/event.response";

// const getUpcomingEvent = async (companyId: number ) => (await get<EventResponse[]>(`/event/query_event_by_day/${companyId}`)).result;

const getUpcomingEvent = async (data: { date: string }) => (await post<EventResponse[]>(`/event/query_event_by_day`, data));

const EventService = {
  getUpcomingEvent,
};

export default EventService;