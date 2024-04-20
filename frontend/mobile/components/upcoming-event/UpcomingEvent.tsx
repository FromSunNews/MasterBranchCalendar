import React from "react";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUpcomingEvent,
  selectUpcomingEvents,
} from "../../redux/event/event_slice";
import { EventResponse } from "../../api/common/response/event.response";
import CardEvent from "../card-event/CardEvent";
import {
  selectCurrentDate,
  updateCurrentShowModal,
} from "../../redux/global/global_slice";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "@/assets/constants/colors";

function UpcomingEvent() {
  const upcomingEvents = useSelector(selectUpcomingEvents);
  const currentDate = useSelector(selectCurrentDate);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(updateUpcomingEvent({ date: currentDate }));
  }, []);

  return (
    <View style={styles.containerEvent}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Upcoming Events</Text>
          <Text style={styles.subtitle}>
            {format(new Date(), "iii, dd LLL")}
          </Text>
        </View>
        <View style={styles.actionButtonContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>View All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Create</Text>
          </TouchableOpacity>
        </View>
      </View>
      {upcomingEvents?.length
        ? upcomingEvents.map((event: EventResponse) => {
            return (
              <CardEvent
                key={event.id}
                id={event.id}
                title={event.title}
                type={event.type}
                start_time={event.start_time}
                end_time={event.end_time}
                description={event.description}
                location={event.location}
                recurring={event.recurring}
                recurring_pattern={event.recurring_pattern}
                primary_color={event.primary_color}
                background_color={event.background_color}
                meeting_url={event.meeting_url}
                profile_client_url={event.profile_client_url}
                profile_client_image={event.profile_client_image}
              />
            );
          })
        : null}
    </View>
  );
}

const styles = StyleSheet.create({
  containerEvent: {
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 14,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: Colors.light.blue,
  },
  subtitle: {
    fontWeight: "bold",
    fontSize: 13,
    color: Colors.light.dark_gray,
    marginTop: 4,
  },
  actionButtonContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  actionButton: {
    height: 30,
    width: 80,
    backgroundColor: Colors.light.blue,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },
  actionButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  eventDetailContainer: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 16,
    shadowColor: "#545454",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    backgroundColor: "white",
  },
  eventTitle: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 4,
    color: Colors.light.blue,
  },
  eventTime: {
    fontSize: 14,
    color: Colors.light.dark_gray,
    marginTop: 4,
  },
  actionButtonSmall: {
    height: 36,
    width: 36,
    backgroundColor: Colors.light.blue,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  videoIcon: {
    color: "white",
    marginTop: 5,
  },
  clientProfileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  avatar: {
    height: 24,
    width: 24,
    borderRadius: 11,
  },
  clientProfileLink: {
    fontSize: 13,
    color: Colors.light.blue_light,
    fontWeight: "600",
    marginLeft: 4,
    textDecorationLine: "underline",
  },
  eventDetail: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  eventHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
});

export default UpcomingEvent;
