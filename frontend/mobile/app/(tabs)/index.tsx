import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import SmallCalendar from "@/components/calendar/SmallCalendar";
import { format } from "date-fns";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/colors";

export default function TabOneScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.containerScrollView}>
        <SmallCalendar />
        <View style={styles.dividedView} />

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
          <View style={styles.eventDetailContainer}>
            <View style={styles.eventDetail}>
              <View style={styles.eventHeader}>
                <View style={styles.titleContainer}>
                  <Text style={styles.eventTitle}>
                    First Session with Alex Stan
                  </Text>
                  <Text style={styles.eventTime}>9:00 AM - 9:30 AM GMT+8</Text>
                </View>
                <TouchableOpacity style={styles.actionButtonSmall}>
                  <FontAwesome
                    name="video-camera"
                    color="white"
                    size={18}
                    style={{}}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.clientProfileContainer}>
                <Image
                  source={require("../../assets/images/avatar.jpg")}
                  style={styles.avatar}
                />
                <Text style={styles.clientProfileLink}>
                  View Client Profile
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.eventDetailContainer}>
            <View style={styles.eventDetail}>
              <View style={styles.eventHeader}>
                <View style={styles.titleContainer}>
                  <Text style={styles.eventTitle}>
                    First Session with Alex Stan
                  </Text>
                  <Text style={styles.eventTime}>9:00 AM - 9:30 AM GMT+8</Text>
                </View>
                <TouchableOpacity style={styles.actionButtonSmall}>
                  <FontAwesome
                    name="video-camera"
                    color="white"
                    size={18}
                    style={{}}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.clientProfileContainer}>
                <Image
                  source={require("../../assets/images/avatar.jpg")}
                  style={styles.avatar}
                />
                <Text style={styles.clientProfileLink}>
                  View Client Profile
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.eventDetailContainer}>
            <View style={styles.eventDetail}>
              <View style={styles.eventHeader}>
                <View style={styles.titleContainer}>
                  <Text style={styles.eventTitle}>
                    First Session with Alex Stan
                  </Text>
                  <Text style={styles.eventTime}>9:00 AM - 9:30 AM GMT+8</Text>
                </View>
                <TouchableOpacity style={styles.actionButtonSmall}>
                  <FontAwesome
                    name="video-camera"
                    color="white"
                    size={18}
                    style={{}}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.clientProfileContainer}>
                <Image
                  source={require("../../assets/images/avatar.jpg")}
                  style={styles.avatar}
                />
                <Text style={styles.clientProfileLink}>
                  View Client Profile
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.eventDetailContainer}>
            <View style={styles.eventDetail}>
              <View style={styles.eventHeader}>
                <View style={styles.titleContainer}>
                  <Text style={styles.eventTitle}>
                    First Session with Alex Stan
                  </Text>
                  <Text style={styles.eventTime}>9:00 AM - 9:30 AM GMT+8</Text>
                </View>
                <TouchableOpacity style={styles.actionButtonSmall}>
                  <FontAwesome
                    name="video-camera"
                    color="white"
                    size={18}
                    style={{}}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.clientProfileContainer}>
                <Image
                  source={require("../../assets/images/avatar.jpg")}
                  style={styles.avatar}
                />
                <Text style={styles.clientProfileLink}>
                  View Client Profile
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.blankView} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  containerScrollView: {
    flex: 1,
    paddingBottom: 120,
  },
  blankView: { height: 40, width: "100%" },
  dividedView: {
    height: 2,
    backgroundColor: Colors.light.gray,
    marginHorizontal: 20,
    marginTop: 14,
    marginBottom: 8,
    borderRadius: 8,
  },
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
