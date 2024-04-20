import CellCalendar from "../cell-calendar/CellCalendar";
import { add, format, getDate, sub } from "date-fns";
import BaseCalendar from "../calendar/BaseCalendar";
import React from "react";

interface PickerCalendarProps {
  onChange: (date: Date, type: "NAVIGATE" | "SELECT") => void;
  currentDate: Date;
}
const PickerCalendar: React.FC<PickerCalendarProps> = ({
  onChange,
  currentDate,
}) => {
  // const currentDate = useSelector(selectCurrentDate);
  const handleNavigateMonth = (typeNavigate: string) => {
    let date;
    if (typeNavigate === "BEFORE") {
      date = sub(currentDate, { months: 1 });
    } else {
      date = add(currentDate, { months: 1 });
    }

    onChange(date, "NAVIGATE");
  };

  // const handleOnChange = async (date: Date) => {
  // console.log("🚀 ~ handleOnChange ~ date:", date);
  // dispatch(
  //   updateCurrentGlobalState({
  //     current_date_selected: date,
  //     number_day_in_month_selected: getMonth(date),
  //   })
  // );
  // dispatch(updateUpcomingEvent({ date }));
  // };
  return (
    <div className="absolute w-[110%] shadow-sm bottom-[65%] left-[-5%]  z-50 grid-cols-12 py-3 px-3 border bg-white border-gray-200 rounded-md">
      <BaseCalendar
        value={currentDate}
        dateNum={getDate(currentDate)}
        onChange={(date: Date) => onChange(date, "SELECT")}
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
            <CellCalendar className="col-span-3 font-extrabold text-blue-600 text-[15px]">
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
        classNameCell="flex items-center justify-center h-[30px] w-[30px]"
        typeCalendar={"SMALL_VIEW"}
      />
    </div>
  );
};

export default PickerCalendar;
