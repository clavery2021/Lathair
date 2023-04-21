import Animated, {
    useSharedValue,
    useAnimatedStyle,
    interpolate,
    withTiming,
    withDelay,
    runOnJS,
  } from "react-native-reanimated";

  import {
    Dimensions,
   
  } from "react-native";

  // export const imageAnimatedStyle = useAnimatedStyle(() => {
  //   const imagePosition = useSharedValue(1);
  //   const { height } = Dimensions.get("window");
  //   const interpolation = interpolate(
  //     imagePosition.value,
  //     [0, 1],
  //     [-height / 2, 0]
  //   );
  //   return {
  //     transform: [
  //       { translateY: withTiming(interpolation, { duration: 1000 }) },
  //     ],
  //   };
  // });

  // export const buttonsAnimatedStyle = useAnimatedStyle(() => {
  //   const imagePosition = useSharedValue(1);
  //   const interpolation = interpolate(imagePosition.value, [0, 1], [250, 0]);
  //   return {
  //     opacity: withTiming(imagePosition.value, { duration: 500 }),
  //     transform: [
  //       { translateY: withTiming(interpolation, { duration: 1000 }) },
  //     ],
  //   };
  // });

  // export const closeButtonContainerStyle = useAnimatedStyle(() => {
  //   const imagePosition = useSharedValue(1);
  //   const interpolation = interpolate(imagePosition.value, [0, 1], [180, 360]);
  //   return {
  //     opacity: withTiming(imagePosition.value === 1 ? 0 : 1, { duration: 800 }),
  //     transform: [
  //       { rotate: withTiming(interpolation + "deg", { duration: 1000 }) },
  //     ],
  //   };
  // });

  // export const formAnimatedStyle = useAnimatedStyle(() => {
  //   const imagePosition = useSharedValue(1);
  //   return {
  //     opacity:
  //       imagePosition.value === 0
  //         ? withDelay(400, withTiming(1, { duration: 800 }))
  //         : withTiming(0, { duration: 300 }),
  //   };
  // });

  // export const formButtonAnimatedStyle = useAnimatedStyle(() => {
  //   const formButtonScale = useSharedValue(1);
  //   return {
  //     transform: [{scale: formButtonScale.value}]
  //   }
  // })