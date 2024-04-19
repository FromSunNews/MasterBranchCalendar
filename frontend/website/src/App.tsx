import SmallViewCalendar from "./components/calendar/SmallViewCalendar";
import BigViewCalendar from "./components/calendar/BigViewCalendar";
import UpcomingEvent from "./components/upcoming-event/UpcomingEvent";
import { useDispatch } from "react-redux";
import React from "react";
import { getTotalEventAPI } from "./redux/event/event_slice";

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getTotalEventAPI({ date: new Date() }) as any);
  }, []);
  return (
    <div className="container m-auto grid grid-cols-12 w-screen py-2 gap-3">
      <div className="sm:col-span-6 md:col-span-4 col-span-12 grid gap-y-1">
        <SmallViewCalendar />
        <UpcomingEvent />
      </div>
      <BigViewCalendar />
    </div>
  );
}

export default App;
