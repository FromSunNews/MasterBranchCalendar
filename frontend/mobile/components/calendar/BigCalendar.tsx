import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { add, format, getDate, getMonth, isThisMonth, sub } from "date-fns";
import BaseCalendar from "./BaseCalendar";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/colors";

const BigCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(getMonth(new Date()));

  const handleNavigateMonth = (typeNavigate: string) => {
    if (typeNavigate === "BEFORE") {
      const previousMonthDate = sub(currentDate, { months: 1 });
      setCurrentDate(previousMonthDate);
      setSelectedMonth(getMonth(previousMonthDate));
    } else {
      const nextMonthDate = add(currentDate, { months: 1 });
      setCurrentDate(nextMonthDate);
      setSelectedMonth(getMonth(nextMonthDate));
    }
  };

  const handleToDayClick = () => {
    setCurrentDate(new Date());
    setSelectedMonth(getMonth(new Date()));
  };

  const handleSelectMonth = (value: number) => {
    setSelectedMonth(value);
    if (getMonth(currentDate) > value) {
      setCurrentDate(
        sub(currentDate, { months: Math.abs(getMonth(currentDate) - value) })
      );
    } else if (getMonth(currentDate) < value) {
      setCurrentDate(
        add(currentDate, { months: Math.abs(getMonth(currentDate) - value) })
      );
    }
  };

  return (
    <BaseCalendar
      typeCalendar="BIG_VIEW"
      value={currentDate}
      dateNum={getDate(currentDate)}
      onChange={setCurrentDate}
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
      childrenCell={
        <View
          style={{
            width: "100%",
          }}
        >
          <View style={styles.eventView}>
            <Text numberOfLines={1} style={styles.eventText}>
              First 123 21324124
            </Text>
          </View>

          <View style={styles.eventView}>
            <Text numberOfLines={1} style={styles.eventText}>
              First asd123
            </Text>
          </View>
          <Text style={styles.moreText}>2 more</Text>
        </View>
      }
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
