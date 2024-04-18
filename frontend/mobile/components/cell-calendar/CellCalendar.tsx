import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

interface CellCalendarProps {
  children?: React.ReactNode;
  style?: ViewStyle;
  onClick?: () => void | undefined;
}

const CellCalendar: React.FC<CellCalendarProps> = ({
  children,
  style,
  onClick,
}) => {
  const containerStyle = [
    styles.container,
    style && { ...StyleSheet.flatten(style) },
  ];

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onClick}
      activeOpacity={0.8}
    >
      <View style={styles.contentContainer}>{children}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CellCalendar;
