import React, { useLayoutEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import Animated, { Easing } from "react-native-reanimated";
const {
  Value,
  useCode,
  set,
  block,
  cond,
  clockRunning,
  startClock,
  timing,
  debug,
  stopClock,
  Clock,
  not,
  Extrapolate,
  eq,
  add,
} = Animated;
import {
  bInterpolate,
  useTransition,
  onGestureEvent,
} from "react-native-redash";
import Icon from "react-native-vector-icons/Ionicons";
import { State, TapGestureHandler } from "react-native-gesture-handler";
const Home = ({ navigation }) => {
  // const [expanded, setExpanded] = useState(false);
  const expanded = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const gestureHandler = onGestureEvent({ state });
  const clock = new Clock();
  useCode(() => {
    return Animated.block([
      cond(eq(state, State.END), set(expanded, not(expanded))),
    ]);
  }, []);
  const animation = useTransition(expanded);
  const scale = bInterpolate(animation, 0.4, 2);
  // const rotate = bInterpolate(animation, 0, 2 * Math.PI * 5);
  const rotate = bInterpolate(animation, 0, -Math.PI);
  const borderRadius = bInterpolate(animation, 0, 50);
  const IconAnim = Animated.createAnimatedComponent(Icon);
  const size = bInterpolate(animation, 100, 50);
  const iconSize = add(size, 50);
  return (
    <TouchableWithoutFeedback
      style={styles.container}
      // onPress={() => {
      //   setExpanded(!expanded);
      // }}
    >
      <View style={styles.container}>
        {/* <Animated.Image
          source={{ uri: "https://reactnative.dev/img/showcase/facebook.png" }}
          style={[
            styles.image,
            {
              transform: [
                {
                  scale: scale,
                },
                {
                  rotate: rotate,
                },
              ],
            },
          ]}
        /> */}
        <TapGestureHandler
          style={{ backgroundColor: "red" }}
          maxDist={0}
          {...gestureHandler}
        >
          <Animated.View
            style={[
              styles.box,
              {
                borderRadius: borderRadius,
                width: iconSize,
                height: iconSize,
              },
            ]}
          >
            <IconAnim
              name="ios-arrow-up"
              style={{
                transform: [
                  {
                    rotate,
                  },
                ],
              }}
              size={60}
              color="#fff"
            />
          </Animated.View>
        </TapGestureHandler>
      </View>
    </TouchableWithoutFeedback>
  );
};
Home.navigationOptions = ({ navigation }) => {
  console.log(navigation.state);
  return {
    headerTransparent: true,
  };
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
  box: {
    height: 100,
    width: 100,
    backgroundColor: "tomato",
    borderRadius: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
