import React from "react";
import BaseCalendar from "./BaseCalendar";
import CellCalendar from "../cell-calendar/CellCalendar";
import { add, format, getDate, getMonth, isThisMonth, sub } from "date-fns";
import { monthsOfYear } from "../../assets/utilities/variable";

const BigViewCalendar = () => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [selectedMonth, setSelectedMonth] = React.useState(
    getMonth(new Date())
  );
  console.log("🚀 ~ BigViewCalendar ~ selectedMonth:", selectedMonth);

  const handleNavigateMonth = (typeNavigate: string) => {
    if (typeNavigate === "BEFORE") {
      const previousMonthDate = sub(currentDate, { months: 1 });
      setCurrentDate(previousMonthDate);
      setSelectedMonth(getMonth(previousMonthDate));
    } else {
      const nextMonthDate = add(currentDate, { months: 1 });
      setCurrentDate(nextMonthDate);
      setSelectedMonth(getMonth(nextMonthDate));
    }
  };

  const handleToDayClick = () => {
    setCurrentDate(new Date());
    setSelectedMonth(getMonth(new Date()));
  };

  const handleSelectMonth = (value: number) => {
    setSelectedMonth(value);
    if (getMonth(currentDate) > value) {
      setCurrentDate(
        sub(currentDate, { months: Math.abs(getMonth(currentDate) - value) })
      );
    } else if (getMonth(currentDate) < value) {
      setCurrentDate(
        add(currentDate, { months: Math.abs(getMonth(currentDate) - value) })
      );
    }
  };
  return (
    <>
      <BaseCalendar
        typeCalendar="BIG_VIEW"
        value={currentDate}
        dateNum={getDate(currentDate)}
        onChange={setCurrentDate}
        header={
          <div className="col-span-7 flex flex-row content-center justify-between px-10 py-4">
            <div className="flex flex-row content-center flex-grow">
              <div
                className={`${
                  getDate(currentDate) === getDate(new Date()) &&
                  isThisMonth(currentDate)
                    ? "bg-blue-800 text-white"
                    : "border-blue-800 text-blue-800"
                } mt-[2px] h-8 px-2 border rounded flex justify-center items-center cursor-pointer hover:bg-blue-800 hover:text-white`}
                onClick={handleToDayClick}
              >
                <div>Today</div>
              </div>

              <CellCalendar
                onClick={() => handleNavigateMonth("BEFORE")}
                className="cursor-pointer mx-2"
              >
                <span className="material-icons text-blue-600 font-bold">
                  navigate_before
                </span>
              </CellCalendar>

              <CellCalendar
                onClick={() => handleNavigateMonth("NEXT")}
                className="cursor-pointer mx-2"
              >
                <span className="material-icons text-blue-600 font-bold">
                  navigate_next
                </span>
              </CellCalendar>

              <CellCalendar className="col-span-3 font-extrabold text-blue-800 text-lg mx-2">
                {format(currentDate, "LLLL yyyy")}
              </CellCalendar>
            </div>

            <div className="flex justify-center content-center bg-blue-800 px-2 rounded cursor-pointer">
              <select
                defaultValue={selectedMonth}
                onChange={(e) => handleSelectMonth(parseInt(e.target.value))}
                className="rounded bg-blue-800 px-[4px] text-white focus:outline-none focus:shadow-none cursor-pointer"
              >
                {monthsOfYear.map((month: string, index: number) => {
                  return (
                    <option
                      key={month}
                      value={index}
                      className="bg-white text-black"
                      selected={index === selectedMonth}
                    >
                      {month}
                    </option>
                  );
                })}
              </select>
            </div>

            <CellCalendar></CellCalendar>
          </div>
        }
        classNameCell={"border h-[100px] w-full items-start pt-1"}
        childrenCell={
          <div>
            <div className="text-left truncate px-[2px] w-full mb-1 border-l-[4px] border-l-blue-800 rounded-sm text-[10px] bg-slate-400">
              First session 123 with
            </div>

            <div className=" text-left truncate px-[2px] w-full mb-1 border-l-[4px] border-l-blue-800 rounded-sm text-[10px] bg-slate-400">
              First
            </div>

            <div className="text-left text-blue-800 underline text-[10px] mt-[-4px] ms-1">
              2 more
            </div>
          </div>
        }
      />
    </>
  );
};

export default BigViewCalendar;
