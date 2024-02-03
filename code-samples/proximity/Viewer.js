import { StyleSheet, View } from "react-native"
import Animated, { interpolate, runOnJS, useAnimatedReaction, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { useSafeAreaFrame, useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import PlatformIconButton from "./platformIconButton";
import { HEADER_HEIGHT } from "../constants";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const springConfig = {
  mass: 0.5,
  damping: 20,
  stiffness: 150,
  overshootClamping: true,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 5,
};

const Viewer = ({ header, children }) => {
  const navigation = useNavigation();

  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets();

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(frame.height);
  const scale = useSharedValue(1);
  const isBackingFromFlick = useSharedValue(false);
  const isBacking = useSharedValue(false);

  const backdropContainerStyle = useAnimatedStyle(() => ({
    flex: 1,
    backgroundColor: "black",
    opacity: interpolate(
      translateY.value,
      [-frame.height, 0, frame.height / 2],
      [0, 1, 0],
    ),
  }));

  const headerContainerStyle = useAnimatedStyle(() => ({
    position: "absolute",
    top: insets.top,
    left: 0,
    right: 0,
    opacity: interpolate(
      translateY.value,
      [-frame.height, 0, frame.height / 2],
      [0, 1, 0],
    ),
  }));

  const childrenContainerStyle = useAnimatedStyle(() => ({
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    transform: [ { translateY: translateY.value }, { scale: scale.value }, { translateX: translateX.value } ],
  }))

  useEffect(() => {
    translateY.value = withSpring(0, springConfig);
  }, []);

  const onClose = () => {
    translateY.value = withSpring(frame.height + 100, springConfig);
  };

  useAnimatedReaction(() => translateY.value, (currentValue, previousValue) => {
    if (!isBacking.value && (currentValue > frame.height || currentValue < -frame.height)) {
      isBacking.value = true
      runOnJS(navigation.goBack)();
    }
  });
  
  const pan = Gesture.Pan().maxPointers(1)
    .onChange((e) => {
      translateY.value = e.translationY;
    })
    .onFinalize((e) => {
      if (Math.abs(e.velocityY) > 1200) {
        isBackingFromFlick.value = true
        // It's a flick
        if (e.velocityY < 0) {
          // flicked upward
          translateY.value = withSpring(-frame.height - 100, {...springConfig, velocity: e.velocityY });
        } else {
          // flicked downward
          translateY.value = withSpring(frame.height + 100, {...springConfig, velocity: e.velocityY });
        }
      } else {
        // It's a drag
        translateY.value = withSpring(0, {...springConfig, velocity: e.velocityY});
      }
    })
  
  const pinchPan = Gesture.Pan().minPointers(2)
    .onChange((e) => {
      translateY.value = e.translationY;
      translateX.value = e.translationX;
    })
    .onFinalize((e) => {
      if (!isBackingFromFlick.value) {
        translateY.value = withSpring(0, springConfig);
        translateX.value = withSpring(0, springConfig);
      }
    })
  
  const pinch = Gesture.Pinch()
  .onChange((e) => {
    scale.value = e.scale
  }).onFinalize((e) => {
    scale.value = withSpring(1, springConfig);
  })

  const combined = Gesture.Simultaneous(pan, pinch, pinchPan);

  return (
    <View style={styles.container}>
      <Animated.View style={backdropContainerStyle}/>

      <GestureDetector gesture={combined}>
          <Animated.View style={childrenContainerStyle}>
            { children }
          </Animated.View>
      </GestureDetector>

      <Animated.View style={headerContainerStyle}>
        <View style={{ flexDirection: "row", paddingHorizontal: 10, height: HEADER_HEIGHT, alignItems: "center" }}>
          <View style={{ width: 60, alignItems: "flex-start" }}>
            <PlatformIconButton name="close" color="white" size="xxl" onPress={onClose} />
          </View>
          <View style={{ flex: 1 }}>
            { header }
          </View>
          <View style={{ width: 60 }} />
        </View>
      </Animated.View>
    </View>
  );
};

export default Viewer;