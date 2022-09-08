// https://blog.kiprosh.com/react-native-reanimated-a-hands-on-approach-1/
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
  startClock,
  lessThan,
  clockRunning,
  debug
} = Animated;

function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: value,
    time: new Value(0),
    frameTime: new Value(0)
  };

  const config = {
    duration: 300,
    toValue: dest,
    easing: Easing.inOut(Easing.cubic)
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock)
    ]),
    timing(clock, state, config),
    cond(state.finished, debug("stop clock", stopClock(clock))),
    state.position
  ]);
}
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
    this.state = {
      showContent1: false
    };
    this.showContent1 = false;
    this.borderRadius = new Value(0);
  }
  gestureState = new Value(-1);
  /*  onStateChange = event([
    {
      nativeEvent: { state: this.gestureState }
    },
    {
      useNativeDriver: true
    }
  ]); */
  /*  onStateChange = event([
    {
      nativeEvent: { state: this.gestureState }
    },
    {
      useNativeDriver: true
    }
  ]); */
  interaction() {
    let dragging = 0;
    let start = 0;
    let position = 0;

    return (gestureTranslation, gestureState) => {
      if (gestureState === State.ACTIVE) {
        if (dragging === 0) {
          dragging = 1;
          start = position;
        }
        position = start + gestureTranslation;
      } else {
        dragging = 0;
      }
      return position;
    };
  }
  onStateChange = event => {
    // console.log(State.ACTIVE);
    // console.log("event.nativeEvent.state", event.nativeEvent.state);
    /* if (event.nativeEvent.state === State.ACTIVE) {
      alert("I'm touched");
    } */
    if (event.nativeEvent.state === State.ACTIVE) {
      if (!this.state.showContent1) {
        this.borderRadius = runTiming(
          new Clock(),
          new Value(0),
          new Value(100)
        );
      } else {
        this.borderRadius = runTiming(
          new Clock(),
          new Value(100),
          new Value(0)
        );
      }
      this.setState({ showContent1: !this.showContent1 });
    }
  };
  clock = new Clock();
  isOpen = false;
  borderRadius = runTiming(this.clock, this.gestureState, this.isOpen);

  render() {
    console.log("reload");
    return (
      <View style={styles.container}>
        <TapGestureHandler
          maxDist={0}
          // onHandlerStateChange={e => this.onStateChange(e)}
          onHandlerStateChange={this.onStateChange}
        >
          <Animated.View
            style={[styles.rect, { borderRadius: this.borderRadius }]}
          />
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
