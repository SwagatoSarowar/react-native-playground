import { Image, Pressable, Text, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const height = 160;
const width = 90;

export function CardFlipAnimation() {
  return (
    <View>
      <Pressable
        style={{ display: "flex", flexDirection: "row", columnGap: 8 }}
      >
        {Array(3)
          .fill(null)
          .map((_, i) => (
            <Card index={i} />
          ))}
      </Pressable>
    </View>
  );
}

const Card = function ({ index, onPress }: any) {
  const flipProgress = useSharedValue(0);

  const frontCardAnimatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(flipProgress.value, [0, 1], [0, 180]);
    return {
      transform: [{ rotateY: `${rotate}deg` }],
    };
  });

  const backCardAnimatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(flipProgress.value, [0, 1], [180, 360]);
    return {
      transform: [{ rotateY: `${rotate}deg` }],
    };
  });

  return (
    <Pressable
      onPress={() => {
        if (flipProgress.value === 0) {
          flipProgress.value = withSpring(1);
        } else if (flipProgress.value === 1) {
          flipProgress.value = withSpring(0);
        }
      }}
      onLongPress={() => (flipProgress.value = withSpring(0))}
    >
      <Animated.View style={[]}>
        <Animated.View style={[{ width, height }, frontCardAnimatedStyle]}>
          <Image
            source={{ uri: "https://picsum.photos/180/320" }}
            style={{ height, width }}
            resizeMode="contain"
          />
        </Animated.View>
        <Animated.View
          style={[
            {
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "aqua",
              width,
              height,
              position: "absolute",
              backfaceVisibility: "hidden",
            },
            backCardAnimatedStyle,
          ]}
        >
          <Text style={{ textAlign: "center" }}>Card Back</Text>
          <View />
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};
