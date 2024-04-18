import SmallViewCalendar from "./components/calendar/SmallViewCalendar";
import BigViewCalendar from "./components/calendar/BigViewCalendar";
import { format } from "date-fns";
import Avatar from "./assets/images/avatar.jpg";
function App() {
  return (
    <div className="container m-auto grid grid-cols-12 w-screen py-2 gap-3">
      <div className="sm:col-span-6 md:col-span-4 col-span-12 grid gap-y-1">
        <div className="grid-cols-12 py-6 px-6 border border-gray-200 rounded-md">
          <SmallViewCalendar />
        </div>

        <div className="grid-cols-12 border border-gray-200 rounded-md px-4 text-sm">
          <div className="flex flex-row content-center justify-between mt-3">
            <div className="flex-grow">
              <div className="font-extrabold text-blue-800 text-lg">
                Upcoming Events
              </div>
              <div className="text-gray-400 text-sm font-bold">
                {format(new Date(), "iii, dd LLL")}
              </div>
            </div>

            <div className="text-xs text-white flex flex-col">
              <button className="h-8 w-20 bg-blue-800 hover:bg-blue-700 rounded-2xl">
                View All
              </button>
              <button className="h-8 w-20 mt-1 bg-blue-800 hover:bg-blue-700 rounded-2xl">
                Create
              </button>
            </div>
          </div>

          <div className="p-2 border rounded-lg border-l-[7px] border-l-blue-800 py-3 mt-4 shadow-md">
            <div className="flex flex-col ps-1">
              <div className="flex flex-row content-center justify-between">
                <div className="flex flex-col ">
                  <div className="text-[14px]">
                    First Session with Alex Stan
                  </div>
                  <div className="text-[12px] text-gray-400">
                    9:00 AM - 9:30 AM GMT+8
                  </div>
                </div>
                <button className="flex content-center justify-center h-9 w-9 bg-blue-800 hover:bg-blue-700 rounded-full">
                  <span className="material-icons-outlined text-white mt-[5px]">
                    videocam
                  </span>
                </button>
              </div>
            </div>

            <div className="flex flex-row content-center  mt-2">
              <img
                src={Avatar}
                alt=""
                className="h-7 w-7 object-center rounded-full"
              />
              <a
                href="#"
                className="underline text-xs mt-2 ms-2 text-blue-400 cursor-pointer"
              >
                View Client Profile
              </a>
            </div>
          </div>

          <div className="p-2 border rounded-lg border-l-[7px] border-l-blue-800 py-3 mt-4 shadow-md">
            <div className="flex flex-col ps-1">
              <div className="flex flex-row content-center justify-between">
                <div className="flex flex-col ">
                  <div className="text-[14px]">
                    First Session with Alex Stan
                  </div>
                  <div className="text-[12px] text-gray-400">
                    9:00 AM - 9:30 AM GMT+8
                  </div>
                </div>
                <button className="flex content-center justify-center h-9 w-9 bg-blue-800 hover:bg-blue-700 rounded-full">
                  <span className="material-icons-outlined text-white mt-[5px]">
                    videocam
                  </span>
                </button>
              </div>
            </div>

            <div className="flex flex-row content-center  mt-2">
              <img
                src={Avatar}
                alt=""
                className="h-7 w-7 object-center rounded-full"
              />
              <a
                href="#"
                className="underline text-xs mt-2 ms-2 text-blue-400 cursor-pointer"
              >
                View Client Profile
              </a>
            </div>
          </div>

          <div className="p-2 border rounded-lg border-l-[7px] border-l-blue-800 py-3 mt-4 shadow-md">
            <div className="flex flex-col ps-1">
              <div className="flex flex-row content-center justify-between">
                <div className="flex flex-col ">
                  <div className="text-[14px]">
                    First Session with Alex Stan
                  </div>
                  <div className="text-[12px] text-gray-400">
                    9:00 AM - 9:30 AM GMT+8
                  </div>
                </div>
                <button className="flex content-center justify-center h-9 w-9 bg-blue-800 hover:bg-blue-700 rounded-full">
                  <span className="material-icons-outlined text-white mt-[5px]">
                    videocam
                  </span>
                </button>
              </div>
            </div>

            <div className="flex flex-row content-center  mt-2">
              <img
                src={Avatar}
                alt=""
                className="h-7 w-7 object-center rounded-full"
              />
              <a
                href="#"
                className="underline text-xs mt-2 ms-2 text-blue-400 cursor-pointer"
              >
                View Client Profile
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:col-span-6 md:col-span-8 col-span-12 h-30 border border-gray-200 rounded-md">
        <BigViewCalendar />
      </div>
    </div>
  );
}

export default App;
