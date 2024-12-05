import { Dimensions, Pressable, Text, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { _colors } from "./CardStackAnimation";

const data = Array(10)
  .fill(null)
  .map((_, i) => ({ id: i + 1 }));

const sWidth = Dimensions.get("screen").width;

export function CarouselAnimation() {
  const scrollX = useSharedValue(0);

  const handleScroll = useAnimatedScrollHandler({
    onScroll: (e) => (scrollX.value = e.contentOffset.x),
  });

  return (
    <View>
      <Animated.FlatList
        removeClippedSubviews={false}
        onScroll={handleScroll}
        data={data}
        renderItem={({ item, index }) => (
          <Card index={index} scrollX={scrollX} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      />
    </View>
  );
}

const Card = function ({ index, scrollX }: any) {
  const animatedStyle = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index - 1) * sWidth, index * sWidth, (index + 1) * sWidth],
            [-(sWidth * 0.4), 0, sWidth * 0.4],
            Extrapolation.CLAMP
          ),
        },
        {
          scale: interpolate(
            scrollX.value,
            [(index - 1) * sWidth, index * sWidth, (index + 1) * sWidth],
            [0.9, 1, 0.9],
            Extrapolation.CLAMP
          ),
        },
      ],
      opacity: interpolate(
        scrollX.value,
        [(index - 1) * sWidth, index * sWidth, (index + 1) * sWidth],
        [0.3, 1, 0.3],
        Extrapolation.CLAMP
      ),
    }),
    []
  );

  return (
    <Animated.View
      style={[
        {
          width: sWidth,
          alignItems: "center",
          justifyContent: "center",
        },
        animatedStyle,
      ]}
    >
      <Pressable
        onPress={() => console.log("pressed item ==> ", index)}
        style={{
          gap: 20,
          maxWidth: 200,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            height: 250,
            width: 160,
            backgroundColor: _colors[index],
            borderWidth: 2,
            borderColor: "gray",
            borderRadius: 20,
          }}
        />

        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
            textAlign: "center",
          }}
          numberOfLines={1}
        >
          The main Title number {index}
        </Text>
      </Pressable>
    </Animated.View>
  );
};
