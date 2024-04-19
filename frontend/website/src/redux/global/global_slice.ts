import { createSlice } from '@reduxjs/toolkit'
import { getMonth } from 'date-fns'

// Khởi tạo giá trị một giá trị của Slice trong Redux
const initialState = {
  current_date_selected: new Date(),
  number_day_in_month_selected: getMonth(new Date()),
}


export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    updateCurrentDate: (state, action) => {
      const currentDateSelected = action.payload
      state.current_date_selected = currentDateSelected
    },

    updateNumberDaySelected: (state, action) => {
      const numberDayInMonthSelected = action.payload
      state.number_day_in_month_selected = numberDayInMonthSelected
    },

    updateCurrentGlobalState: (state, action) => {
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


export const selectCurrentDate = (state: any) => {
  return state.global.current_date_selected
}

export const selectCurrentNumberDay = (state: any) => {
  return state.global.number_day_in_month_selected
}

export const globalReducer = globalSlice.reducer