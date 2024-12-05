import { Dimensions, Image, Text, View } from "react-native";
import Animated, {
  clamp,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const title = "Naruto Shippuden";

const imageWidth = Dimensions.get("screen").width;
const imageHeight = imageWidth * (445 / 300);

export function StickyHeaderAnimation() {
  const opacity = useSharedValue(0);
  const imageOpacity = useSharedValue(1);
  const imageScale = useSharedValue(1);

  const insets = useSafeAreaInsets();

  const animatedTitleStyle = useAnimatedStyle(
    () => ({
      opacity: opacity.value,
    }),
    []
  );

  const animatedImageStyle = useAnimatedStyle(
    () => ({
      opacity: imageOpacity.value,
      transform: [{ scale: imageScale.value }],
    }),
    []
  );

  const handleScroll = useAnimatedScrollHandler((event) => {
    opacity.value = interpolate(
      event.contentOffset.y,
      [imageHeight - 20, imageHeight],
      [0, 1]
    );

    imageOpacity.value = interpolate(
      event.contentOffset.y,
      [0, imageHeight],
      [1, 0]
    );

    imageScale.value = clamp(
      interpolate(event.contentOffset.y, [0, imageHeight], [1, 0.5]),
      0.5,
      1
    );
  });

  return (
    <>
      <Animated.View
        style={[
          { position: "absolute", top: 0, left: 0, transformOrigin: "top" },
          animatedImageStyle,
        ]}
      >
        <Image
          style={{ height: imageHeight, width: imageWidth }}
          resizeMode="contain"
          source={{ uri: "https://picsum.photos/300/445" }}
        />
      </Animated.View>

      <SafeAreaView>
        <Animated.View
          style={[
            {
              backgroundColor: "black",
              position: "absolute",
              top: insets.top,
              padding: 10,
              width: imageWidth,
              zIndex: 10,
            },
            animatedTitleStyle,
          ]}
        >
          <Text style={{ color: "lime", fontSize: 24, textAlign: "center" }}>
            {title}
          </Text>
        </Animated.View>
        <Animated.ScrollView onScroll={handleScroll}>
          <View style={{ marginTop: imageHeight }}>
            <Text style={{ color: "lime", fontSize: 24, textAlign: "center" }}>
              {title}
            </Text>
            <Text
              style={{ marginHorizontal: 20, color: "white", fontSize: 20 }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
              error ullam blanditiis quibusdam obcaecati minus vero eaque natus
              corporis, delectus voluptates ea aliquam nihil exercitationem
              vitae nulla atque dignissimos dolore libero consequuntur molestiae
              cumque similique? Voluptatum adipisci, quaerat maxime quisquam
              nemo incidunt, commodi, est fugiat facere veritatis nostrum
              aliquam quo! Aliquid, ipsa alias iste dolorum facere vero totam
              dolore! Qui at tempore harum ipsum necessitatibus deserunt
              laudantium mollitia consequatur eveniet animi, ut repellendus,
              molestiae quos quis laboriosam distinctio iure temporibus
              provident neque voluptatem veritatis doloribus praesentium!
              Ratione labore quisquam fugit mollitia? Quisquam asperiores velit
              omnis ipsam, sapiente ut nemo quae consequuntur iure tenetur
              itaque eligendi sed alias nobis animi ratione nesciunt aspernatur
              repellendus repellat maiores. Totam dolores cumque maiores,
              reprehenderit temporibus eum dignissimos asperiores eligendi
              dolorum laborum quibusdam, voluptas ducimus beatae delectus itaque
              labore vitae laudantium nostrum vero expedita repellat, fugiat
              voluptatem perferendis esse? Nobis quae tempore cumque maxime
              debitis quasi reiciendis cupiditate architecto velit corrupti
              quaerat dolorem ratione dolor voluptate officiis, quam sed rem
              commodi earum esse. Commodi libero placeat sunt rerum neque,
              tenetur provident error velit, veritatis cupiditate eveniet ad
              voluptates quibusdam magni voluptatibus modi in facere doloribus!
              Soluta aut quia voluptatem esse eum nisi. Voluptatem quam fugit,
              dignissimos repellendus non voluptatibus voluptas! Quo dolorem
              dolore aspernatur odit numquam omnis, repellat delectus eos vero
              nesciunt pariatur dicta quidem labore quia rerum, eligendi ea?
              Eaque omnis aut velit. Iusto dignissimos beatae sequi sit aliquid
              ad distinctio eaque nostrum commodi? Modi iure nostrum perferendis
              necessitatibus placeat quasi, voluptas architecto. Consequatur
              tempore alias enim praesentium quam porro ipsam culpa harum, nisi
              odio adipisci eos iste architecto. At, quaerat, sit nobis aliquam
              rem eos fugiat explicabo suscipit perferendis maxime vitae
              deserunt! Recusandae aliquam ut eveniet, quia ratione officiis
              eligendi neque quaerat, sint voluptas nulla pariatur laboriosam,
              mollitia incidunt voluptatem aspernatur esse doloribus fugiat
              soluta quo? Atque, labore. Alias aspernatur, repudiandae, quo vel
              aperiam tenetur corrupti blanditiis odit voluptatem, libero itaque
              natus in nemo reiciendis fugit nobis iure quidem debitis dolore
              iste. Voluptate dolores, esse voluptatem accusantium aut inventore
              veniam quam quae blanditiis corrupti adipisci ratione! Cupiditate
              perspiciatis ullam vel adipisci nobis! Temporibus alias
              exercitationem quae dolorem repellat unde. Sed, vero ratione aut
              assumenda inventore illo itaque eos hic nobis sunt consequatur
              molestiae minus quia quis sapiente eligendi aperiam. Facere
              blanditiis magni quidem quia aut officia molestias aperiam, enim
              unde tempore nam voluptate, corporis eligendi pariatur excepturi
              nesciunt culpa cupiditate ipsam optio est.
            </Text>
          </View>
        </Animated.ScrollView>
      </SafeAreaView>
    </>
  );
}
