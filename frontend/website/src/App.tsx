import SmallViewCalendar from "./components/calendar/SmallViewCalendar";
import BigViewCalendar from "./components/calendar/BigViewCalendar";

function App() {
  return (
    <div className="container m-auto grid grid-cols-12 w-screen py-2 gap-3">
      <div className="sm:col-span-6 md:col-span-4 col-span-12 grid gap-y-1">
        <div className="grid-cols-12 py-6 px-6 border border-gray-200 rounded-md">
          <SmallViewCalendar />
        </div>

        <div className="grid-cols-12 h-40 border border-gray-200 rounded-md"></div>
      </div>
      <div className="sm:col-span-6 md:col-span-8 col-span-12 h-30 border border-gray-200 rounded-md">
        <BigViewCalendar />
      </div>
    </div>
  );
}

export default App;
