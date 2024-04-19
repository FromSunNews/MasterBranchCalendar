import React from "react";
import CellCalendar from "../cell-calendar/CellCalendar";
import {
  addDays,
  differenceInDays,
  endOfMonth,
  getDay,
  startOfMonth,
  sub,
} from "date-fns";
import clsx from "clsx";
import { daysOfWeek } from "../../assets/utilities/variable";
import { selectTotalUpcomingEvents } from "../../redux/event/event_slice";
import { useSelector } from "react-redux";
import { EventResponse } from "../../api/common/response/event.response";

interface BaseCalendarProps {
  value?: Date;
  dateNum?: number;
  onChange?: (value: Date) => void;
  className?: string;
  classNameCell?: string;
  header?: React.ReactNode;
  childrenCell?: React.ReactNode;
  typeCalendar?: "SMALL_VIEW" | "BIG_VIEW";
}

const BaseCalendar: React.FC<BaseCalendarProps> = ({
  value = new Date(),
  dateNum,
  onChange,
  className,
  classNameCell,
  header,
  typeCalendar,
}) => {
  const [selectedDate, setSelectedDate] = React.useState(dateNum);
  const totalUpcomingEvents = useSelector(selectTotalUpcomingEvents);

  React.useEffect(() => {
    setSelectedDate(dateNum);
  }, [dateNum]);

  const startDate = startOfMonth(value);
  const endDate = endOfMonth(value);
  const numDaysInMonth = differenceInDays(endDate, startDate) + 1;

  const dateInPrevMonth = sub(value, { months: 1 });
  const startDatePrevMonth = startOfMonth(dateInPrevMonth);
  const endDatePrevMonth = endOfMonth(dateInPrevMonth);
  const numDaysInPrevMonth =
    differenceInDays(endDatePrevMonth, startDatePrevMonth) + 1;

  const prefixDaysInMonth = getDay(startDate);
  const suffixDaysInMonth = 6 - getDay(endDate);

  const handleOnChange = (date: number) => {
    console.log("🚀 ~ handleOnChange ~ date:", date);
    setSelectedDate(date);
    onChange && onChange(addDays(startDate, date - 1)); // date - 1 because startDate is calculated 1 day
  };

  return (
    <div className={clsx("w-full", className)}>
      <div className="grid grid-cols-7 items-center justify-center text-center font-medium text-sm">
        {header}

        {daysOfWeek.map((day: string, index: number) => (
          <CellCalendar
            key={`${day}-${index}`}
            className="uppercase text-gray-400 text-xs"
          >
            {day}
          </CellCalendar>
        ))}

        {/*prefix days in month */}
        {Array.from({ length: prefixDaysInMonth }).map((_x, index, arr) => {
          const date = numDaysInPrevMonth - (arr.length - (index + 1));
          return (
            <CellCalendar
              key={`blank-cell-${index}`}
              className={clsx("text-gray-400", classNameCell)}
            >
              {date}
            </CellCalendar>
          );
        })}

        {/* main days in month*/}
        {Array.from({ length: numDaysInMonth }).map((_x, index) => {
          const date = index + 1;
          return (
            <CellCalendar key={date} className={classNameCell}>
              <div className="flex flex-col content-center w-full relative">
                <button
                  onClick={() => handleOnChange(date)}
                  className={clsx(
                    "cursor-pointer",
                    date === selectedDate
                      ? "bg-blue-600 text-white rounded-full m-auto w-7 h-7 flex items-center justify-center text-center mb-[2px] hover:bg-blue-700"
                      : typeCalendar === "BIG_VIEW"
                      ? "mb-[2px] hover:bg-gray-200 rounded-full m-auto w-7 h-7"
                      : "hover:bg-gray-200 rounded-full m-auto w-7 h-7"
                  )}
                >
                  {date}
                </button>
                {/* {childrenCell} */}
                {typeCalendar === "BIG_VIEW" &&
                  totalUpcomingEvents[index] &&
                  totalUpcomingEvents[index].map(
                    (event: EventResponse, small_index: number) => {
                      if (small_index <= 1)
                        return (
                          <div
                            onClick={() =>
                              window.open(event.meeting_url, "_blank")
                            }
                            className="relative z-10 cursor-pointer text-left truncate px-[2px] w-full mb-1 border-l-[4px] border-l-blue-600 rounded-sm text-[10px] bg-slate-400 hover:bg-slate-300 hover:border-l-blue-600"
                            style={{
                              borderLeftColor: event.primary_color,
                              backgroundColor: event.background_color,
                            }}
                          >
                            {event.title}
                          </div>
                        );
                      else
                        return (
                          <div className="truncate z-10 cursor-pointer text-left text-blue-600 hover:text-blue-700 font-semibold underline text-[10px] mt-[-4px] ms-1">
                            {"View " +
                              (totalUpcomingEvents[index].length - 2) +
                              " more"}
                          </div>
                        );
                    }
                  )}
              </div>
            </CellCalendar>
          );
        })}

        {/*suffix days in month */}
        {Array.from({ length: suffixDaysInMonth }).map((_x, index) => {
          const date = index + 1;
          return (
            <CellCalendar
              key={`blank-cell-${index}`}
              className={clsx("text-gray-400", classNameCell)}
            >
              {date}
            </CellCalendar>
          );
        })}
      </div>
    </div>
  );
};

export default BaseCalendar;
