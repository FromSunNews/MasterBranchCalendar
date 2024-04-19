import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { EventRequest } from '../../api/common/request/event.request';
import { raw_data } from '../../assets/data/raw_data';
import { add, differenceInDays, endOfMonth, getDate, getDay, getMonth, getYear, startOfMonth } from 'date-fns';
import { EventState } from '../interfaces/event_state.interface';
import { AppGlobalState } from '../interfaces/app_global_state.interface';
import { EventResponse } from '../../api/common/response/event.response';
import EventService from '../../api/event/event.api';

// Khởi tạo giá trị một giá trị của Slice trong Redux
const initialState: EventState = {
  upcomingEvents: [],
  totalUpcomingEvents: [],
  isLoading: false
}

export const getTotalEventAPI = createAsyncThunk(
  'event/getTotalEventAPI',
  async (data: EventRequest) => {
    // call api
    const request = await EventService.getUpcomingEvent(data);
    return {
      totalUpcomingEvents: request,
      date: data.date
    } as any;
  }
)


export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    // Phương: Lưu ý luôn là ở đây cần cặp ngoặc nhọn cho function trong reducer cho dù code bên trong chỉ có 1 dòng, đây là rule của Redux
    // Phương: https:// Phương:redux-toolkit.js.org/usage/immer-reducers#mutating-and-returning-state
    updateLoadingState: (state: EventState, action: PayloadAction<any>) => {
      const isLoading = action.payload
      state.isLoading = isLoading
    },
    updateUpcomingEvent: (state: EventState, action: PayloadAction<any>) => {
      const date = getDate(action.payload.date)
      console.log("🚀 ~ date:", date)
      state.upcomingEvents = state.totalUpcomingEvents.length === 0 ? [] : state.totalUpcomingEvents[date - 1]
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getTotalEventAPI.fulfilled, (state: EventState, action: PayloadAction<any>) => {
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

export const selectUpcomingEvents = (state: AppGlobalState) => {
  return state.event.upcomingEvents
}

export const selectTotalUpcomingEvents = (state: AppGlobalState) => {
  return state.event.totalUpcomingEvents
}

export const selectLoadingEvents = (state: AppGlobalState) => {
  return state.event.isLoading
}

// Phương: Export default cái eventReducer của chúng ta để combineReducers trong store
export const eventReducer = eventSlice.reducer