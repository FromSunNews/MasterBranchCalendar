import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { getMonth } from 'date-fns'
import { AppGlobalState } from '../interfaces/app_global_state.interface'
import { GlobalState } from '../interfaces/global_state.interface'

// Khởi tạo giá trị một giá trị của Slice trong Redux
const initialState: GlobalState = {
  current_date_selected: new Date(),
  number_day_in_month_selected: getMonth(new Date()),
}


export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    updateCurrentDate: (state: GlobalState, action: PayloadAction<any>) => {
      const currentDateSelected = action.payload
      state.current_date_selected = currentDateSelected
    },

    updateNumberDaySelected: (state: GlobalState, action: PayloadAction<any>) => {
      const numberDayInMonthSelected = action.payload
      state.number_day_in_month_selected = numberDayInMonthSelected
    },

    updateCurrentGlobalState: (state: GlobalState, action: PayloadAction<any>) => {
      const globalState = action.payload
      state.current_date_selected = globalState.current_date_selected
      state.number_day_in_month_selected = globalState.number_day_in_month_selected
    }
  }
})

export const {
  updateCurrentDate,
  updateNumberDaySelected,
  updateCurrentGlobalState
} = globalSlice.actions


export const selectCurrentDate = (state: AppGlobalState) => {
  return state.global.current_date_selected
}

export const selectCurrentNumberDay = (state: AppGlobalState) => {
  return state.global.number_day_in_month_selected
}

export const globalReducer = globalSlice.reducer