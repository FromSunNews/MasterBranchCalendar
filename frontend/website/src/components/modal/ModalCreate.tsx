import React from "react";
import PickerCalendar from "../picker/PickerCalendar";
import { format, getDay, getMonth, getYear } from "date-fns";
import { raw_client } from "../../assets/data/raw_client";
import { colorsLabel } from "../../assets/utilities/colors_label";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentDate,
  updateCurrentShowModal,
} from "../../redux/global/global_slice";
import { CreateEventRequest } from "../../api/common/request/event.request";
import {
  createEventAPI,
  getTotalEventAPI,
} from "../../redux/event/event_slice";

function ModalCreate() {
  const dispatch = useDispatch();
  const currentDate = useSelector(selectCurrentDate);

  const [showPicker, setShowPicker] = React.useState<boolean>(false);
  const [showClientPicker, setShowClientPicker] =
    React.useState<boolean>(false);
  const [showColorPicker, setShowColorPicker] = React.useState<boolean>(false);
  const [colorSelected, setColorSelected] = React.useState(colorsLabel[0]);
  const [valueDatePicker, setValueDatePicker] = React.useState<Date>(
    new Date()
  );
  const [clientSelected, setClientSelected] = React.useState(raw_client[0]);
  const [typeEventSelected, setTypeSelected] = React.useState("WEBINAR_EVENT");
  const [title, setTitle] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [linkMeeting, setLinkMeeting] = React.useState("");
  const [selectedRecurring, setSelectedRecurring] = React.useState("NO");

  const handleCreateEvent = () => {
    const hourStart = startTime.split(":")[0];
    const minuteStart = startTime.split(":")[1];

    const hourEnd = endTime.split(":")[0];
    const minuteEnd = endTime.split(":")[1];

    const day = getDay(valueDatePicker);
    const month = getMonth(valueDatePicker);
    const year = getYear(valueDatePicker);
    const stringDateStart = new Date(
      year,
      month,
      day,
      parseInt(hourStart),
      parseInt(minuteStart)
    );
    const stringDateEnd = new Date(
      year,
      month,
      day,
      parseInt(hourEnd),
      parseInt(minuteEnd)
    );
    const dateStart = stringDateStart.getTime();
    const dateEnd = stringDateEnd.getTime();

    const dataToCreate: CreateEventRequest = {
      title: title,
      description: desc,
      type: typeEventSelected as "BOOKING_CLIENT" | "WEBINAR_EVENT",
      start_time: stringDateStart,
      start_timestamp: dateStart,
      end_time: stringDateEnd,
      end_timestamp: dateEnd,
      location: location,
      recurring: selectedRecurring !== "NO",
      recurring_pattern:
        selectedRecurring === "NO"
          ? undefined
          : (selectedRecurring as "DAYLY" | "WEEKLY" | "MONTHLY" | "YEARLY"),
      primary_color: colorSelected.primary_color,
      background_color: colorSelected.background_color,
      meeting_url: linkMeeting,
      profile_client_url:
        typeEventSelected === "BOOKING_CLIENT"
          ? clientSelected.profile_client_url
          : undefined,
      profile_client_image:
        typeEventSelected === "BOOKING_CLIENT"
          ? clientSelected.profile_client_image
          : undefined,
    };
    console.log("🚀 ~ handleCreateEvent ~ dataToCreate:", dataToCreate);

    dispatch(createEventAPI(dataToCreate) as any).then(() => {
      dispatch(getTotalEventAPI({ date: currentDate }) as any).then(() => {
        dispatch(
          updateCurrentShowModal({
            typeModal: null,
            id: null,
          }) as any
        );
      });
    });
  };
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      id="crud-modal"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
          <div className="relative transform rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full sm:w-4/6 lg:w-3/6">
            <div className="flex items-center justify-between p-4 md:p-3 border-b rounded-t">
              <h3 className="ms-2 text-lg font-semibold text-gray-700">
                Create New Event
              </h3>
              <button
                onClick={() => {
                  dispatch(
                    updateCurrentShowModal({
                      typeModal: null,
                      id: null,
                    }) as any
                  );
                }}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 rounded-full text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                data-modal-toggle="crud-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="p-4 md:p-5">
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Title
                  </label>
                  <input
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    type="text"
                    name="title"
                    id="title"
                    className="bg-gray-50 border focus:ring-blue-500 focus:border-blue-500 font-normal border-gray-300 text-gray-700 text-sm rounded-lg block w-full p-2.5 focus-visible:outline-none"
                    placeholder="Type title..."
                    required={true}
                  />
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    onChange={(e) => setDesc(e.target.value)}
                    value={desc}
                    id="description"
                    rows={4}
                    className="block p-2.5 w-full text-sm text-gray-700 focus:ring-blue-500 focus:border-blue-500 font-normal bg-gray-50 rounded-lg border border-gray-300  focus-visible:outline-none"
                    placeholder="Description about event..."
                  ></textarea>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="location"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Location
                  </label>
                  <input
                    onChange={(e) => setLocation(e.target.value)}
                    value={location}
                    type="text"
                    name="location"
                    id="location"
                    className="bg-gray-50 border focus:ring-blue-500 focus:border-blue-500 font-normal border-gray-300 text-gray-700 text-sm rounded-lg block w-full p-2.5 focus-visible:outline-none"
                    placeholder="Type location..."
                    required={true}
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="event_type"
                    className="block mb-2 text-sm font-medium text-gray-700 "
                  >
                    Event Type
                  </label>
                  <select
                    onChange={(e) => setTypeSelected(e.target.value)}
                    id="event_type"
                    className="bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-gray-700 font-normal text-sm rounded-lg block w-full p-2.5  focus-visible:outline-none"
                  >
                    {["BOOKING_CLIENT", "WEBINAR_EVENT"].map((item) => {
                      return (
                        <option
                          key={item}
                          value={item}
                          selected={item === typeEventSelected}
                        >
                          {item === "BOOKING_CLIENT"
                            ? "Booking client"
                            : "Webinar event"}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {typeEventSelected === "BOOKING_CLIENT" && (
                  <div className="col-span-2 relative">
                    <label
                      htmlFor="client"
                      className="block mb-2 text-sm font-medium text-gray-700 "
                    >
                      Client
                    </label>
                    <button
                      id="client"
                      className="w-full flex flex-row justify-between bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-gray-700 font-normal text-sm rounded-lg p-2 focus-visible:outline-none"
                      type="button"
                      onFocus={() => setShowClientPicker(true)}
                      // value={format(valueDatePicker, "iii, dd LLL, yyyy")}
                    >
                      <div className="flex flex-row justify-center items-center">
                        <img
                          src={clientSelected.profile_client_image}
                          alt=""
                          className="h-7 w-7 rounded-full object-cover"
                        />
                        <div className="ms-2">{clientSelected.name}</div>
                      </div>
                      <svg
                        className="w-2.5 h-2.5 mt-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m1 1 4 4 4-4"
                        />
                      </svg>
                    </button>

                    {showClientPicker && (
                      <div className="z-10 top-[100%] absolute w-[90%] bg-white rounded-lg shadow-lg">
                        <ul className="py-2 text-sm font-normal text-gray-700 dark:text-gray-200">
                          {raw_client.map((c) => (
                            <li
                              onClick={() => {
                                setShowClientPicker(false);
                                setClientSelected(c);
                              }}
                              key={c.id}
                              className="py-1 hover:bg-gray-100 cursor-pointer"
                            >
                              <div className="ps-2 flex flex-row justify-start items-center">
                                <img
                                  src={c.profile_client_image}
                                  alt=""
                                  className="h-7 w-7 rounded-full object-cover"
                                />
                                <div className="ms-2">{c.name}</div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                <div className="col-span-2 sm:col-span-1 relative">
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-700 "
                  >
                    Date
                  </label>
                  <div className="absolute inset-y-0 start-0 top-7 flex focus:ring-blue-500 focus:border-blue-500 items-center ps-3.5 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    className="bg-gray-50 border font-normal cursor-pointer border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 focus-visible:outline-none"
                    placeholder="Select date"
                    onFocus={() => setShowPicker(true)}
                    value={format(valueDatePicker, "iii, dd LLL, yyyy")}
                  />

                  {showPicker && (
                    <PickerCalendar
                      onChange={(date: Date, type: "SELECT" | "NAVIGATE") => {
                        if (type === "SELECT") {
                          setShowPicker(false);
                          setValueDatePicker(date);
                        } else {
                          setValueDatePicker(date);
                        }
                      }}
                      currentDate={valueDatePicker}
                    />
                  )}
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-700 "
                  >
                    Recurring
                  </label>
                  <select
                    onChange={(e) => setSelectedRecurring(e.target.value)}
                    id="category"
                    className="bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-gray-700 font-normal text-sm rounded-lg block w-full p-2.5  focus-visible:outline-none"
                  >
                    {["No", "Dayly", "Weekly", "Monthly", "Yearly"].map(
                      (item) => {
                        return (
                          <option
                            value={item.toUpperCase()}
                            selected={item.toUpperCase() === selectedRecurring}
                          >
                            {item}
                          </option>
                        );
                      }
                    )}
                  </select>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="start_time"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Start time
                  </label>
                  <input
                    onChange={(e) => setStartTime(e.target.value)}
                    value={startTime}
                    type="text"
                    name="start_time"
                    id="start_time"
                    className="bg-gray-50 border font-normal border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-gray-700 text-sm rounded-lg block w-full p-2.5 focus-visible:outline-none"
                    placeholder="HH:MM"
                    required={true}
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="end_time"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    End time
                  </label>
                  <input
                    onChange={(e) => setEndTime(e.target.value)}
                    type="text"
                    name="end_time"
                    id="end_time"
                    className="bg-gray-50 border font-normal border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-gray-700 text-sm rounded-lg block w-full p-2.5 focus-visible:outline-none"
                    placeholder="HH:MM"
                    required={true}
                    value={endTime}
                  />
                </div>

                <div className="col-span-2 sm:col-span-1 relative">
                  <label
                    htmlFor="color"
                    className="block mb-2 text-sm font-medium text-gray-700 "
                  >
                    Color
                  </label>
                  <button
                    id="color"
                    className="w-full flex items-center justify-center bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-gray-700 font-normal text-sm rounded-lg p-2 focus-visible:outline-none"
                    type="button"
                    onFocus={() => setShowColorPicker(true)}
                  >
                    <div
                      className="w-full h-6"
                      style={{ backgroundColor: colorSelected.primary_color }}
                    ></div>
                  </button>
                  {showColorPicker && (
                    <div className="absolute w-[100%] bottom-[80%] p-2 grid grid-cols-6 rounded-lg bg-white shadow-lg">
                      {colorsLabel.map((col) => (
                        <div
                          style={{ backgroundColor: col.primary_color }}
                          className="h-6 w-6 rounded-sm col-span-1 m-2 cursor-pointer shadow-lg"
                          onClick={() => {
                            setShowColorPicker(false);
                            setColorSelected(col);
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="url_meeting"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Link meeting
                  </label>
                  <input
                    onChange={(e) => setLinkMeeting(e.target.value)}
                    value={linkMeeting}
                    type="text"
                    name="url_meeting"
                    id="url_meeting"
                    className="bg-gray-50 border focus:ring-blue-500 focus:border-blue-500 font-normal border-gray-300 text-gray-700 text-sm rounded-lg block w-full p-2.5 focus-visible:outline-none"
                    placeholder="Type link meeting..."
                    required={true}
                  />
                </div>
              </div>

              <div className="bg-gray-50 py-3 sm:flex sm:flex-row-reverse">
                <button
                  disabled={
                    !startTime ||
                    !endTime ||
                    !title ||
                    !location ||
                    !linkMeeting
                      ? true
                      : false
                  }
                  onClick={handleCreateEvent}
                  type="button"
                  className={clsx(
                    !startTime ||
                      !endTime ||
                      !title ||
                      !location ||
                      !linkMeeting
                      ? "bg-gray-400"
                      : "bg-blue-600",
                    "inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                  )}
                >
                  Create
                </button>
                <button
                  onClick={() => {
                    dispatch(
                      updateCurrentShowModal({
                        typeModal: null,
                        id: null,
                      }) as any
                    );
                  }}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalCreate;
