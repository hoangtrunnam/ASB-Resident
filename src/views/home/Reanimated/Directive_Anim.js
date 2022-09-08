import React, { useLayoutEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback
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
  Extrapolate
} = Animated;
import { bInterpolate } from "react-native-redash";
function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0)
  };

  const config = {
    duration: dest.duration || 5000,
    toValue: new Value(dest.toValue),
    easing: dest.easing || Easing.inOut(Easing.ease)
  };

  return block([
    cond(
      clockRunning(clock),
      [
        // if the clock is already running we update the toValue, in case a new dest has been passed in
        set(config.toValue, dest.toValue)
      ],
      [
        // if the clock isn't running we reset all the animation params and start the clock
        set(state.finished, 0),
        set(state.time, 0),
        set(state.position, value),
        set(state.frameTime, 0),
        set(config.toValue, dest.toValue),
        startClock(clock)
      ]
    ),
    // we run the step here that is going to update position
    timing(clock, state, config),
    // if the animation is over we stop the clock
    cond(state.finished, debug("stop clock", stopClock(clock))),
    // we made the block return the updated position
    state.position
  ]);
}

const Home = ({ navigation }) => {
  const [expanded, setExpanded] = useState(false);
  let animation = new Value(expanded ? 1 : 0);
  const clock = new Clock();
  useCode(
    set(
      animation,
      runTiming(clock, animation, {
        toValue: expanded ? 0 : 1,
        duration: 1000,
        easing: Easing.inOut(Easing.ease)
      })
    ),
    [animation]
  );
  const scale = bInterpolate(animation, 0.4, 1);
  /* const scale = Animated.interpolate(animation, {
    inputRange: [0, 1],
    outputRange: [0.4, 1],
    extrapolate: Extrapolate.CLAMP
  }); */
  const rotate = bInterpolate(animation, 0, 2 * Math.PI * 5);
  const borderRadius = bInterpolate(animation,50,0)
  return (
    <TouchableWithoutFeedback
      style={styles.container}
      onPress={() => {
        setExpanded(!expanded);
      }}
    >
      <View style={styles.container}>
        {/*  <Animated.Image
          source={{ uri: "https://reactnative.dev/img/showcase/facebook.png" }}
          style={[
            styles.image,
            {
              transform: [
                {
                  scale: scale
                },
                {
                  rotate: rotate
                }
              ]
            }
          ]}
        /> */}
        <Animated.View style={[styles.box, { borderRadius: borderRadius }]} />
      </View>
    </TouchableWithoutFeedback>
  );
};
Home.navigationOptions = ({ navigation }) => {
  console.log(navigation.state);
  // let session = navigation.state.params.session;
  return {
    headerTransparent: true
  };
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: 100,
    height: 100
  },
  box: {
    height: 100,
    width: 100,
    backgroundColor: "tomato"
  }
});
