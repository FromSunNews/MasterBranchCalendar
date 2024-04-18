import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import {
  addDays,
  differenceInDays,
  endOfMonth,
  getDay,
  startOfMonth,
  sub,
} from "date-fns";

import { daysOfWeek } from "@/assets/constants/variables";
import React from "react";
import Colors from "@/constants/colors";

interface BaseCalendarProps {
  value?: Date;
  dateNum?: number;
  onChange?: (value: Date) => void;
  styleContainer?: ViewStyle;
  styleCell?: ViewStyle;
  header?: React.ReactNode;
  styleHeader?: ViewStyle;
  childrenCell?: React.ReactNode;
  typeCalendar?: "SMALL_VIEW" | "BIG_VIEW";
}

const BaseCalendar = ({
  value = new Date(),
  dateNum,
  onChange,
  styleContainer,
  styleCell,
  header,
  styleHeader,
  childrenCell,
  typeCalendar,
}: BaseCalendarProps) => {
  console.log("🚀 ~ dateNum:", dateNum);
  console.log("🚀 ~ styleHeader:", styleHeader);

  const [selectedDate, setSelectedDate] = React.useState(dateNum);

  React.useEffect(() => {
    setSelectedDate(dateNum);
  }, [dateNum]);

  const startDate = startOfMonth(value);
  const endDate = endOfMonth(value);
  const numDaysInMonth = differenceInDays(endDate, startDate) + 1;

  const dateInPrevMonth = sub(value, { months: 1 });
  const startDatePrevMonth = startOfMonth(dateInPrevMonth);
  const endDatePrevMonth = endOfMonth(dateInPrevMonth);
  const numDaysInPrevMonth =
    differenceInDays(endDatePrevMonth, startDatePrevMonth) + 1;

  const prefixDaysInMonth = getDay(startDate);
  const suffixDaysInMonth = 6 - getDay(endDate);

  const handleOnChange = (date: number) => {
    console.log("🚀 ~ handleOnChange ~ date:", date);
    setSelectedDate(date);
    onChange && onChange(addDays(startDate, date - 1)); // date - 1 because startDate is calculated 1 day
  };

  return (
    <View style={styles.container}>
      {header}

      {daysOfWeek.map((day: string, index: number) => (
        <View key={`${day}-${index}`} style={styles.item}>
          <Text
            style={{
              textTransform: "uppercase",
              color: Colors.light.dark_gray,
              fontSize: 12,
              fontWeight: "bold",
            }}
          >
            {day}
          </Text>
        </View>
      ))}

      {/*prefix days in month */}
      {Array.from({ length: prefixDaysInMonth }).map((_, index, arr) => {
        const date = numDaysInPrevMonth - (arr.length - (index + 1));
        return (
          <View
            key={`blank-cell-${index}`}
            style={[
              styles.item,
              styleCell,
              typeCalendar === "BIG_VIEW"
                ? { display: "flex", flexDirection: "row", paddingTop: 12 }
                : {},
            ]}
          >
            <Text style={{ color: Colors.light.dark_gray }}>{date}</Text>
          </View>
        );
      })}

      {/* main days in month*/}
      {Array.from({ length: numDaysInMonth }).map((_, index) => {
        const date = index + 1;
        return (
          <View key={date} style={[styles.item, styleCell]}>
            <TouchableOpacity
              onPress={() => handleOnChange(date)}
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                paddingTop: 5,
              }}
            >
              <View
                style={{
                  backgroundColor:
                    date === selectedDate ? Colors.light.blue : "transparent",
                  borderRadius: 100,
                  width: 32,
                  height: 32,
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: typeCalendar === "BIG_VIEW" ? 6 : 0,
                }}
              >
                <Text
                  style={{
                    color: date === selectedDate ? "white" : Colors.light.text,
                  }}
                >
                  {date}
                </Text>
              </View>
              {childrenCell}
            </TouchableOpacity>
          </View>
        );
      })}

      {/*suffix days in month */}
      {Array.from({ length: suffixDaysInMonth }).map((_, index) => {
        const date = index + 1;
        return (
          <View
            key={`blank-cell-${index}`}
            style={[
              styles.item,
              styleCell,
              typeCalendar === "BIG_VIEW"
                ? { display: "flex", flexDirection: "row", paddingTop: 12 }
                : {},
            ]}
          >
            <Text style={{ color: Colors.light.dark_gray }}>{date}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
  },
  item: {
    width: `${100 / 7}%`,
    height: 40,
    // borderWidth: 1,
    // borderColor: "gray",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default BaseCalendar;
