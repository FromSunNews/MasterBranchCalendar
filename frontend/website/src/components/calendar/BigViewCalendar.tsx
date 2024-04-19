import BaseCalendar from "./BaseCalendar";
import CellCalendar from "../cell-calendar/CellCalendar";
import { add, format, getDate, getMonth, isThisMonth, sub } from "date-fns";
import { monthsOfYear } from "../../assets/utilities/variable";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentDate,
  selectCurrentNumberDay,
  updateCurrentGlobalState,
} from "../../redux/global/global_slice";
import {
  getTotalEventAPI,
  updateUpcomingEvent,
} from "../../redux/event/event_slice";

const BigViewCalendar = () => {
  const currentDate = useSelector(selectCurrentDate);
  const selectedMonth = useSelector(selectCurrentNumberDay);
  console.log("🚀 ~ BigViewCalendar ~ selectedMonth:", selectedMonth);
  const dispatch = useDispatch();

  const handleNavigateMonth = (typeNavigate: string) => {
    let date;
    if (typeNavigate === "BEFORE") {
      date = sub(currentDate, { months: 1 });
    } else {
      date = add(currentDate, { months: 1 });
    }

    dispatch(
      updateCurrentGlobalState({
        current_date_selected: date,
        number_day_in_month_selected: getMonth(date),
      })
    );
    dispatch(getTotalEventAPI({ date }) as any);
  };

  const handleToDayClick = () => {
    dispatch(
      updateCurrentGlobalState({
        current_date_selected: new Date(),
        number_day_in_month_selected: getMonth(new Date()),
      })
    );

    dispatch(getTotalEventAPI({ date: new Date() }) as any);
  };

  const handleSelectMonth = (value: number) => {
    let current_date_selected;
    if (getMonth(currentDate) > value) {
      current_date_selected = sub(currentDate, {
        months: Math.abs(getMonth(currentDate) - value),
      });
    } else if (getMonth(currentDate) < value) {
      current_date_selected = add(currentDate, {
        months: Math.abs(getMonth(currentDate) - value),
      });
    }
    dispatch(
      updateCurrentGlobalState({
        current_date_selected,
        number_day_in_month_selected: value,
      })
    );

    current_date_selected &&
      dispatch(getTotalEventAPI({ date: current_date_selected }) as any);
  };

  const handleOnChange = async (date: Date) => {
    console.log("🚀 ~ handleOnChange ~ date:", date);
    dispatch(
      updateCurrentGlobalState({
        current_date_selected: date,
        number_day_in_month_selected: getMonth(date),
      })
    );
    dispatch(updateUpcomingEvent({ date }));
  };

  return (
    <div className="sm:col-span-6 md:col-span-8 col-span-12 h-30 border border-gray-200 rounded-md">
      <BaseCalendar
        typeCalendar="BIG_VIEW"
        value={currentDate}
        dateNum={getDate(currentDate)}
        onChange={(date: Date) => handleOnChange(date)}
        header={
          <div className="col-span-7 flex flex-row content-center justify-between px-10 py-4">
            <div className="flex flex-row content-center flex-grow">
              <div
                className={`${
                  getDate(currentDate) === getDate(new Date()) &&
                  isThisMonth(currentDate)
                    ? "bg-blue-600 text-white"
                    : "border-blue-600 text-blue-600"
                } mt-[2px] h-8 px-3 border rounded-full flex justify-center items-center cursor-pointer hover:bg-blue-700 hover:text-white`}
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

              <CellCalendar className="col-span-3 font-extrabold text-blue-600 text-lg mx-2">
                {format(currentDate, "LLLL yyyy")}
              </CellCalendar>
            </div>

            <div className="flex justify-center content-center bg-blue-600 hover:bg-blue-700 px-3 rounded-full cursor-pointer h-8">
              <select
                onChange={(e) => handleSelectMonth(parseInt(e.target.value))}
                className="rounded-full bg-transparent px-[4px] text-white focus:outline-none focus:shadow-none cursor-pointer"
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
        classNameCell={"border h-[100px] w-full items-start pt-1 px-1"}
      />
    </div>
  );
};

export default BigViewCalendar;
