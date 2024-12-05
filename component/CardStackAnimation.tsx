import { useEffect } from "react";
import { Pressable } from "react-native";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export const _colors = [
  "#bf4949",
  "#db7b7b",
  "#FFADAD",
  "#FFD6A5",
  "#FDFFB6",
  "#FFC6FF",
  "#9BF6FF",
  "#A0C4FF",
  "#BDB2FF",
  "#FFC6FF",
  "#8f81e3",
];

export function CardStackAnimation() {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(1, { duration: 1000 });
  }, []);

  return (
    <Pressable
      style={{ height: 160, width: 90 }}
      onPress={() => {
        if (progress.value === 0) {
          progress.value = withTiming(1);
        }
        if (progress.value === 1) {
          progress.value = withTiming(2);
        }
      }}
      onLongPress={() => {
        if (progress.value === 1) {
          progress.value = withTiming(0);
        } else {
          progress.value = withTiming(1);
        }
      }}
    >
      {Array(11)
        .fill(null)
        .map((_, i) => (
          <Card key={i} index={i} progress={progress} />
        ))}
    </Pressable>
  );
}

const Card = function ({
  index,
  progress,
}: {
  index: number;
  progress: SharedValue<number>;
}) {
  const animatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      progress.value,
      [0, 1, 2],
      [0, (index - 5) * 10, 0]
    );
    const left = interpolate(progress.value, [0, 1, 2], [0, 0, index * 100]);

    return {
      transform: [{ rotate: `${rotate}deg` }],
      left: left,
    };
  });

  return (
    <Animated.View
      key={index}
      style={[
        {
          height: 160,
          width: 100,
          backgroundColor: _colors[index],
          position: "absolute",
          borderWidth: 1,
          borderColor: "rgba(0,0,0,0.2)",
          borderRadius: 16,
          zIndex: index * -1,
          transformOrigin: "bottom",
        },
        animatedStyle,
      ]}
    />
  );
};
