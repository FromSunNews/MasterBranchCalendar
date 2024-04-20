import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { add, format, getDate, getMonth, isThisMonth, sub } from "date-fns";
import BaseCalendar from "./BaseCalendar";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/assets/constants/colors";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentDate,
  selectCurrentNumberDay,
  updateCurrentGlobalState,
} from "@/redux/global/global_slice";
import {
  getTotalEventAPI,
  updateUpcomingEvent,
} from "@/redux/event/event_slice";

const BigCalendar = () => {
  const currentDate = useSelector(selectCurrentDate);
  const selectedMonth = useSelector(selectCurrentNumberDay);
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
    <BaseCalendar
      typeCalendar="BIG_VIEW"
      value={currentDate}
      dateNum={getDate(currentDate)}
      onChange={(date: Date) => handleOnChange(date)}
      header={
        <View style={styles.headerContainer}>
          <View style={styles.navigationContainer}>
            <TouchableOpacity
              onPress={() => handleNavigateMonth("BEFORE")}
              style={{
                height: 40,
                width: 40,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesome
                name="angle-left"
                color={Colors.light.blue}
                size={24}
                style={{}}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleNavigateMonth("NEXT")}
              style={{
                height: 40,
                width: 40,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesome
                name="angle-right"
                color={Colors.light.blue}
                size={24}
                style={{}}
              />
            </TouchableOpacity>

            <View style={styles.monthTextContainer}>
              <Text style={styles.monthText}>
                {format(currentDate, "MMMM yyyy")}
              </Text>
            </View>
          </View>
        </View>
      }
      styleCell={styles.styleCell}
    />
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 4,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  navigationContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  monthTextContainer: {
    alignItems: "center",
  },
  monthText: {
    fontWeight: "bold",
    color: Colors.light.blue,
    fontSize: 18,
  },
  eventView: {
    marginHorizontal: 2,
    marginBottom: 6,
    paddingLeft: 2,
    borderBottomLeftRadius: 2,
    borderRadius: 2,
    borderLeftColor: Colors.light.blue,
    borderLeftWidth: 2,
    backgroundColor: Colors.light.gray,
  },
  eventText: {
    fontSize: 10,
  },
  moreText: {
    color: Colors.light.blue_light,
    marginLeft: 3,
    fontSize: 10,
    // marginTop: -4,
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  styleCell: {
    borderWidth: 1,
    borderColor: Colors.light.dark_gray,
    borderRadius: 4,
    width: `${100 / 8}%`,
    height: 130,
    alignItems: "flex-start",
    margin: 3,
  },
});

export default BigCalendar;
