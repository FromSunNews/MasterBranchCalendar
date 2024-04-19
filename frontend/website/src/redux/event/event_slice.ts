import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import EventService from '../../api/event/event.api';
import { EventRequest } from '../../api/common/request/event.request';
import { raw_data } from '../../assets/data/raw_data';
import { add, differenceInDays, endOfMonth, getDate, getDay, getMonth, getYear, startOfMonth } from 'date-fns';

// Khởi tạo giá trị một giá trị của Slice trong Redux
const initialState = {
  upcomingEvents: [],
  totalUpcomingEvents: [],
  isLoading: false
}


export const getTotalEventAPI = createAsyncThunk(
  'event/getTotalEventAPI',
  async (data: EventRequest) => {
    // call api
    // const request = await EventService.getUpcomingEvent(data);

    const startDate = startOfMonth(data.date);
    const endDate = endOfMonth(data.date);
    const numDaysInMonth = differenceInDays(endDate, startDate) + 1;
    const dateInMonth: Date[] = []
    Array.from({ length: numDaysInMonth }).map((_x, index) => {
      dateInMonth.push(add(startDate, { days: index }))
    })
    const totalUpcomingEvents: any[] = []
    dateInMonth.map(item => {
      const fullDate = item;

      const day = getDay(fullDate); // get number day of week
      const date = getDate(fullDate); // get number date of month
      const month = getMonth(fullDate); // get number month of year
      const year = getYear(fullDate); // get number year

      const filterDate = raw_data.filter(event => {
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
      filterDate.sort((a, b) => {
        return a.start_timestamp - b.start_timestamp;
      });

      totalUpcomingEvents.push(filterDate)
    })
    return {
      totalUpcomingEvents,
      date: data.date
    };
  }
)


export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    // Phương: Lưu ý luôn là ở đây cần cặp ngoặc nhọn cho function trong reducer cho dù code bên trong chỉ có 1 dòng, đây là rule của Redux
    // Phương: https:// Phương:redux-toolkit.js.org/usage/immer-reducers#mutating-and-returning-state
    updateLoadingState: (state, action) => {
      const isLoading = action.payload
      state.isLoading = isLoading
    },
    updateUpcomingEvent: (state, action) => {
      const date = getDate(action.payload.date)
      console.log("🚀 ~ date:", date)
      state.upcomingEvents = state.totalUpcomingEvents.length === 0 ? [] : state.totalUpcomingEvents[date - 1]
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getTotalEventAPI.fulfilled, (state, action) => {
      const { totalUpcomingEvents, date } = action.payload
      console.log("🚀 ~ builder.addCase ~ upcomingEvents:", totalUpcomingEvents)
      state.totalUpcomingEvents = totalUpcomingEvents

      state.upcomingEvents = state.totalUpcomingEvents[getDate(date) - 1]
    })
  }
})
// Phương: 
export const {
  updateLoadingState,
  updateUpcomingEvent
} = eventSlice.actions

// Phương: Selectors: mục đích là dành cho các components bên dưới gọi bằng useSelector() tới nó
// Phương: để lấy dữ liệu từ trong redux store ra sử dụng

export const selectUpcomingEvents = (state: any) => {
  return state.event.upcomingEvents
}

export const selectTotalUpcomingEvents = (state: any) => {
  return state.event.totalUpcomingEvents
}

export const selectLoadingEvents = (state: any) => {
  return state.event.isLoading
}

// Phương: Export default cái eventReducer của chúng ta để combineReducers trong store
export const eventReducer = eventSlice.reducer