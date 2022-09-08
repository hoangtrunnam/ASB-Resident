import React, { useEffect, useState } from "react";
import { Keyboard, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import {
  TouchableWithoutFeedback,
  TextInput,
  TapGestureHandler,
  State,
} from "react-native-gesture-handler";
import { useTransition, onGestureEvent } from "react-native-redash";
const {
  Value,
  event,
  set,
  interpolate,
  useCode,
  block,
  debug,
  divide,
  sub,
  Clock,
  not,
  eq,
  cond,
} = Animated;
export default function Example() {
  const transition = new Value(0);
  const height = new Value(100);
  const state = new Value(State.UNDETERMINED);
  const clock = new Clock();
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => setExpanded(!expanded));
    Keyboard.addListener("keyboardDidHide", () =>
      setExpanded((expanded) => !expanded)
    );

    // cleanup function
    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = (event) => {
    console.warn("Keyboard Shown", event);
    // {"duration": 250, "easing": "keyboard", "endCoordinates": {"height": 301, "screenX": 0, "screenY": 595, "width": 414}, "isEventFromThisApp": true, "startCoordinates": {"height": 243, "screenX": 0, "screenY": 896, "width": 414}}
  };

  const _keyboardDidHide = (event) => {
    console.warn("Keyboard Hidden", event);
  };
  const _tran = useTransition(expanded);
  const scale = interpolate(_tran, {
    inputRange: [0, 1],
    outputRange: [1, 2],
  });
  const onFocus = event([
    {
      nativeEvent: ({ target }) => set(transition, divide(target, target)),
    },
  ]);

  const onBlur = event([
    {
      nativeEvent: ({ target }) => set(transition, sub(target, target)),
    },
  ]);
  const gestureHandler = onGestureEvent({ state: state });
  /* useCode(() => {
    return block([
      debug("height", state),
      cond(eq(state, State.END), set(transition, not(transition))),
    ]);
  }, [height]); */
  const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TextInput
          style={s.input}
          placeholder="Click here ..."
          onSubmitEditing={Keyboard.dismiss}
          // onFocus={onFocus}
          // {...gestureHandler}
          // topFocus={onFocus}
          // onBlur={() => console.log("js received blur")}
          // topBlur={onBlur}
        />

        <TapGestureHandler {...gestureHandler}>
          <Animated.View
            style={{
              height: height,
              width: 100,
              backgroundColor: "tomato",
              transform: [{ scale }],
            }}
          />
        </TapGestureHandler>
      </View>
    </TouchableWithoutFeedback>
  );
}

const s = StyleSheet.create({
  input: {
    margin: 60,
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 4,
    backgroundColor: "#fff",
  },
});
