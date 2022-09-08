import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import { TapGestureHandler, State } from "react-native-gesture-handler";
const {
  Value,
  event,
  Clock,
  timing,
  block,
  stopClock,
  cond,
  interpolate,
  Extrapolate,
  and,
  eq,
  neq,
  set,
  startClock
} = Animated;

const runOpacityTimer = (clock, gestureState) => {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0)
  };
  const config = {
    duration: 300,
    toValue: new Value(-1),
    easing: Easing.inOut(Easing.ease)
  };
  /*  return block([
    timing(clock, state, config),
    cond(state.finished),
    stopClock(clock)
  ]); */
  return block([
    cond(and(eq(gestureState, State.BEGAN), neq(config.toValue, 1)), [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.frameTime, 0),
      set(config.toValue, 1),
      startClock(clock)
    ]),
    cond(and(eq(gestureState, State.END), neq(config.toValue, 0)), [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.frameTime, 0),
      set(config.toValue, 0),
      startClock(clock)
    ]),
    timing(clock, state, config),
    cond(state.finished, stopClock(clock)),
    interpolate(state.position, {
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP
    })
  ]);
};

class Home extends Component {
  static navigationOptions = ({ navigation }) => {
    console.log(navigation.state);
    // let session = navigation.state.params.session;
    return {
      headerTransparent: true
    };
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  gestureState = new Value(-1);
  onStateChange = event([
    {
      nativeEvent: { state: this.gestureState }
    }
  ]);
  clock = new Clock();
  opacity = runOpacityTimer(this.clock, this.gestureState);
  render() {
    return (
      <View style={styles.container}>
        <TapGestureHandler
          maxDist={0}
          onHandlerStateChange={this.onStateChange}
        >
          <Animated.View style={[styles.rect, { opacity: this.opacity }]} />
        </TapGestureHandler>
      </View>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  rect: {
    backgroundColor: "tomato",
    height: 200,
    width: 200
  }
});
