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
  childrenCell,
  typeCalendar,
}) => {
  const [selectedDate, setSelectedDate] = React.useState(dateNum);

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
            <CellCalendar
              key={date}
              onClick={() => handleOnChange(date)}
              className={clsx("cursor-pointer", classNameCell)}
            >
              <div className="flex flex-col content-center w-full">
                <div
                  className={
                    date === selectedDate
                      ? "bg-blue-900 text-white rounded-full m-auto w-6 h-6 flex items-center justify-center text-center mb-[2px]"
                      : typeCalendar === "BIG_VIEW"
                      ? "mb-[6px]"
                      : ""
                  }
                >
                  {date}
                </div>
                {childrenCell}
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
