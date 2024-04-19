import { EventResponse } from "../../api/common/response/event.response";

export interface EventState {
  upcomingEvents: EventResponse[];
  totalUpcomingEvents: EventResponse[][];
  isLoading: boolean;
}