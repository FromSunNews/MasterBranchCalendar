import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { add, format, getDate, getMonth, sub } from "date-fns";
import BaseCalendar from "./BaseCalendar";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/assets/constants/colors";
import {
  getTotalEventAPI,
  updateUpcomingEvent,
} from "@/redux/event/event_slice";
import {
  selectCurrentDate,
  updateCurrentGlobalState,
} from "@/redux/global/global_slice";
import { useDispatch, useSelector } from "react-redux";

const SmallCalendar = () => {
  const currentDate = useSelector(selectCurrentDate);
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
      value={currentDate}
      dateNum={getDate(currentDate)}
      onChange={(date: Date) => handleOnChange(date)}
      header={
        <View style={styles.headerContainer}>
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

          <View style={styles.monthTextContainer}>
            <Text style={styles.monthText}>
              {format(currentDate, "MMMM yyyy")}
            </Text>
          </View>

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
        </View>
      }
      typeCalendar={"SMALL_VIEW"}
    />
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    // paddingHorizontal: 10,
    // paddingVertical: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  navigationButton: {
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: "blue",
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  navigationButtonText: {
    color: "blue",
  },
  monthTextContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  monthText: {
    fontWeight: "bold",
    color: Colors.light.blue,
    fontSize: 18,
  },
  monthSelectContainer: {
    backgroundColor: "blue",
    paddingHorizontal: 3,
    borderRadius: 16,
    height: 32,
    width: 100,
    justifyContent: "center",
  },
  monthPicker: {
    backgroundColor: "red",
  },
  eventView: {
    marginHorizontal: 2,
    marginBottom: 6,
    paddingLeft: 2,
    borderBottomLeftRadius: 2,
    borderTopLeftRadius: 2,
    borderLeftColor: "blue",
    borderLeftWidth: 2,
    backgroundColor: "gray",
  },
  eventText: {
    fontSize: 10,
  },
  moreText: {
    color: "blue",
    marginLeft: 3,
    fontSize: 10,
    // marginTop: -4,
    textDecorationLine: "underline",
  },
  styleCell: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    width: `${100 / 8}%`,
    height: 130,
    alignItems: "flex-start",
    margin: 3,
  },
});

export default SmallCalendar;
