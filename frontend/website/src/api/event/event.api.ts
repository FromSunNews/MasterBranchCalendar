import { post } from "../base/base_api_req";
import { EventRequest } from "../common/request/event.request";
import { EventResponse } from "../common/response/event.response";

// const getUpcomingEvent = async (companyId: number ) => (await get<EventResponse[]>(`/event/query_event_by_day/${companyId}`)).result;

const getUpcomingEvent = async (data: EventRequest) => (await post<EventResponse[][]>(`/event/query_event_by_day`, data));

const EventService = {
  getUpcomingEvent,
};

export default EventService;