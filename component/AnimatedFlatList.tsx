import { memo } from "react";
import { FlatList, ViewToken } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const data = Array(50)
  .fill(null)
  .map((_, i) => ({ id: i + 1 }));

export function AnimatedFlatlist() {
  const viewableItems = useSharedValue<ViewToken[]>([]);

  return (
    <FlatList
      scrollEventThrottle={16}
      onViewableItemsChanged={(info) => {
        viewableItems.value = info.viewableItems;
      }}
      contentContainerStyle={{ paddingVertical: 100 }}
      data={data}
      renderItem={({ item }) => (
        <ListItem item={item} viewableItems={viewableItems} />
      )}
    />
  );
}

const ListItem = memo(function ({ item, viewableItems }: any) {
  const animatedStyle = useAnimatedStyle(() => {
    const isViewable = viewableItems.value
      .map((item: any) => item.item.id)
      .includes(item.id);

    return {
      opacity: withSpring(isViewable ? 1 : 0),
      transform: [{ scale: withSpring(isViewable ? 1 : 0.9) }],
    };
  });

  return (
    <Animated.View
      style={[
        {
          height: 80,
          width: 350,
          backgroundColor: "aqua",
          borderRadius: 10,
          marginBottom: 10,
        },
        animatedStyle,
      ]}
    />
  );
});
