import { ApiResponse } from "../assets/interfaces/base/base_api_req";
import { CreateEventRequest, EventRequest } from "../assets/interfaces/request/event.request";
import { EventResponse } from "../assets/interfaces/response/event.response";
import { add, differenceInDays, endOfMonth, getDate, getDay, getMonth, getYear, startOfMonth } from 'date-fns';
import fs from 'fs'
import { getRandomID, handleResultAPI } from "../assets/utilities/function";

const getTotalUpcomingEvent = async (data: EventRequest) => {
  try {
    const startDate = startOfMonth(data.date);
    const endDate = endOfMonth(data.date);
    const numDaysInMonth = differenceInDays(endDate, startDate) + 1;
    const dateInMonth: Date[] = [];
    Array.from({ length: numDaysInMonth }).map((_x, index) => {
      dateInMonth.push(add(startDate, { days: index }))
    });
    const totalUpcomingEvents: EventResponse[][] = [];
    fs.readFile(`src/assets/data/data.json`, 'utf8', async (err, data) => {
      if (err) {
        console.error('Err when read json file:', err);
        return;
      }
      const jsonData = JSON.parse(data);
      dateInMonth.map(item => {
        const fullDate = item;

        const day = getDay(fullDate); // get number day of week
        const date = getDate(fullDate); // get number date of month
        const month = getMonth(fullDate); // get number month of year
        const year = getYear(fullDate); // get number year

        const filterDate = jsonData.filter((event: EventResponse) => {
          const start_time = new Date(event.start_time)
          const dayItem = getDay(start_time); // get number day of week
          const dateItem = getDate(start_time); // get number date of month
          const monthItem = getMonth(start_time); // get number month of year
          const yearItem = getYear(start_time); // get number year

          // check recurring event
          if (event.recurring) {
            if (event.recurring_pattern === "DAYLY") {
              // every day will be a recurring this event
              return true;
            } else if (event.recurring_pattern === "WEEKLY") {
              // every week will be a recurring this event so we check number of days in week
              console.log("🚀 ~ filterDate ~ dayItem:", dayItem)
              console.log("🚀 ~ filterDate ~ day:", day)
              if (day === dayItem) return true;
              else return false;
            } else if (event.recurring_pattern === "MONTHLY") {
              // every month will be a recurring this event so we check number of days in month
              if (date === dateItem) return true;
              else return false;
            } else {
              // every year will be a recurring this event so we check number of days in month and month
              if (date === dateItem && month === monthItem) return true;
              else return false;
            }
          } else {
            if (date === dateItem && month === monthItem && year === yearItem) return true;
            else false;
          }
        })

        // sort start date by timestamp
        filterDate.sort((a: EventResponse, b: EventResponse) => {
          return a.start_timestamp - b.start_timestamp;
        });

        totalUpcomingEvents.push(filterDate)
      });
    })

    return handleResultAPI(true, "", totalUpcomingEvents);
  } catch (error) {
    if (error instanceof Error) {
      return handleResultAPI(false, error.message, null);
    }
  }
}

const createEvent = async (data: CreateEventRequest) => {
  try {
    let jsonData: EventResponse[] = [];
    // read file json
    fs.readFile(`src/assets/data/data.json`, 'utf8', async (err, data) => {
      if (err) {
        return handleResultAPI(false, "Err when read json file!", null);
      }
      jsonData = JSON.parse(data);
    });
    // create random id 
    const randomId = getRandomID();
    const newData = [
      ...jsonData,
      {
        ...data,
        id: randomId
      }
    ]
    // write file json
    fs.writeFile(`src/assets/data/data.json`, JSON.stringify(newData), err => {
      if (err) {
        return handleResultAPI(false, "File json written error!", null)
      } else {
        return handleResultAPI(true, "", "OK")
      }
    })
  } catch (error) {
    if (error instanceof Error) {
      return handleResultAPI(false, error.message, null);
    }
  }
}

const deleteEvent = async (idEvent: string) => {
  try {
    let jsonData: EventResponse[] = [];
    // read file json
    fs.readFile(`src/assets/data/data.json`, 'utf8', async (err, data) => {
      if (err) {
        return handleResultAPI(false, "Err when read json file!", null);
      }
      jsonData = JSON.parse(data);
    });
    // create random id 

    const newData = jsonData.filter(e => e.id !== idEvent);
    // write file json
    fs.writeFile(`src/assets/data/data.json`, JSON.stringify(newData), err => {
      if (err) {
        return handleResultAPI(false, "File json written error!", null)
      } else {
        return handleResultAPI(true, "", "OK")
      }
    })
  } catch (error) {
    if (error instanceof Error) {
      return handleResultAPI(false, error.message, null);
    }
  }
}


export const EventService = {
  getTotalUpcomingEvent,
  createEvent,
  deleteEvent
}
