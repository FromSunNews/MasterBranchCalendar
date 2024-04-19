import BaseCalendar from "./BaseCalendar";
import CellCalendar from "../cell-calendar/CellCalendar";
import { add, format, getDate, getMonth, sub } from "date-fns";
import {
  getTotalEventAPI,
  updateUpcomingEvent,
} from "../../redux/event/event_slice";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentDate,
  updateCurrentGlobalState,
} from "../../redux/global/global_slice";

const SmallViewCalendar = () => {
  const currentDate = useSelector(selectCurrentDate);
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
    <div className="grid-cols-12 py-6 px-6 border border-gray-200 rounded-md">
      <BaseCalendar
        value={currentDate}
        dateNum={getDate(currentDate)}
        onChange={(date: Date) => handleOnChange(date)}
        header={
          <div className="col-span-7 grid grid-cols-7">
            <CellCalendar></CellCalendar>
            <CellCalendar
              onClick={() => handleNavigateMonth("BEFORE")}
              className="cursor-pointer"
            >
              <span className="material-icons text-blue-600 font-bold">
                navigate_before
              </span>
            </CellCalendar>
            <CellCalendar className="col-span-3 font-extrabold text-blue-600 text-base">
              {format(currentDate, "LLLL yyyy")}
            </CellCalendar>
            <CellCalendar
              onClick={() => handleNavigateMonth("NEXT")}
              className="cursor-pointer"
            >
              <span className="material-icons text-blue-600 font-bold">
                navigate_next
              </span>
            </CellCalendar>
            <CellCalendar></CellCalendar>
          </div>
        }
        classNameCell="flex items-center justify-center"
        typeCalendar={"SMALL_VIEW"}
      />
    </div>
  );
};

export default SmallViewCalendar;
