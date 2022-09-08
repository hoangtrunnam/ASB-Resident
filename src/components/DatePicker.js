import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import BottomSheet from "./BottomSheet";

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  open() {
    this._bottom.open();
  }
  render() {
    return (
      <View>
        <BottomSheet ref={(ref) => (this._bottom = ref)} title="Từ ngày">
          <Text>Ahihi</Text>
        </BottomSheet>
      </View>
    );
  }
}

export default DatePicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
