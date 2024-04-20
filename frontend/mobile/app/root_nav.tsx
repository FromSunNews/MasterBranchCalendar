import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "@/assets/hooks/useColorScheme";
import { Stack } from "expo-router";
import { getTotalEventAPI } from "@/redux/event/event_slice";
import { useDispatch } from "react-redux";
import React from "react";

export function RootLayoutNav() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getTotalEventAPI({ date: new Date() }) as any);
  }, []);

  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
    </ThemeProvider>
  );
}
