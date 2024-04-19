import React from "react";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUpcomingEvent,
  selectUpcomingEvents,
} from "../../redux/event/event_slice";
import { EventResponse } from "../../api/common/response/event.response";
import CardEvent from "../card-event/CardEvent";
import { selectCurrentDate } from "../../redux/global/global_slice";

function UpcomingEvent() {
  const upcomingEvents = useSelector(selectUpcomingEvents);
  const currentDate = useSelector(selectCurrentDate);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(updateUpcomingEvent({ date: currentDate }));
  }, []);

  return (
    <div className="grid-cols-12 border border-gray-200 rounded-md px-4 text-sm pb-10">
      <div className="flex flex-row content-center justify-between mt-3">
        <div className="flex-grow">
          <div className="font-extrabold text-blue-600 text-lg">
            Upcoming Events
          </div>
          <div className="text-gray-400 text-sm font-bold">
            {format(currentDate, "iii, dd LLL")}
          </div>
        </div>

        <div className="text-xs text-white flex flex-col">
          <button className="h-8 w-20 bg-blue-600 hover:bg-blue-700 rounded-2xl">
            View All
          </button>
          <button className="h-8 w-20 mt-1 bg-blue-600 hover:bg-blue-700 rounded-2xl">
            Create
          </button>
        </div>
      </div>

      {upcomingEvents.map((event: EventResponse) => {
        return (
          <CardEvent
            key={event.id}
            title={event.title}
            type={event.type}
            start_time={event.start_time}
            end_time={event.end_time}
            description={event.description}
            location={event.location}
            recurring={event.recurring}
            recurring_pattern={event.recurring_pattern}
            primary_color={event.primary_color}
            background_color={event.background_color}
            meeting_url={event.meeting_url}
            profile_client_url={event.profile_client_url}
            profile_client_image={event.profile_client_image}
          />
        );
      })}
    </div>
  );
}

export default UpcomingEvent;
