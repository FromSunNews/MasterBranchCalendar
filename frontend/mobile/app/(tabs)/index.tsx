import { SafeAreaView, StyleSheet, View, ScrollView } from "react-native";
import SmallCalendar from "@/components/calendar/SmallCalendar";
import Colors from "@/assets/constants/colors";
import UpcomingEvent from "@/components/upcoming-event/UpcomingEvent";

export default function TabOneScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.containerScrollView}>
        <SmallCalendar />
        <View style={styles.dividedView} />

        <UpcomingEvent />

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
});
