import { CardFlipAnimation } from "@/component/CardFlipAnimation";
import { View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#1D1E22",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CardFlipAnimation />
    </View>
  );
}
