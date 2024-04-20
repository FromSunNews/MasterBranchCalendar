import {
  FlatList,
  Image,
  Linking,
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
import Colors from "@/assets/constants/colors";
import { selectTotalUpcomingEvents } from "@/redux/event/event_slice";
import { useSelector } from "react-redux";
import { EventResponse } from "@/api/common/response/event.response";

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
  typeCalendar,
}: BaseCalendarProps) => {
  console.log("🚀 ~ dateNum:", dateNum);
  console.log("🚀 ~ styleHeader:", styleHeader);

  const [selectedDate, setSelectedDate] = React.useState(dateNum);
  const totalUpcomingEvents = useSelector(selectTotalUpcomingEvents);

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
            <View
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                paddingTop: 5,
              }}
            >
              <TouchableOpacity
                onPress={() => handleOnChange(date)}
                style={{
                  backgroundColor:
                    date === selectedDate ? Colors.light.blue : "transparent",
                  borderRadius: 100,
                  width: 32,
                  height: 32,
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 0,
                }}
              >
                <Text
                  style={{
                    color: date === selectedDate ? "white" : Colors.light.text,
                  }}
                >
                  {date}
                </Text>
              </TouchableOpacity>
              {/* {childrenCell} */}
              {typeCalendar === "BIG_VIEW" &&
                totalUpcomingEvents[index] &&
                totalUpcomingEvents[index].map(
                  (event: EventResponse, small_index: number) => {
                    if (small_index <= 3) {
                      return (
                        <TouchableOpacity
                          key={small_index}
                          onPress={() =>
                            event.meeting_url &&
                            Linking.openURL(event.meeting_url)
                          }
                          style={[
                            styles.eventContainer,
                            {
                              borderLeftColor: event.primary_color,
                              backgroundColor: event.background_color,
                            },
                          ]}
                        >
                          <Text numberOfLines={1} style={styles.eventText}>
                            {event.title}
                          </Text>
                        </TouchableOpacity>
                      );
                    } else if (small_index === 4) {
                      return (
                        <TouchableOpacity
                          key={small_index}
                          style={styles.viewMoreContainer}
                        >
                          <Text style={styles.viewMoreText}>
                            {`${totalUpcomingEvents[index].length - 2} more`}
                          </Text>
                        </TouchableOpacity>
                      );
                    } else {
                      return null;
                    }
                  }
                )}
            </View>
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
  eventContainer: {
    borderLeftWidth: 2,
    // width: "100%",
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 1,
    marginHorizontal: 2,
    alignSelf: "stretch",
    marginTop: 4,
  },
  eventText: {
    fontSize: 10,
    color: Colors.light.text,
    marginLeft: 1,
    paddingVertical: 2,
  },
  viewMoreContainer: {
    marginTop: 2,
    paddingVertical: 2,
  },
  viewMoreText: {
    fontSize: 10,
    fontWeight: "bold",
    color: Colors.light.blue_light,
  },
});

export default BaseCalendar;
