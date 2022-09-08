import React, { useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import {
  TapGestureHandler,
  State,
  TextInput,
} from "react-native-gesture-handler";
import {
  onGestureEvent,
  contains,
  // runTiming,
  // runDelay,
  bInterpolate,
  // block,
  // delay as runDelay,
  timing,
  useTransition,
} from "react-native-redash";
const { UNDETERMINED, BEGAN, ACTIVE, FAILED, CANCELLED, END } = State;
const {
  Value,
  useCode,
  eq,
  set,
  cond,
  Clock,
  clockRunning,
  startClock,
  stopClock,
  debug,
  timing: RNTiming,
  onChange,
  call,
  not,
  block,
  event,
  divide,
  sub,
} = Animated;

export function runTiming(
  clock: Animated.Clock,
  value: Animated.Adaptable<number>,
  config: Animated.TimingConfig
) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  return block([
    onChange(config.toValue, set(state.frameTime, 0)),
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      startClock(clock),
    ]),
    RNTiming(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position,
  ]);
}

export const runDelay = (node: Animated.Node<number>, duration: number) => {
  const clock = new Clock();
  return block([
    runTiming(clock, 0, { toValue: 1, duration, easing: Easing.linear }),
    cond(not(clockRunning(clock)), node),
  ]);
};

const Home = ({ navigation }) => {
  const state = new Value(UNDETERMINED);
  const shouldSpring = new Value(0);
  const gestureHandler = onGestureEvent({ state });
  const value = new Value(0);
  const clock = new Clock();
  const isOpen = useRef(new Value(0));
  const onPress = () => {
    // isOpen.current = !isOpen.current;
    // isOpen.current = new Value(!isOpen.current._value);
    console.warn("isOpen.current", isOpen.current._value);
  };
  useCode(() => {
    // const shoud = shouldSpring._value ? 0 : 1;
    // console.log("Home -> shoud", shoud);
    return Animated.block([
      cond(eq(state, BEGAN), set(shouldSpring, 1)),
      cond(contains([FAILED, CANCELLED], state), set(shouldSpring, 0)),
      onChange(state, cond(eq(state, END), call([], onPress))),
      cond(eq(state, END), [runDelay(set(shouldSpring, 0), 250)]),
      cond(
        eq(shouldSpring, 1),
        set(
          value,
          runTiming(clock, value, {
            toValue: 1,
            duration: 300,
            easing: Easing.inOut(Easing.ease),
          })
        )
      ),
      cond(
        eq(shouldSpring, 0),
        set(
          value,
          runTiming(clock, value, {
            toValue: 0,
            duration: 250,
            easing: Easing.inOut(Easing.ease),
          })
        )
      ),
    ]);
  }, [shouldSpring, state]);
  /* const onStateChange = (e) => {
    console.warn(e.nativeEvent.state);
  }; */
  /**
   * nativeEvent without redash
   */
  const onStateChange = event(
    [
      {
        nativeEvent: { state },
      },
    ],
    { useNativeDriver: true }
  );
  const scale = bInterpolate(value, 1, 1.5);

  const onFocus = () =>
    event([
      {
        nativeEvent: ({ target }) => set(shouldSpring, 0),
      },
    ]);

  const onBlur = () =>
    event([{ nativeEvent: ({ target }) => set(shouldSpring, 0) }]);
  // const [open, setOpen] = useState(false);
  const open = new Value(0);
  const state2 = new Value(State.UNDETERMINED);
  const onGestureEventToggle = onGestureEvent({ state });
  useCode(cond(eq(state, State.END), set(open, not(open))), [open, state]);
  const transition = useTransition(open);
  const height = bInterpolate(transition, 50, 100);
  // const rotate = bInterpolate(transition, 0, 2 * Math.PI * 2);
  const rotate = bInterpolate(transition, 0, Math.PI / 2);
  console.warn("reload ne");
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <TapGestureHandler
          maxDist={0}
          {...gestureHandler}
          // onHandlerStateChange={onStateChange}
        >
          <Animated.View style={[styles.item]}>
            <Animated.Image
              style={[
                { width: 300, height: 200 },
                {
                  transform: [
                    {
                      scale,
                    },
                  ],
                },
              ]}
              resizeMode={"cover"}
              source={{
                uri:
                  "https://raw.githubusercontent.com/wcandillon/can-it-be-done-in-react-native/master/bonuses/tap-gesture/assets/breakfast.png",
              }}
            />
          </Animated.View>
        </TapGestureHandler>
        <TextInput
          placeholder="Xin chao xin chao"
          onFocus={onFocus}
          onBlur={onBlur}
          onHandlerStateChange={onStateChange}
        />
        {/* <TouchableOpacity onPress={() => setOpen(!open)}> */}
        <TapGestureHandler
          {...onGestureEventToggle}
          // onHandlerStateChange={onStateChange}
        >
          <Animated.View
            style={{
              backgroundColor: "tomato",
              height: height,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 100,
              transform: [
                {
                  rotate,
                },
              ],
            }}
          >
            <Text>Toggle</Text>
          </Animated.View>
        </TapGestureHandler>
        {/* </TouchableOpacity> */}
      </View>
    </TouchableWithoutFeedback>
  );
};
Home.navigationOptions = {
  headerTransparent: true,
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    width: 300,
    height: 200,
    backgroundColor: "tomato",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    overflow: "hidden",
  },
  item_text: {
    color: "#fff",
    fontSize: 18,
  },
});
