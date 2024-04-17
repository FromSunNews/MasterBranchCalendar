import React from "react";
import BaseCalendar from "./BaseCalendar";
import CellCalendar from "../cell-calendar/CellCalendar";
import { add, format, sub } from "date-fns";

const SmallViewCalendar = () => {
  const [currentDate, setCurrentDate] = React.useState(new Date("2024-03-13"));

  const handlePrevMonth = () => setCurrentDate(sub(currentDate, { months: 1 }));
  const handleFollowingMonth = () =>
    setCurrentDate(add(currentDate, { months: 1 }));

  return (
    <>
      <BaseCalendar
        value={currentDate}
        onChange={setCurrentDate}
        header={
          <div className="col-span-7 grid grid-cols-7">
            <CellCalendar></CellCalendar>
            <CellCalendar onClick={handlePrevMonth} className="cursor-pointer">
              <span className="material-icons text-blue-600 font-bold">
                navigate_before
              </span>
            </CellCalendar>
            <CellCalendar className="col-span-3 font-extrabold text-blue-800 text-lg">
              {format(currentDate, "LLLL yyyy")}
            </CellCalendar>
            <CellCalendar
              onClick={handleFollowingMonth}
              className="cursor-pointer"
            >
              <span className="material-icons text-blue-600 font-bold">
                navigate_next
              </span>
            </CellCalendar>
            <CellCalendar></CellCalendar>
          </div>
        }
      />
    </>
  );
};

export default SmallViewCalendar;
