import { format } from "date-fns";
import React from "react";
import { useDispatch } from "react-redux";
import { updateCurrentShowModal } from "../../redux/global/global_slice";
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/assets/constants/colors";

interface RecurringComponentProps {
  recurring: boolean;
  recurring_pattern: string;
}

const RecurringComponent: React.FC<RecurringComponentProps> = ({
  recurring,
  recurring_pattern,
}) => {
  return (
    <View>
      {recurring && (
        <View style={getContainerStyle(recurring_pattern)}>
          <Text style={styles.textRecuring}>
            {getRecurringText(recurring_pattern)}
          </Text>
        </View>
      )}
    </View>
  );
};

const getContainerStyle = (recurring_pattern: string) => {
  switch (recurring_pattern) {
    case "DAYLY":
      return styles.daylyContainer;
    case "MONTHLY":
      return styles.monthlyContainer;
    case "WEEKLY":
      return styles.weeklyContainer;
    case "YEARLY":
      return styles.yearlyContainer;
    default:
      return null;
  }
};

const getRecurringText = (recurring_pattern: string) => {
  switch (recurring_pattern) {
    case "DAYLY":
      return "Dayly";
    case "MONTHLY":
      return "Monthly";
    case "WEEKLY":
      return "Weekly";
    case "YEARLY":
      return "Yearly";
    default:
      return "";
  }
};

interface CardEventProps {
  id: string;
  title: string;
  type: "BOOKING_CLIENT" | "WEBINAR_EVENT";
  start_time: string;
  end_time: string;
  description: string;
  location?: string;
  recurring: boolean;
  recurring_pattern?: "DAYLY" | "WEEKLY" | "MONTHLY" | "YEARLY";
  primary_color: string;
  background_color: string;
  meeting_url?: string;
  profile_client_url?: string;
  profile_client_image?: string;
}

const CardEvent: React.FC<CardEventProps> = ({
  id,
  title,
  type,
  start_time,
  end_time,
  description,
  location,
  recurring,
  recurring_pattern,
  primary_color,
  meeting_url,
  profile_client_url,
  profile_client_image,
}) => {
  const dispatch = useDispatch();

  const dateFormatStart = format(new Date(start_time), "hh:mm a");
  const dateFormatEnd = format(new Date(end_time), "hh:mm a");
  const dateFormatGMT = format(new Date(start_time), "OOO");

  return (
    <View
      style={[styles.eventDetailContainer, { borderLeftColor: primary_color }]}
    >
      <View style={styles.eventDetail}>
        <View style={styles.eventHeader}>
          <View style={styles.titleContainer}>
            <TouchableOpacity
              onPress={() => meeting_url && Linking.openURL(meeting_url)}
            >
              <Text style={styles.eventTitle}>{title}</Text>
            </TouchableOpacity>
            <Text style={styles.eventSubTitle}>{description}</Text>
            {type === "BOOKING_CLIENT" && (
              <Text style={styles.eventSubTitle}>{location}</Text>
            )}
            <Text style={styles.eventTime}>
              {dateFormatStart + " - " + dateFormatEnd + " " + dateFormatGMT}
            </Text>

            {recurring && recurring_pattern === "DAYLY" && (
              <RecurringComponent
                recurring={recurring}
                recurring_pattern={recurring_pattern}
              />
            )}
          </View>
          <View style={styles.containerAction}>
            {type === "BOOKING_CLIENT" && (
              <TouchableOpacity
                style={styles.actionButtonSmall}
                onPress={() => meeting_url && Linking.openURL(meeting_url)}
              >
                <FontAwesome name="video-camera" color="white" size={18} />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => {}}
              style={styles.actionButtonSmallTrash}
            >
              <FontAwesome name="trash" color="white" size={18} style={{}} />
            </TouchableOpacity>
          </View>
        </View>
        {type === "BOOKING_CLIENT" && (
          <View style={styles.clientProfileContainer}>
            <Image
              source={{ uri: profile_client_image }}
              style={styles.avatar}
            />
            <TouchableOpacity
              onPress={() =>
                profile_client_url && Linking.openURL(profile_client_url)
              }
            >
              <Text style={styles.clientProfileLink}>View Client Profile</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  eventSubTitle: {
    fontSize: 12,
    color: Colors.light.dark_gray,
    marginTop: 2,
  },
  titleContainer: {
    flex: 1,
  },
  eventDetailContainer: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginTop: 16,
    shadowColor: "#545454",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    backgroundColor: "white",
    borderLeftWidth: 6,
  },
  eventTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.light.text,
    textDecorationLine: "underline",
  },
  eventTime: {
    fontSize: 12,
    color: Colors.light.dark_gray,
    marginTop: 2,
  },
  actionButtonSmall: {
    height: 36,
    width: 36,
    backgroundColor: Colors.light.blue,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  actionButtonSmallTrash: {
    height: 36,
    width: 36,
    backgroundColor: Colors.light.gray,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  videoIcon: {
    color: "white",
    marginTop: 5,
  },
  clientProfileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: -3,
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
    marginBottom: 8,
  },
  daylyContainer: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    marginTop: 6,
    paddingVertical: 6,
    borderRadius: 999, // Large enough to make it a circle
    backgroundColor: Colors.light.dayly,
    marginVertical: 2,
    alignItems: "center",
  },
  monthlyContainer: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    marginTop: 6,
    paddingVertical: 6,
    borderRadius: 999, // Large enough to make it a circle
    backgroundColor: Colors.light.monthly,
    marginVertical: 2,
    alignItems: "center",
  },
  weeklyContainer: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    marginTop: 6,
    paddingVertical: 6,
    borderRadius: 999, // Large enough to make it a circle
    backgroundColor: Colors.light.weekly,
    marginVertical: 2,
    alignItems: "center",
  },
  yearlyContainer: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    marginTop: 6,
    paddingVertical: 6,
    borderRadius: 999, // Large enough to make it a circle
    backgroundColor: Colors.light.yearly,
    marginVertical: 2,
    alignItems: "center",
  },
  textRecuring: {
    fontSize: 12,
    color: Colors.light.text,
  },
  containerAction: {
    flexDirection: "column",
  },
});

export default CardEvent;
