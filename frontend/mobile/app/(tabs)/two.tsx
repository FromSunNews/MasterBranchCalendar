import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

import BigCalendar from "@/components/calendar/BigCalendar";

export default function TabTwoScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.containerScrollView}>
        <BigCalendar />
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
});
