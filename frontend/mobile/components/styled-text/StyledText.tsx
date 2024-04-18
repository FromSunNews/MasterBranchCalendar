import { Text, TextProps } from "../themed/Themed";

export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: "SpaceMono" }]} />;
}
