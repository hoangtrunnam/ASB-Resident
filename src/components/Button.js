import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { colors } from "../config/colors";

export const Button = ({
  title,
  onPress,
  styleButton,
  styleTitle,
  ...rest
}) => (
  <TouchableOpacity
    {...rest}
    style={[styles.button, styleButton]}
    onPress={() => {
      if (onPress) onPress();
    }}
  >
    <Text style={[styles.title, styleTitle]}>{title}</Text>
  </TouchableOpacity>
);

const styles = {
  button: {
    height: 42,
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    backgroundColor: colors.main
  },
  title: { color: "#fff" }
};
