import React from "react";
import CellCalendar from "../cell-calendar/CellCalendar";
import {
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
  onChange?: (value: Date) => void;
  className?: string;
  header?: React.ReactNode;
}

const BaseCalendar: React.FC<BaseCalendarProps> = ({
  value = new Date(),
  className,
  header,
}) => {
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
        {Array.from({ length: prefixDaysInMonth }).map((x, index, arr) => {
          const date = numDaysInPrevMonth - (arr.length - (index + 1));
          return (
            <CellCalendar key={`blank-cell-${index}`} className="text-gray-400">
              {date}
            </CellCalendar>
          );
        })}

        {/* main days in month*/}
        {Array.from({ length: numDaysInMonth }).map((x, index) => {
          const date = index + 1;
          return (
            <CellCalendar key={index}>
              <div className="cursor-pointer bg-blue-900 text-white rounded-full w-8 h-8 flex items-center justify-center">
                <div>{date}</div>
              </div>
            </CellCalendar>
          );
        })}

        {/*suffix days in month */}
        {Array.from({ length: suffixDaysInMonth }).map((x, index) => {
          const date = index + 1;
          return (
            <CellCalendar key={`blank-cell-${index}`} className="text-gray-400">
              {date}
            </CellCalendar>
          );
        })}
      </div>
    </div>
  );
};

export default BaseCalendar;
