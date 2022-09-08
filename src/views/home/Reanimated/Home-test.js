import React, { useRef } from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";

import Animated, { Easing } from "react-native-reanimated";
import { TouchableOpacity } from "react-native-gesture-handler";
import { bInterpolate } from "react-native-redash";
// https://software-mansion.github.io/react-native-reanimated/declarative-animation-api.html
import { TapGestureHandler, State } from "react-native-gesture-handler";

const {
  Value,
  set,
  Clock,
  block,
  cond,
  clockRunning,
  startClock,
  timing,
  debug,
  stopClock,
  add,
  useCode,
  withTransition,
  event,
  eq,
  call,
} = Animated;

function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: dest.duration || 5000,
    // toValue: new Value(dest.toValue),
    toValue: dest.toValue,
    easing: dest.easing || Easing.inOut(Easing.ease),
  };

  return block([
    cond(
      clockRunning(clock),
      [
        // if the clock is already running we update the toValue, in case a new dest has been passed in
        set(config.toValue, dest.toValue),
      ],
      [
        // if the clock isn't running we reset all the animation params and start the clock
        set(state.finished, 0),
        set(state.time, 0),
        set(state.position, value),
        set(state.frameTime, 0),
        set(config.toValue, dest.toValue),
        startClock(clock),
      ]
    ),
    // we run the step here that is going to update position
    timing(clock, state, config),
    // if the animation is over we stop the clock
    cond(state.finished, debug("stop clock", stopClock(clock))),
    // we made the block return the updated position
    state.position,
  ]);
}

const Home = ({}) => {
  const isOpenRef = useRef(null);
  // let animation = new Value(isOpenRef.current ? 1 : 0);
  let animation = new Value(0);
  const gestureState = new Value(State.UNDETERMINED);
  const onToggle = () => {
    isOpenRef.current = !isOpenRef.current;
    // console.log("onToggle -> isOpenRef.current", isOpenRef.current);
    /*  return set(
      animation,
      runTiming(clock, animation, {
        toValue: isOpenRef.current ? 0 : 1,
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      })
    ); */
    return;
    const clock = new Clock();
    set(
      animation,
      runTiming(clock, animation, {
        toValue: 200,
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      })
    );

    // animation.setValue(add(animation, 10));
    /*  timing(animation, {
      duration: 300,
      toValue: 100,
      easing: Easing.inOut(Easing.ease),
    }).start(); */
    /*
   Tương thích ngược
     _anim.start();
    timing(borderRadius, {
      duration: 300,
      toValue: isOpenRef.current ? 100 : 0,
      easing: Easing.inOut(Easing.ease),
    }).start(); */
  };
  const onDrop = () => {
    isOpenRef.current = !isOpenRef.current;
  };
  const clock = new Clock();
  useCode(() => {
    return block([
      cond(
        eq(gestureState, State.END),
        cond(
          eq(animation._value, 1),
          set(
            animation,
            runTiming(clock, animation, {
              toValue: 0,
              duration: 350,
              easing: Easing.inOut(Easing.ease),
            })
          ),
          set(
            animation,
            runTiming(clock, animation, {
              toValue: add(animation, 1),
              duration: 350,
              easing: Easing.inOut(Easing.ease),
            })
          )
        ),
        animation
      ),
      cond(eq(gestureState, State.BEGAN), call([], onDrop)),
    ]);
  }, [animation]);

  const onStateChange = Animated.event([
    {
      nativeEvent: { state: gestureState },
    },
    {
      useNativeDriver: true,
    },
  ]);
  const borderRadius = bInterpolate(animation, 0, 100);
  const height = bInterpolate(animation, 0, 100);
  return (
    <View style={styles.container}>
      <TapGestureHandler maxDist={0} onHandlerStateChange={onStateChange}>
        <Animated.Text>Click Click</Animated.Text>
      </TapGestureHandler>
      <TouchableOpacity onPress={onToggle}>
        <Text style={styles.title}>Ahihi</Text>
      </TouchableOpacity>
      <Animated.View style={[styles.box, { borderRadius, height: height }]} />
    </View>
  );
};

Home.navigationOptions = {
  headerTransparent: true,
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    height: 200,
    width: 200,
    backgroundColor: "tomato",
  },
  title: {
    fontSize: 20,
    color: "tomato",
  },
});
